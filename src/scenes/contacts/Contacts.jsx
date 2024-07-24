import { Box, Snackbar, Alert } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridCellModes,
  useGridApiRef,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/queries";
import { useEffect, useState } from "react";
import { UPDATE_USER_DETAILS } from "../../graphql/mutations";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const ALL_USERS = useQuery(GET_ALL_USERS);
  const [updateUserDetails] = useMutation(UPDATE_USER_DETAILS);
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (ALL_USERS.data && ALL_USERS.data.getAllUsers) {
      setUserData(ALL_USERS.data.getAllUsers);
    }
  }, [ALL_USERS.data]);

  const handleUpdate = async (newRow) => {
    try {
      await updateUserDetails({
        variables: {
          updatedDetails: {
            name: newRow.name,
            email: newRow.email,
            phone: newRow.phone,
            dob: newRow.dob,
            address: newRow.address,
            city: newRow.city,
            pincode: newRow.pincode,
            department: newRow.department,
          },
        },
      });
      setUserData((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? newRow : row))
      );
      setSnackbar({
        open: true,
        message: "Update successful!",
        severity: "success",
      });
      return newRow;
    } catch (error) {
      console.error("Failed to update:", error);
      setSnackbar({ open: true, message: "Update failed!", severity: "error" });
      throw error;
    }
  };
  const apiRef = useGridApiRef();
  const handleProcessRowUpdate = (newRow) => {
    return handleUpdate(newRow);
  };
  const handleCellModesModelChange = (params) => {
    const id = params.id;
    const mode = params.mode;
    if (mode === GridCellModes.View) {
      const rowNode = apiRef.current.getRowNode(id);
      rowNode.setMode(GridCellModes.View);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "pincode",
      headerName: "Pincode",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  if (ALL_USERS.loading) return <p>Loading...</p>;
  if (ALL_USERS.error) return <p>Error: {ALL_USERS.error.message}</p>;

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={userData || []}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          onCellEditStop={(params, event) => {
            if (params.reason === GridCellModes.View) {
              event.defaultMuiPrevented = true;
            }
          }}
          onCellModesModelChange={handleCellModesModelChange}
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Contacts;

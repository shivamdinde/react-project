import React, { useState } from "react";
import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations";

const Form = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [registerUser] = useMutation(REGISTER_USER);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await registerUser({
        variables: {
          registerInput: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            dob: values.dob,
            role: values.role,
            address: values.address,
            city: values.city,
            pincode: values.pincode,
            salary: parseFloat(values.salary),
            department: values.department,
          },
        },
      });
      setMessage("User registered successfully!");
      setSeverity("success");
      setOpen(true);
      resetForm();
    } catch (error) {
      setMessage("Error registering user.");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="20px">
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Pincode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pincode}
                name="pincode"
                error={!!touched.pincode && !!errors.pincode}
                helperText={touched.pincode && errors.pincode}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Salary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salary}
                name="salary"
                error={!!touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
              />
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="30px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  dob: yup.string().required("required"),
  role: yup.string().required("required"),
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  pincode: yup.string().required("required"),
  salary: yup.number().required("required"),
  department: yup.string().required("required"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  role: "",
  address: "",
  city: "",
  pincode: "",
  salary: "",
  department: "",
};

export default Form;

import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile($email: String!) {
    getUserProfile(email: $email) {
      id
      name
      email
      phone
      dob
      role
      address
      city
      pincode
      salary
      department
      isActive
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      phone
      dob
      role
      address
      city
      pincode
      salary
      department
      isActive
    }
  }
`;

// export const GET_ALL_ROLES = gql`
//   query GetAllRoles {
//     getAllRoles {
//       role
//       permissions
//     }
//   }
// `;

// export const GET_PERMISSIONS = gql`
//   query GetPermissions($role: String!) {
//     getPermissions(role: $role) {
//       permissions
//     }
//   }
// `;

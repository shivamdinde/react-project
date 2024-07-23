import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
    registerUser(registerInput: $registerInput) {
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

export const UPDATE_USER_DETAILS = gql`
  mutation UpdateUserDetails($updatedDetails: UpdateUserDetailsInput!) {
    updateUserDetails(updatedDetails: $updatedDetails) {
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

export const DELETE_USER = gql`
  mutation DeleteUser($email: String!, $isActive: Boolean!) {
    deleteUser(email: $email, isActive: $isActive)
  }
`;

// export const CREATE_ROLE_MUTATION = gql`
//   mutation CreateRole($name: String!) {
//     createRole(name: $name) {
//       role
//       permissions
//     }
//   }
// `;

// export const DELETE_ROLE_MUTATION = gql`
//   mutation DeleteRole($name: String!) {
//     deleteRole(name: $name)
//   }
// `;

// export const UPDATE_PERMISSIONS_MUTATION = gql`
//   mutation UpdatePermissions($updatePermissions: hasPermissions!) {
//     updatePermissions(updatePermissions: $updatePermissions)
//   }
// `;

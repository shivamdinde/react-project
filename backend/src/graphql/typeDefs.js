const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    id: String!
    name: String!
    email: String!
    phone: String!
    dob: String
    role: String
    address: String
    city: String
    pincode: String
    salary: Int!
    department: String!
    isActive: Boolean!
  }

  type Type {
    name: String!
  }
  type Roles {
    name: String!
  }
  type Pages {
    key: Int!
    name: String!
    url: String
  }
  type PageAvailablePermissions {
    key: Int
    permission: [String]
  }

  type RolePermissions {
    role: String!
    permissions: [String!]!
  }

  input RoleHasPermissions {
    role: String!
    permissions: [String]!
  }

  input RegisterInput {
    name: String!
    email: String!
    phone: String!
    dob: String
    role: String
    address: String
    city: String
    pincode: String
    salary: Int!
    department: String!
  }

  input UpdateUserDetailsInput {
    name: String
    email: String!
    phone: String
    dob: String
    role: String
    address: String
    city: String
    pincode: String
    salary: Int
    department: String
  }

  type Query {
    getUserProfile(email: String!): User
    getAllUsers: [User!]!

    getAllRoles: [String]!
    getPermissions(role: String!): RolePermissions!
    getAvailablePermissions: [PageAvailablePermissions]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput!): User!
    updateUserDetails(updatedDetails: UpdateUserDetailsInput!): User!
    deleteUser(email: String!, isActive: Boolean!): String!

    createRole(name: String!): Roles
    deleteRole(name: String!): String!
    addPage(name: String!, url: String): Pages
    deletePage(key: Int!): String!
    updatePagePermission(
      key: Int!
      permission: [String]
    ): PageAvailablePermissions
    updateRoleHasPermissions(
      inputPermissions: RoleHasPermissions
    ): RolePermissions!
  }
`;
// createType (name: String!) : Type!
// deleteType (name: String!) : String!

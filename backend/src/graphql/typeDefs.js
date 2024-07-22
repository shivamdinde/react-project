const { gql } = require("graphql-tag");

module.exports = gql`
type User {
id: String!
name: String!
email: String!
phone: String!
dob: String
role:String
address: String
city: String
pincode:String
salary: Int!
department: String!
role: String!
isActive: Boolean!
}
type type{
name:String!
}
type roles{
name: String!
}
type pages{
key: Int!
name: String!
url: String
}
type permissions{
key: Int!
permission: String
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
role:String
address: String
city: String
pincode:String
salary: Int!
department: String!
}

input UpdateUserDetailsInput {
name: String!
email: String!
phone: String!
dob: String
role:String
address: String
city: String
pincode:String
salary: Int!
department: String!
role: String
}

type Query {
getUserProfile (email: String!): User
getAllUsers: [User!]!
getAllRoles: [RolePermissions!]!
getPermissions (role: String!) : RolePermissions!
getAvailablePermissions: [String]!
}

type Mutation {
registerUser(registerInput: RegisterInput!): User!
updateUserDetails(updatedDetails: UpdateUserDetailsInput!): User!
deleteUser(email: String!, isActive: Boolean!): String!

createPermission(permission: String!): String!
deletePermission(permission: String!): String!
createRole (name: String!) : RolePermissions!
deleteRole (name: String!) : String!
updatePermissions (updatePermissions: hasPermissions!) : String!
} 
`;

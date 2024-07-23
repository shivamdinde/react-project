const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  id: { type: String, unique: true },
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  dob: { type: String },
  role: { type: String, default: "EMP" },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  salary: { type: Number },
  department: { type: String },
  //   hasPermissions: { type: [String] },
  isActive: { type: Boolean, default: "True" },
});

const types = new Schema({
  name: { type: String, unique: true },
});

const roles = new Schema({
  name: { type: String, unique: true },
});

const pages = new Schema({
  key: { type: Number },
  name: { type: String },
  url: { type: String },
});

const permissions = new Schema({
  key: { type: Number },
  permission: { type: [String]},
});

const roleHasPermissions = new Schema({
  role: { type: String, unique: true },
  permissions: { type: [String], default: ["NO_ACCESS"] },
});

module.exports.User = model("User", userSchema);

module.exports.Role = model("Role", roles);
module.exports.Type = model("Type", types);

module.exports.Page = model("Page", pages);
module.exports.Permission = model("Permission", permissions);

module.exports.RoleHasPermissions = model("HasPermission", roleHasPermissions);

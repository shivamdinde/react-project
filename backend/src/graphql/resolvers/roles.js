const { Role, Type, Page, Permission, RoleHasPermissions, } = require("../../models/User");

const { GraphQLError } = require("graphql");

const TYPES = ["", "T1", "T2", "T3"];

module.exports = {
    Mutation: {
        async createRole(_, { name }) {

            try {
                const existingName = await Role.findOne({ name })

                if (existingName) {
                    throw new GraphQLError("Role already exists. You can update its permissions.")
                }

                
                
                const newRole = new Role({
                    name: name
                })
                const res = await newRole.save();
                
                // const roles = await Role.find();

                // let roleTypeCombo = [];
                
                for(let i =0; i<TYPES.length; i++){
                   let roleTypeCombo
                        TYPES[i] === "" ? 
                        roleTypeCombo = newRole.name : roleTypeCombo = (newRole.name + "-" + TYPES[i])
                        const temp = new RoleHasPermissions({
                            role: roleTypeCombo,
                            permissions: ["NO_ACCESS"]
                        })
                        const temp2 = await temp.save();
                }

                const res2 = await RoleHasPermissions.find();
                return {
                    ...res._doc,
                    ...res2._doc
                }            

            } catch (err) {
                throw new GraphQLError(`Failed to create role: ${err.message}`)
            }
        },

        async deleteRole(_, { name }) {
            try {
                const existingName = await Role.findOne({ name })

                if (!existingName) {
                    throw new GraphQLError("Role does not exists.")
                }

                const res = await Role.deleteOne({ name });
                const resT = await RoleHasPermissions.deleteOne({ role: name });
                const resT1 = await RoleHasPermissions.deleteOne({ role: name + "-T1" });
                const resT2 = await RoleHasPermissions.deleteOne({ role: name + "-T2" });
                const resT3 = await RoleHasPermissions.deleteOne({ role: name + "-T3" });

                return "Role deleted successfully!"
            } catch (err) {
                throw new GraphQLError(`Failed to delete role: ${err.message}`)
            }
        },


        // NOT WORKING ON TYPES CURRENTLY

        // async createType(_, { name }) {

        //     try {
        //         const existingName = await Type.findOne({ name })

        //         if (existingName) {
        //             throw new GraphQLError("Role already exists. You can update its permissions.")
        //         }

        //         const newType = new Type({
        //             name: name
        //         })
        //         // const newHasPermissions = new RoleHasPermissions({
        //         //     role: name,
        //         //     permissions: ["NO_ACCESS"]
        //         // })

        //         const res = await newType.save();
        //         // const res2 = await newHasPermissions.save();
        //         return {
        //             ...res._doc,
        //         }

        //     } catch (err) {
        //         throw new GraphQLError(`Failed to create role: ${err.message}`)
        //     }
        // },

        // async deleteType(_, { name }) {
        //     try {
        //         const existingName = await Type.findOne({ name })

        //         if (!existingName) {
        //             throw new GraphQLError("Role does not exists.")
        //         }

        //         const res = await Type.deleteOne({ name });
        //         // const res2 = await hasPermissions.deleteOne({ role: name });
        //         return "Role deleted successfully!"
        //     } catch (err) {
        //         throw new GraphQLError(`Failed to delete role: ${err.message}`)
        //     }
        // },

        async addPage(_, { name, url }) {
            try {
                const existingPage = await Page.findOne({ name })

                if (existingPage) {
                    throw new GraphQLError("Page already exists!")
                }

                const pagesCount = await Page.countDocuments(); // Get the total number of users
                const newKey = (101 + pagesCount).toString();

                const newPage = new Page({
                    key: newKey,
                    name: name,
                    url: url,
                })

                const newPermission = new Permission ({
                    key: newKey,
                    permissions: [""],
                })

                const res = await newPage.save();
                const res2 = await newPermission.save();

                return {
                    ...res._doc,
                    ...res2._doc
                }

            } catch (err) {
                throw new GraphQLError(`Failed to add the Page: ${err.message}`)
            }
        },

        async deletePage(_, { key }) {
            try {
                const existingPage = await Page.findOne({ key })

                if (!existingPage) {
                    throw new GraphQLError("Page does not exists!")
                }

                const res = await Page.deleteOne({ key });
                const res2 = await Permission.deleteOne({ key });

                return "Page deleted successfully!"


            } catch (err) {
                throw new GraphQLError(`Failed to add the Page: ${err.message}`)
            }
        },
        
        async updatePagePermission(_, { key, permissions }) {
            try {
                const existingPer = await Permission.findOne({ key })

                if (!existingPer) {
                    throw new GraphQLError("Permission does not exists.")
                }

                const newPerm = new Permission({
                    key: key,
                    permission: permissions,
                })

                const res = await newPerm.save();

                return "Success"
            } catch (error) {
                throw new GraphQLError(`Failed to create new permission: ${error.message}`)
            }
        },

        // Update RoleHasPermissions where all the permissions to the role is assigned
        // async updateRoleHasPermissions (_, { role, permissions }){
        //     try { 
        //         const existingRole = await RoleHasPermissions.findOne({ role });
        //         if(!existingRole) {
        //             throw new GraphQLError('The role does not exists!');
        //         }

        //     }catch(err) {
        //         throw new GraphQLError(`Failed to update: ${err.message}`)
        //     }
        // },


    },

    Query: {
        // Get all the role-type combinations along with their permissions
        async getAllRoles() {
            try {
                const roles = await Role.find();
                const types = await Type.find();

                let roleTypeCombo = [];
                console.log(roles.length)
                
                // if(!roles)
                for(let i =0; i< types.length; i++){
                    for(let j=0; j<roles.length; j++){
                        roleTypeCombo.push(types[i].name + "-" + roles[j].name)
                    }
                }
                
                return roleTypeCombo;
            } catch (error) {
                throw new GraphQLError(`Failed to fetch all users: ${error.message}`);
            }
        },

        // Get all the available page wise permissions
        async getAvailablePermissions() {
            try {
                const availPermissions = await Permission.find();

                const count = await Permission.countDocuments(); // Get the total number of users
                let permissions = [];
                for (let i = 0; i < count; i++) {
                    // console.log(availPermissions[0].permission)
                    permissions.push(availPermissions[i].permission)
                }

                return permissions;
            } catch (err) {
                throw new GraphQLError(`Failed to fetch the permissions: ${err.message}`)
            }
        },

        // Get all the permissions of a particular role-type combination
        async getPermissions(_, { role }) {
            try {
                const existingRole = await Role.find({ role })
                if (!existingRole) {
                    throw new GraphQLError(`Role does not exists!`)
                }

                const res = await RoleHasPermissions.findOne({ role })
                return (
                    res
                )
            } catch (err) {
                throw new GraphQLError(`Failed to fetch permissions: ${err.message}`)
            }
        }

    }
}

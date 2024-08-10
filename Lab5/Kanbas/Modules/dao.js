import model from "./model.js";

export const createModule = (module) => model.create(module);
export const updateModule = (moduleId, module) =>  model.updateOne({ _id: moduleId }, { $set: module });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });

export const findAllModules = (cid) => model.find({course: cid});


// export const createUser = (user) => model.create(user);
// export const findAllUsers = () => model.find();
// export const findUserById = (userId) => model.findById(userId);
// export const findUserByUsername = (username) =>  model.findOne({ username: username });
// export const findUserByCredentials = (username, password) =>  model.findOne({ username:username, password:password });
// export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
// export const deleteUser = (userId) => model.deleteOne({ _id: userId });
// export const findUsersByRole = (role) => model.find({ role: role });

// export const findUsersByPartialName = (partialName) => {
//     const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
//     return model.find({
//       $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
//     });
//   };
  
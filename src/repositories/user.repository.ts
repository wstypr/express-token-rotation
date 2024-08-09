import { model } from "mongoose";
import userSchema from "../schemas/user.schema";

const userModel = model("User", userSchema);

const userRepository = {
  getAll: async () => {
    const allUsers = await userModel.find();
    return allUsers;
  },
  getOneByEmail: async (email: string) => {
    // return one user based on email
    const user = await userModel.findOne({ email });
    return user;
  },
  create: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    // create one user based on user data given
    // return one user created
    const user = new userModel(userData);
    const newUser = await user.save();
    return newUser;
  },
  delete: async (id: string) => {
    // delete one user based on id
    // return deleted user
    const deletedUser = await userModel.findOneAndDelete({ _id: id });
    return deletedUser;
  },
};

export default userRepository;

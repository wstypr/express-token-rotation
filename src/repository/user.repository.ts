import { model } from "mongoose";
import userSchema from "../schema/user.schema";

const userModel = model("User", userSchema);

const userRepository = {
  getAll: async () => {
    // return all users
  },
  getOneByEmail: async (email: string) => {
    // return one user based on email
  },
  create: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    // create one user based on user data given
    // return one user created
  },
};

export default userRepository;

import { Router } from "express";

const userRouter = {
  handleGetAll: async () => {
    // get all users
    
  },
  handleCreate: async (newUserData: {
    name: string;
    email: string;
    password: string;
  }) => {
    // create a user
  },
  handleDelete: async (id: string) => {
    // delete a user based on id
  },
  handleGetByEmail: async (email: string) => {
    // get a user based on email
  },
};

export default userRouter;

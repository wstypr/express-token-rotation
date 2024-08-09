import userService from "../service/user.service";
import { Request, Response } from "express";

const userController = {
  handleGetAll: async (_: Request, res: Response) => {
    // get all users
    const allUsers = await userService.getAll();
    return res.status(200).json({ data: allUsers });
  },
  handleCreate: async (req: Request, res: Response) => {
    // create a user
    try {
      const newUser = await userService.create(req.body);
      return res.status(201).json({ newUser });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },
  handleDelete: async (id: string) => {
    // delete a user based on id
  },
  handleGetByEmail: async (email: string) => {
    // get a user based on email
  },
};

export default userController;

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
      const newUser = userService.create(req.body);
      return res.status(201).json({ newUser });
    } catch (error) {
      return res.status(401).json({ error });
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

import { Request, Response } from "express";
import authService from "../service/auth.service";

const loginController = {
  handleLogin: async (req: Request, res: Response) => {
    try {
      const { user, accessToken, refreshToken } = await authService.login(
        req.body
      );
      return res
        .cookie("accessToken", accessToken, { httpOnly: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: "logged in", user });
    } catch (error) {
      if (error instanceof Error)
        return res.status(401).json({ error: error.message });
    }
  },
};

export default loginController;

import { Request, Response } from "express";
import authService from "../service/auth.service";

const logoutController = {
  handleLogout: async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    await authService.logout(refreshToken);
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "logout success" });
  },
  handleLogoutAll: async (req: Request, res: Response) => {
    const user = res.locals;
    await authService.logoutAll(user.id);
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "logout all success" });
  },
};

export default logoutController;

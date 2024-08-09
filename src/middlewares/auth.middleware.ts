import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import refreshTokenRepository from "../repositories/refershToken.repository";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  // check if accesstoken & refreshtoken exist
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: "please re-login" });
  }

  // check if accesstoken valid
  try {
    const { userId, name } = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_KEY as string
    ) as { userId: string; name: string };
    res.locals = { id: userId, name };
  } catch (error) {
    // check if refreshtoken exist in db
    const refreshTokenDB = await refreshTokenRepository.get(refreshToken);
    if (!refreshTokenDB) {
      return res.status(401).json({ message: "please re-login" });
    }

    //  check if refreshtoken valid
    try {
      const { userId, name } = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY as string
      ) as { userId: string; name: string };

      // generate new accesstoken
      const newAccessToken = jwt.sign(
        { userId, name },
        process.env.ACCESS_TOKEN_KEY as string
      );
      res.cookie("accessToken", newAccessToken);
      res.locals = { id: userId, name };
    } catch (error) {
      return res.status(401).json({ message: "please re-login" });
    }
  }
  next();
}

export default authMiddleware;

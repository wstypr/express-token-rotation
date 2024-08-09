import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const authService = {
  login: async (data: { email: string; password: string }) => {
    const { email, password } = data;
    // input validation
    // input validation: email & password must not blank
    if (email.length === 0 || password.length === 0)
      throw new Error("authentication failed");
    // input validation: user exist
    const user = await userRepository.getOneByEmail(email);
    if (!user) throw new Error("user not found");

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!isPasswordMatch) {
      throw new Error("authentication failed");
    } else {
      const { _id, name, email } = user;
      // authorization using jwt
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_KEY as string
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_KEY as string
      );
      return { user: { _id, name, email }, accessToken, refreshToken };
    }
  },
};

export default authService;

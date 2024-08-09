import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import refreshTokenRepository from "../repositories/refershToken.repository";
import noTokenError from "../errors/notoken.error";

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
    }

    const { _id, name } = user;
    // authorization using jwt
    const accessToken = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.ACCESS_TOKEN_KEY as string,
      { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE) }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.REFRESH_TOKEN_KEY as string,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE as string }
    );
    refreshTokenRepository.create({
      userId: String(user._id),
      token: refreshToken,
    });
    return { user: { _id, name, email }, accessToken, refreshToken };
  },
  authorize: async (
    accessToken: string | null,
    refreshToken: string | null
  ) => {
    // check whether accessToken and refreshToken exist
    if (!accessToken || !refreshToken)
      throw new noTokenError("authorization failed");

    // verify accessToken
    try {
      const { userId, name } = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_KEY as string
      ) as { userId: string; name: string };
      return { userId, name, accessToken };
    } catch (error) {
      // todo issue new accesstoken
      const { userId, name, accessToken } =
        await authService.issueNewAccessToken(refreshToken);
      return { userId, name, accessToken };
    }
  },
  issueNewAccessToken: async (refreshToken: string) => {
    // check whether refreshtoken exist in db
    const refreshTokenDB = refreshTokenRepository.get(refreshToken);
    if (!refreshTokenDB) throw new noTokenError("authorization failed");

    // verify the refreshtoken
    try {
      const { userId, name } = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY as string
      ) as { userId: string; name: string };
      const newAccessToken = jwt.sign(
        { userId, name },
        process.env.ACCESS_TOKEN_KEY as string,
        { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE) }
      );
      return { userId, name, accessToken: newAccessToken };
    } catch (error) {
      throw new noTokenError("authorization failed");
    }
  },
};

export default authService;

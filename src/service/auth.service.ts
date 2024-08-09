import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";

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

    if (isPasswordMatch) {
      return user;
    } else {
      throw new Error("authentication failed");
    }
  },
};

export default authService;

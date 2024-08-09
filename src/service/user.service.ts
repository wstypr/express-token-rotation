import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";

const userService = {
  getAll: async () => {
    // get all users
    try {
      const allUsers = await userRepository.getAll();
      return allUsers;
    } catch (error) {
      console.log("error get all users", error);
    }
  },
  create: async (data: { name: string; email: string; password: string }) => {
    const { name, email, password } = data;
    // input validation
    // input validation: name must exist
    console.log(name);
    if (name.length === 0) throw Error("name must be provided");

    // input validation: email must exist
    if (email.length === 0) throw Error("email must be provided");

    // input validation: password must exist
    if (password.length === 0) throw Error("password must be provided");
    
    // input validation: email collision check
    const existedUser = await userRepository.getOneByEmail(email);
    if (existedUser) throw Error("email already registered");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 13);

    // save to db
    const newUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return newUser;
  },
};

export default userService;

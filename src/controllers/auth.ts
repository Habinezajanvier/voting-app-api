import services from "../services";
import { User, UserInput } from "../types";
import bcrypt from "bcrypt";
import { encode } from "../helper/jwtToken";

const { userServices } = services;

export default class AuthController {
  /**
   * User signup
   * @param input
   * @returns
   */
  signup = async (input: UserInput) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input.password, salt);
    const user = await userServices.createUser({ ...input, password: hash });
    const token = encode({ id: user.id, email: user.email });
    return { message: "User created successfully", token, data: user };
  };

  /**
   * User login
   * @param input
   * @returns
   */
  login = async (input: UserInput) => {
    const user = await userServices.getUserByEmail(input.email);
    if (!user) return { status: "USER_EXIST", error: "User already exist" };
    const pass = await bcrypt.compare(input.password, user?.password as string);
    if (!pass)
      return { status: "PASSWORD_FAILED", error: "Password doesn't match" };
    const token = encode({ id: user?.id, email: user?.email });
    return { message: "User loged in successfully", token, data: user };
  };
}

import services from "../services";
import { UserInput, Status, Typename, AuthData, Error } from "../types";
import bcrypt from "bcrypt";
import { encode } from "../helper/jwtToken";

const { userServices } = services;

export default class AuthController {
  /**
   * User signup
   * @param input
   * @returns
   */
  signup = async (input: UserInput): Promise<AuthData | Error> => {
    const findUser = await userServices.getUserByEmail(input.email);
    if (findUser)
      return {
        __typename: Typename.ERROR,
        status: Status.EMAIL_CONFLICT,
        error: "Email already exist",
      };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input.password, salt);
    const user = await userServices.createUser({ ...input, password: hash });
    const token = encode({ id: user.id, email: user.email });
    return {
      __typename: Typename.AUTH,
      status: Status.SUCCESS,
      message: "User created successfully",
      token,
      data: user,
    };
  };

  /**
   * User login
   * @param input
   * @returns
   */
  login = async (input: UserInput): Promise<AuthData | Error> => {
    const user = await userServices.getUserByEmail(input.email);
    if (!user)
      return {
        __typename: Typename.ERROR,
        status: Status.PASSWORD_CONFLICT,
        error: "Password or email does not exist",
      };
    const pass = await bcrypt.compare(input.password, user?.password as string);
    if (!pass)
      return {
        __typename: Typename.ERROR,
        status: Status.PASSWORD_CONFLICT,
        error: "Password or email does not exist",
      };
    const token = encode({ id: user?.id, email: user?.email });
    return {
      __typename: Typename.AUTH,
      message: "User loged in successfully",
      token,
      data: user,
      status: Status.SUCCESS,
    };
  };
}

import services from "../services";
import { UserInput } from "../types";
import bcrypt from "bcrypt";
import { encode } from "../helper/jwtToken";

const { userServices } = services;

export default class AuthController {
  signup = async (input: UserInput) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input.password, salt);
    const user = await userServices.createUser({ ...input, password: hash });
    const token = encode({ id: user.id, email: user.email });
    return { message: "User created successfully", token, data: user };
  };
}

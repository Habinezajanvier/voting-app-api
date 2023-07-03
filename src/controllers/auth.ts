import services from "../services";
import { UserInput } from "../types";

const { userServices } = services;

export default class AuthController {
  signup = async (input: UserInput) => {
    const user = await userServices.createUser(input);
    return user;
  };
}

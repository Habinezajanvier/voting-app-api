import prisma from "../db/prisma";
import { User } from "../types";

const { user } = prisma;

export default class UserServices {
  createUser = async (data: any) => {
    const newUser = await user.create({ data });
    return newUser;
  };

  getUserByEmail = async (email: string) => {
    return await user.findUnique({ where: { email } });
  };
}

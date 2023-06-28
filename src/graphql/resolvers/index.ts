import { User, UserInput } from "../../types";
import prisma from "../../db/prisma";

const { user } = prisma;

class UserResolvers {
  async getUsers() {
    return await user.findMany();
  }

  async getUser(args: { id: number }) {
    return await user.findUnique({ where: { id: args.id } });
  }

  async createUser(args: { input: UserInput }) {
    const newUser = await user.create({
      data: { ...args.input },
    });
    return newUser;
  }
}

const root = new UserResolvers();

export default root;

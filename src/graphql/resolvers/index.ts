import { User, UserInput } from "../../types";
import prisma from "../../db/prisma";
import controllers from "../../controllers";

const { auth } = controllers;

const { user } = prisma;

class UserResolvers {
  async getUsers() {
    return await user.findMany();
  }

  async getUser(args: { id: number }) {
    return await user.findUnique({ where: { id: args.id } });
  }

  async createUser(args: { input: UserInput }) {
    return await auth.signup(args.input);
  }
}

const root = new UserResolvers();

export default root;

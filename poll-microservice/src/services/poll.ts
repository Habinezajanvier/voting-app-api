import { Poll } from ".prisma/client";
import prisma from "../db/prisma";
import { PollType } from "../types";

const { poll } = prisma;

/**
 * user services
 */
class PollServices {
  /**
   * create new user
   * @param data
   * @returns
   */
  createPoll = async (data: PollType) => {
    const result = await poll.create({ data });
    return result;
  };

  /**
   * getAllUsers
   * @returns
   */
  getAllPolls = async () => {
    const polls = await poll.findMany();
    return polls;
  };

  /**
   * getOneUser by Id
   * @param id
   * @returns
   */
  getOnePoll = async (id: number) => {
    return (await poll.findUnique({
      where: { id },
    })) as Poll;
  };

  /**
   * UpdateUser
   * @param id
   * @param data
   * @returns
   */
  updatePoll = async (id: number, data: any) => {
    const updatedData = await poll.update({
      where: { id },
      data: { ...data },
    });
    return updatedData;
  };

  /**
   * deleteUser
   * @param id
   * @returns
   */
  deletePoll = async (id: number) => {
    const deletedPoll = await poll.delete({
      where: { id },
    });
    return deletedPoll;
  };
}

export default PollServices;

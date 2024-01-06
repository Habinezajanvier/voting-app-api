import { Request, Response } from "express";
import PollServices from "../services/poll";

class PollController {
  constructor(private poll: PollServices) {}

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public createPoll = async (req: Request, res: Response) => {
    const newPoll = await this.poll.createPoll({ ...req.body });
    return res.status(201).json({
      message: "Poll created successfully",
      data: newPoll,
    });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */

  public editPoll = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newPoll = await this.poll.updatePoll(Number(id), { ...req.body });
    return res.status(200).json({
      message: "Poll updated successfully",
      data: newPoll,
    });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getOnePoll = async (req: Request, res: Response) => {
    const { id } = req.params;
    const poll = await this.poll.getOnePoll(Number(id));
    return res.status(200).json({
      message: "Poll retrieved successfully",
      data: poll,
    });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getAllPolls = async (_req: Request, res: Response) => {
    const polls = await this.poll.getAllPolls();

    if (!polls || polls?.length === 0)
      return res.status(404).json({
        error: "No poll found",
      });

    return res.status(200).json({
      message: "Polls retrieved successfully",
      data: polls,
    });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public deletePoll = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedPoll = await this.poll.deletePoll(Number(id));
    return res.status(200).json({
      message: "Poll deleted successfully",
      data: deletedPoll,
    });
  };
}

export default PollController;

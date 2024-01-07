import { Request, Response } from "express";
import UserServices from "../services/user";

export default class UserController {
  constructor(private user: UserServices) {}

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getAll = async (_req: Request, res: Response) => {
    const data = await this.user.getAllUsers();

    return data
      ? res.status(200).json({ message: "Success", data })
      : res.status(404).json({ error: "No data found" });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public udpate = async (req: Request, res: Response) => {
    const data = { ...req.body };

    const updatedData = await this.user.updateUser(Number(req.params.id), data);

    return updatedData
      ? res.status(200).json({ message: "Data updated successfully" })
      : res.status(400).json({ error: "Invalid request" });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getOneUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await this.user.getOneUser(Number(id));

    return res.status(200).json({ message: "Success", data });
  };
}

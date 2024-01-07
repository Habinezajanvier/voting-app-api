import { Request, Response } from "express";
import OrganisationService from "../services/organisation";
import { Organisation } from "@prisma/client";

export default class OrganisationController {
  constructor(private organisation: OrganisationService) {}

  /**
   * Create Organisation
   * @param req
   * @param res
   * @returns
   */
  public createOrganisation = async (req: Request, res: Response) => {
    const data = await this.organisation.create({
      ...req.body,
      createdBy: req.user.id,
    });

    await this.organisation.assignUser(data.id, req.user.id, true);

    return data
      ? res.status(201).json({ message: "Created successfull", data })
      : res.status(400).json({ error: "Invalid Request" });
  };

  /**
   * UpdateOrganisation
   * @param req
   * @param res
   * @returns
   */
  public udpate = async (req: Request, res: Response) => {
    const data: Organisation = { ...req.body, updatedAt: new Date() };

    const updatedData = await this.organisation.update(+req.params.id, data);

    return updatedData
      ? res
          .status(200)
          .json({ message: "Data updated successfully", data: updatedData })
      : res.status(400).json({ error: "Invalid request" });
  };

  /**
   * DeleteOrg
   * @param req
   * @param res
   * @returns
   */
  public deleteOrganisation = async (req: Request, res: Response) => {
    const data = await this.organisation.deleteOne(+req.params.id);
    return data
      ? res.status(200).json({ message: "deleted successfull", data })
      : res.status(400).json({ error: "Invalid Request" });
  };

  /**
   * GetAllOrganisations
   * @param _req
   * @param res
   * @returns
   */
  public getAllOrganisations = async (_req: Request, res: Response) => {
    const data = await this.organisation.getAll();

    return data
      ? res.status(200).json({ message: "Success", data })
      : res.status(404).json({ error: "No data found" });
  };

  /**
   * GetOneWithUsers
   * @param req
   * @param res
   * @returns
   */
  public getOneOrganistion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.organisation.getOneWithUsers(+id);

    return data
      ? res.status(200).json({ message: "Success", data })
      : res.status(404).json({ error: "No data found" });
  };

  public getOrganistionCreated = async (req: Request, res: Response) => {
    const { id } = req.user;
    const data = await this.organisation.getByOwner(+id);

    return data
      ? res.status(200).json({ message: "Success", data })
      : res.status(404).json({ error: "No data found" });
  };

  /**
   * AssignUser
   * @param req
   * @param res
   * @returns
   */
  public assignUserToOrganisation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;
    const data = await this.organisation.assignUser(+id, +userId);
    return data
      ? res.status(200).json({ message: "Success", data })
      : res.status(404).json({ error: "No data found" });
  };

  /**
   * AssignInBatch
   * @param req
   * @param res
   * @returns
   */
  public batchAssign = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userIds } = req.body;

    const data = await Promise.all(
      userIds.map(async (t: string) => {
        return await this.organisation.assignUser(+id, +t);
      })
    );

    return data
      ? res.status(200).json({ message: "Success", data })
      : res.status(404).json({ error: "No data found" });
  };
}

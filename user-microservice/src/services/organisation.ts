import { Organisation, UserOrganisation } from ".prisma/client";
import prisma from "../db/prisma";
import { OrganisationType } from "../types";

const { organisation, userOrganisation } = prisma;

class OrganisationService {
  /**
   * CreateOrganisation
   * @param data
   * @returns
   */
  create = async (data: OrganisationType): Promise<Organisation> => {
    return await organisation.create({ data });
  };

  /**
   * Get all organisation
   * @returns
   */
  getAll = async (): Promise<Organisation[]> => {
    return await organisation.findMany({ orderBy: [{ name: "asc" }] });
  };

  /**
   * getOneOrganisation
   * @param id
   * @returns
   */
  getOne = async (id: number): Promise<Organisation | null> => {
    return await organisation.findUnique({ where: { id } });
  };

  /**
   * GetOrganisationByOwner
   * @param userId
   * @returns
   */
  getByOwner = async (userId: number): Promise<Organisation[]> => {
    return await organisation.findMany({
      where: { createdBy: userId },
      orderBy: [{ name: "asc" }],
    });
  };

  /**
   * updateOrganisation
   * @param id
   * @param data
   * @returns
   */
  update = async (id: number, data: any): Promise<Organisation | never> => {
    return await organisation.update({ where: { id }, data });
  };

  /**
   * Getting Organisation with users
   * @returns
   */
  getAllWithUsers = async (): Promise<Organisation[]> => {
    const data = await organisation.findMany({
      include: {
        users: {
          include: {
            user: {
              select: {
                password: false,
              },
            },
          },
        },
      },
      orderBy: [{ name: "asc" }],
    });
    return data;
  };

  /**
   * GetOrganisationwithUsers
   * @param id
   * @returns
   */
  getOneWithUsers = async (id: number): Promise<Organisation | null> => {
    return await organisation.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });
  };

  /**
   * deleteOrganisation
   * @param id
   * @returns
   */
  deleteOne = async (id: number): Promise<Organisation | never> => {
    return await organisation.delete({ where: { id } });
  };

  /**
   * AssignOrganisation
   * @param organisationId
   * @param userId
   * @returns
   */
  assignUser = async (
    organisationId: number,
    userId: number,
    isAdmin = false
  ) => {
    const data = await userOrganisation.create({
      data: {
        userId,
        organisationId,
        isAdmin,
      },
      include: {
        organisation: true,
        user: true,
      },
    });
    return data;
  };
}

export default OrganisationService;

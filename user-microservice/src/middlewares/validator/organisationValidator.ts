import { Request, Response } from "express";
import Joi from "joi";
import service from "../../services";

/**
 * IdValidator
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const validateOrgId = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const getOrganisation = await service.organisation.getOne(+req.params.id);

  return getOrganisation
    ? next()
    : res.status(404).json({ error: "No Organisation found" });
};

/**
 * ValidateCreateOrganisation
 * @param req
 * @param res
 * @param next
 */
export const createOrganisationValidator = (
  req: Request,
  res: Response,
  next: Function
) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": " name must be a string",
      "string.empty": " name is required",
      "any.required": " name is Required",
    }),
    description: Joi.string().messages({
      "string.base": " description must be a string",
      "string.empty": " description is required",
    }),
    logo: Joi.string().empty().messages({
      "string.base": "logo must be a string",
    }),
  });
  const { error } = schema.validate(req.body);
  error ? res.status(400).json({ error: error.details[0].message }) : next();
};

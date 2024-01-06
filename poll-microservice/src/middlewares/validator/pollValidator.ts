import { Request, Response } from "express";
import Joi from "joi";
import services from "../../services";

/**
 * IdValidator
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const validateId = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const foundUser = await services.poll.getOnePoll(Number(req.params.id));
  if (!foundUser) return res.status(404).json({ error: "No Poll found" });

  return next();
};

/**
 * RegisterValidator
 * @param req
 * @param res
 * @param next
 */
export const registerValidator = (
  req: Request,
  res: Response,
  next: Function
) => {
  const schema = Joi.object({
    firstname: Joi.string().required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "any.required": "First name is Required",
    }),
    lastname: Joi.string().required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "any.required": "Last name is required",
    }),
    country: Joi.string().required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "any.required": "Last name is required",
    }),
    phoneNumber: Joi.string()
      .required()
      .min(10)
      .regex(/^\+?[1-9]{1}[0-9]{0,2}7[2-3|8-9]{1}[0-9]{7}$/)
      .messages({
        "string.empty": "PhoneNumber is required",
        "string.min": "PhoneNumber must be at least {#limit} long",
        "any.required": "PhoneNumber is required",
        "string.pattern.base":
          "PhoneNumber should contain letters, numbers and special characters",
      }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
      "any.required": "email is required",
    }),
    password: Joi.string()
      .required()
      .min(6)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least {#limit} long",
        "any.required": "Password is required",
        "string.pattern.base":
          "Password should contain letters, numbers and special characters",
      }),
  });
  const { error } = schema.validate(req.body);
  error ? res.status(400).json({ error: error.details[0].message }) : next();
};

/**
 * LoginValidator
 * @param req
 * @param res
 * @param next
 */
export const loginValidator = (req: Request, res: Response, next: Function) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
      "any.required": "email is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body);
  error ? res.status(400).json({ error: error.details[0].message }) : next();
};

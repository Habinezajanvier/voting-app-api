import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middlewares/asyncHandler";
import { loginValidator, registerValidator } from "../middlewares/validator";

const { authController } = controller;

const authRouter: Router = Router();

authRouter.post(
  "/signup",
  registerValidator,
  asyncHandler(authController.signup)
);
authRouter.post("/login", loginValidator, asyncHandler(authController.login));

export default authRouter;

import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middlewares/asyncHandler";

const { userController } = controller;

const userRouter: Router = Router();

userRouter.get("/", asyncHandler(userController.getAll));
userRouter.get("/:id", asyncHandler(userController.getOneUser));
userRouter.put("/:id", asyncHandler(userController.udpate));

export default userRouter;

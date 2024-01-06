import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middlewares/asyncHandler";
import { validateId } from "../middlewares/validator";

const { pollController } = controller;

const pollRouter: Router = Router();

pollRouter.post("/", asyncHandler(pollController.createPoll));
pollRouter.get("/", asyncHandler(pollController.getAllPolls));
pollRouter.get(
  "/:id",
  asyncHandler(validateId),
  asyncHandler(pollController.getOnePoll)
);
pollRouter.put(
  "/:id",
  asyncHandler(validateId),
  asyncHandler(pollController.editPoll)
);
pollRouter.delete(
  "/:id",
  asyncHandler(validateId),
  asyncHandler(pollController.deletePoll)
);

export default pollRouter;

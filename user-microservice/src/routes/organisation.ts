import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middlewares/asyncHandler";
import { authorization } from "../middlewares/authorisation";
import {
  createOrganisationValidator,
  validateOrgId,
} from "../middlewares/validator";

const { organisation } = controller;

const router: Router = Router();

router.post(
  "/",
  authorization,
  createOrganisationValidator,
  asyncHandler(organisation.createOrganisation)
);
router.get("/", authorization, asyncHandler(organisation.getAllOrganisations));
router.get(
  "/me",
  authorization,
  asyncHandler(organisation.getOrganistionCreated)
);
router.get(
  "/:id",
  authorization,
  validateOrgId,
  asyncHandler(organisation.getOneOrganistion)
);
router.post(
  "/:id/assign",
  authorization,
  validateOrgId,
  asyncHandler(organisation.assignUserToOrganisation)
);
router.post(
  "/:id/assign-many",
  authorization,
  validateOrgId,
  asyncHandler(organisation.batchAssign)
);
router.put(
  "/:id",
  authorization,
  validateOrgId,
  asyncHandler(organisation.udpate)
);
router.delete(
  "/:id",
  authorization,
  validateOrgId,
  asyncHandler(organisation.deleteOrganisation)
);

export default router;

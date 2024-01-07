import { Router, Request, Response } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import organisationRouter from "./organisation";

const router: Router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to voting app user services" });
});

// All routes handler should be here
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/organisations", organisationRouter);

export default router;

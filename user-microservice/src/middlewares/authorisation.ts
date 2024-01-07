import { Request, Response } from "express";
import { decode } from "../helper";

export const authorization = (req: Request, res: Response, next: Function) => {
  try {
    const { authorization: auth_token } = req.headers;
    const token = auth_token?.split(" ")[1];
    if (!auth_token || !token)
      return res.status(401).json({
        error: "Unable to authenticate",
      });

    const decodedToken = decode(token);
    if (!decodedToken)
      return res.status(401).json({
        error: "Unable to authenticate",
      });
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Unable to authenticate",
    });
  }
};

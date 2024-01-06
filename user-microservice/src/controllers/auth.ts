import { Request, Response } from "express";
import { encode, hashPassword, comparePassword, decode } from "../helper";
import UserServices from "../services/user";
// import { mailType } from "../types";

// const { user } = Services;

class AuthController {
  constructor(private user: UserServices) {}
  /**
   * signup
   * @param req
   * @param res
   * @returns
   */
  public signup = async (req: Request, res: Response) => {
    const { firstname, lastname, email, password, country, phoneNumber } =
      req.body;

    const userExist = await this.user.getUserByEmail(email);
    if (userExist)
      return res.status(409).json({ error: "Email exist, try login" });

    const hashedPassword = await hashPassword(password);

    const data = {
      firstname,
      lastname,
      email,
      country,
      phoneNumber,
      password: hashedPassword,
    };

    const token = encode({ email });

    const newUser = await this.user.createUser(data);

    return res.status(201).json({
      message:
        "User created successfully, check your email to verify your account",
      data: {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        phoneNumber: newUser.phoneNumber,
        country: newUser.country,
      },
    });
  };

  /**
   * login
   * @param req
   * @param res
   * @returns
   */
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userAccount = await this.user.getUserByEmail(email);
    if (!userAccount)
      return res.status(403).json({ error: "Email or Password is incorrect" });

    const validPass = await comparePassword(
      password,
      userAccount.password as string
    );
    if (!validPass)
      return res.status(403).json({
        error: "Email or Password is incorrect",
      });

    const token = encode({ id: userAccount.id, email: userAccount.email });
    return res.status(200).json({
      message: "User logged in successfully",
      token,
      data: {
        id: userAccount.id,
        email: userAccount.email,
        firstname: userAccount.firstname,
        lastname: userAccount.lastname,
      },
    });
  };
}

export default AuthController;

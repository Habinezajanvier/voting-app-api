import services from "../services";
import AuthController from "./auth";
import UserController from "./user";
import OrganisationController from "./organisation";

export default {
  authController: new AuthController(services.user),
  userController: new UserController(services.user),
  organisation: new OrganisationController(services.organisation),
};

import services from "../services";
import PollController from "./poll";

export default {
  pollController: new PollController(services.poll),
};

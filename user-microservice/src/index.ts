import app from "./app";
import { config } from "dotenv";

config();

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`App is up and listening to ${PORT}`));

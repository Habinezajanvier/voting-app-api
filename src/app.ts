import express from "express";
import { graphqlHTTP } from "express-graphql";
import morgan from "morgan";
import userSchema from "./graphql/schema/user";
import root from "./graphql/resolvers";
const app = express();

app.use(morgan("dev"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: userSchema,
    rootValue: root,
    graphiql: true,
    pretty: true,
  })
);

export default app;

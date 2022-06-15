import * as Routes from "./routers/index";
import { setupEnvironmentVariables } from "./setup";

import express from "express";

setupEnvironmentVariables();

const app = express();

app.use(express.json());

app.use("/auth", Routes.AuthRouter.setup());

app.listen(5000, () => {
  console.log("Server started on port 5000");
  console.log("http://localhost:5000/");
});

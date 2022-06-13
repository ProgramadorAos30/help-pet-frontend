import * as Routes from "./routers/index";

import express from "express";

const app = express();

app.use("/example", Routes.Example.setup());

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

import { Logger, LogLevel } from "@utils/index";
import { ExampleRouter } from "@routers/index";

import express from "express";

const app = express();
const logger = new Logger(LogLevel.INFO);

app.use("/example", new ExampleRouter().route());

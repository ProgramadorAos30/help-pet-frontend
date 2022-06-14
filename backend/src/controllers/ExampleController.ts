import { getLoggerInstance } from "../utils/Logger";
import { Request, Response } from "express";

const foo = (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("foo");
  res.json({ message: "Hello World", status: 200 });
};

export { foo };

import { getLoggerInstance } from "../utils/Logger";
import { Request, Response } from "express";

const showAnything = (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("showAnything");
  res.json({ message: "Hello World", status: 200 });
};

export { showAnything };

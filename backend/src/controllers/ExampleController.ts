import { Logger } from "@utils/Logger";

import { Request, Response } from "express";

export class ExampleController {
  constructor(private logger: Logger) {}

  showAnything(req: Request, res: Response) {
    this.logger.logInfo("showAnything");
    res.json({ message: "Hello World", status: 200 });
  }
}

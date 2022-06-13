import { ExampleController } from "@controllers/ExampleController";
import { Logger, LogLevel } from "@utils/Logger";

import { Router } from "express";

export class ExampleRouter {
  private logger: Logger;
  private router: Router;
  private controller: ExampleController;

  constructor() {
    this.logger = new Logger(LogLevel.INFO);
    this.router = Router();
    this.controller = new ExampleController(this.logger);
  }

  setup(): void {
    this.router.get("/", this.controller.showAnything);
    this.router.get("/any", (req, res) => {})
  }

  route() {
    this.setup();
    return this.router;
  }
}

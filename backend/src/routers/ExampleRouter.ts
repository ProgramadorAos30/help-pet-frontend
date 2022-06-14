import { ExampleController } from "../controllers/index";
import { Router } from "express";

const setup = () => {
  const router = Router();
  router.get("/", ExampleController.foo);
  return router;
};

export { setup };

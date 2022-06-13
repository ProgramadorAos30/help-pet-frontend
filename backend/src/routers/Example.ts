import { Example } from "../controllers/index";
import { Router } from "express";

const setup = () => {
  const router = Router();
  router.get("/", Example.showAnything);
  router.get("/any", (req, res) => {});
  return router;
};

export { setup };

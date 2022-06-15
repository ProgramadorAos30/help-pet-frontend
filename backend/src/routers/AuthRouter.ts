import { AuthController } from "../controllers/index";
import { Endpoint } from "../middlewares/";
import { PERMISSIONS } from "../utils/Permissions";

import { Router } from "express";

const setup = () => {
  const router = Router();
  router.post("/", (req, res) =>
    Endpoint(req, res, AuthController.generateToken, PERMISSIONS.ANONYMOUS)
  );

  router.get("/validate", (req, res) =>
    Endpoint(req, res, AuthController.validateToken, PERMISSIONS.USER)
  );
  
  return router;
};

export { setup };

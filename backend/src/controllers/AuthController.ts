import { getLoggerInstance } from "../utils";
import { AuthRepository } from "../data/";

import { Request, Response } from "express";
import JWT from "jsonwebtoken";

const generateToken = (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("generateToken");

  const { username, password } = req.body;

  const mockUser = AuthRepository.getUserByCredential(username, password);

  const token = JWT.sign(mockUser, String(process.env.SECRET_KEY), {
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  });

  res.json({ token, status: 200 });
};

const validateToken = (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("validateToken");
  res.json({ message: "Valid!", status: 200 });
};

export { generateToken, validateToken };

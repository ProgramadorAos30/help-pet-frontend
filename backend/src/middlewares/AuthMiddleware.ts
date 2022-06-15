import { Request, Response } from "express";
import { PERMISSIONS } from "../utils";

import JWT from "jsonwebtoken";

export function Endpoint(
  req: Request,
  res: Response,
  endpointHandler: (req: Request, res: Response) => void,
  minimumRequiredPermission: number
): ((req: Request, res: Response) => void) | void {
  if (minimumRequiredPermission === PERMISSIONS.ANONYMOUS) {
    return endpointHandler(req, res);
  }

  let permissions = 999;
  let exp = 0;

  try {
    const objectToken = JWT.verify(
      String(req.headers.authorization),
      String(process.env.SECRET_KEY)
    ) as JWT.JwtPayload;

    permissions = objectToken.permissions;
    exp = objectToken.exp ?? 0;
  } catch (err) {
    res.status(401).json({ message: "Bad Request", status: 400 });
    return;
  }

  if (Number(exp) * 1000 < Date.now()) {
    res.send({
      message: "Unauthorized: token expired",
      status: 401,
    });
  }

  if (permissions > minimumRequiredPermission) {
    res.send({
      message: "Unauthorized: missing required permissions",
      status: 401,
    });
  }

  return endpointHandler(req, res);
}

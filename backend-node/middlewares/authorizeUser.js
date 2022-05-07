import { BadRequestError } from "../CustomErrors/BadRequestError.js";
import { UnAuthorizedError } from "../CustomErrors/UnAuthorizedError.js";
import { verifyTokenAndGetUserId } from "../utils/jwt.js";

export const authorizeUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new UnAuthorizedError();
  try {
    const userId = verifyTokenAndGetUserId(token);
    req.userId = userId;
    next();
  } catch (err) {
    throw new UnAuthorizedError();
  }
};

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized,invalid token");
    }
  } else {
    res.status(401);
    throw new Error("not authorized,no token");
  }
});

export { adminProtect };

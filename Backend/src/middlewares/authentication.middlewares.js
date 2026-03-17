import apierror from "../utils/apierror.utils.js";
import jwt from "jsonwebtoken";
import asynchandler from "../utils/asynchandler.uitls.js";
import { User } from "../models/user.models.js";

export const verifytoken = asynchandler(async (req, __, next) => {
  const token =
    req.cookies?.accesstoken ||
    (req.header("Authorization")?.startsWith("Bearer ")
      ? req.header("Authorization").replace("Bearer ", "")
      : null);

  if (!token) {
    throw new apierror(401, "Unauthorized, token not found");
  }

  let decodedtoken;

  try {
    decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new apierror(401, "Invalid or expired token");
  }

  const user = await User.findById(decodedtoken._id).select(
    "-password -refreshTokens"
  );

  if (!user) {
    throw new apierror(404, "User not found");
  }

  req.user = user;
  next();
});
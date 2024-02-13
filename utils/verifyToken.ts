import jwt from "jsonwebtoken";

function VerifyToken (token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export default VerifyToken;
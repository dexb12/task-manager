import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = await req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

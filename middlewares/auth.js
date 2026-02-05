import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    //check if the token exist
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // check if the token is valid

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

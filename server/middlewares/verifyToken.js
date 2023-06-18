import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Login To Add Items" });
    // return res.status(401).json({ message: "Access Denied, No Token" });
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.username === "harry408") {
      next();
    } else {
      res.status(403).json({ message: "You are not admin" });
    }
  });
};

import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token  = req.cookies.token;
    if (!token) {
      res.status(403).send({ success: false, message: "Token is required" });
    }
    const decode = await jwt.verify(token, "djkkksdopowed");

    if (!decode) {
      res.status(403).send({ success: false, message: "Token is invalid" });
    }
    req._id = decode._id;
    next();

  } catch (error) {
    res.status(401).send({ success: false, message: error.message });
  }
};

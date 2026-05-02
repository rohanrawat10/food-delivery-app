import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "token not found" });
    }

    let decodedToken;
    console.log("cookeis received:",req.cookies)
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "token invalid or expired" });
    }
            console.log("Cookies received:", req.cookies);
    req.userId = decodedToken.id || decodedToken._id || decodedToken.userId;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ message: "isAuth error", error: err.message });
  }
};

export default isAuth;


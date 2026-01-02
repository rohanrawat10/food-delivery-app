import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "token not found" });
    }

    let decodedToken;
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


// import jwt from "jsonwebtoken";

// const isAuth = (req, res, next) => {
//   try {
//     console.log("---- AUTH MIDDLEWARE ----");
//     console.log("Cookies:", req.cookies);
//     console.log("Token value:", req.cookies?.token);
//     console.log("Token type:", typeof req.cookies?.token);

//     const token = req.cookies?.token;

//     if (!token || typeof token !== "string") {
//       return res.status(401).json({
//         message: "Token missing or not a string",
//         token,
//         type: typeof token
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();

//   } catch (err) {
//     console.error("JWT ERROR:", err.message);
//     return res.status(401).json({ message: err.message });
//   }
// };

// export default isAuth;

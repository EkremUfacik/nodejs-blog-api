const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // const authHeader = req.get("Authorization");
  const tokenCookie = req.cookies.token;
  console.log("tokenCookie", tokenCookie);
  if (!tokenCookie) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  // const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(tokenCookie, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  // console.log(req.userId);
  next();
};

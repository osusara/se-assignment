const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "User unauthorized" });
  }
};

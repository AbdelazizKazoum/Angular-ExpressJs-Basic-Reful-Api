const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RUNDOM_WEB_TOKEN");
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "invalid user ID";
    } else {
      next();
    }
  } catch (err) { 
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

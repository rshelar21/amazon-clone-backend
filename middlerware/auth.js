const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      res.status(401).json({ message: "Unauthorized", result: false });
    const verifyUser = await jwt.verify(token, "testone", (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (verifyUser === "token expired") {
      return res.status(401).json({ message: "token expired", result: false });
    }
    req.user = verifyUser;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authCheck };

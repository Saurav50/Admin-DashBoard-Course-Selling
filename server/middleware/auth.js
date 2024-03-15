const jwt = require("jsonwebtoken");
// json web token generate
const secretKey = "Super97Secr68et"; // replace this with your own secret key

// Authenticate json web tokens
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log(user);

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJwt,
  secretKey,
};

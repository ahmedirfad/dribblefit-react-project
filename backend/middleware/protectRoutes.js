const jwt = require("jsonwebtoken");
require("dotenv").config();

const protectRoutes = (req, res, next) => {
  try {
    let token = req.cookies?.Access_Token || 
                req.headers['x-access-token'] || 
                req.query?.token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.match(/^bearer\s+/i)) {
        token = authHeader.split(/\s+/)[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Please Login First" });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    req.user = {
      Email: decode.Email,
      Id: decode.Id,
      role: decode.role,
    };

    next();
  } catch (e) {
    res.status(401).json({ message: "Authentication Error", error: e.message });
  }
};

module.exports = protectRoutes;
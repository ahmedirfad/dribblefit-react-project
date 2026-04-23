const jwt = require("jsonwebtoken");
require("dotenv").config();

const buildTokenPayload = (email, userId, role) => ({
  Email: email,
  Id: userId,
  role,
});

const GenerateToken = async (email, userId, role) => {
  const payload = buildTokenPayload(email, userId, role);

  const RefreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "7d",
  });

  const AccessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "30m",
  });

  return { RefreshToken, AccessToken };
};

module.exports = GenerateToken;
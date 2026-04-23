const jwt = require("jsonwebtoken");

const getCookieOptions = (maxAge) => ({
  httpOnly: true,
  sameSite: "none",
  secure: false,
  path: "/",
  maxAge,
});

const TokenRegenerator = (req, res) => {
  try {
    let token = req.cookies?.Refresh_Token || req.body?.RefreshToken;

    if (!token) {
      return res.status(401).json({ message: "No Refresh Token Found" });
    }

    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);

    const AccessToken = jwt.sign(
      { Email: decode.Email, Id: decode.Id, role: decode.role },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "30m" }
    );

    const RefreshToken = jwt.sign(
      { Email: decode.Email, Id: decode.Id, role: decode.role },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "7d" }
    );

    res
      .cookie("Access_Token", AccessToken, getCookieOptions(30 * 60 * 1000))
      .cookie("Refresh_Token", RefreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000))
      .json({
        message: "Successfully regenerated tokens",
      });

  } catch (e) {
    return res.status(403).json({
      message: "Refresh token expired. Please login again.",
      error: e.message
    });
  }
};

module.exports = { TokenRegenerator, getCookieOptions };
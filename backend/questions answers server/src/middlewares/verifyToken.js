const errorBuilder = require("../util/error-builder");
const axios = require("axios");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    errorBuilder("validation failed", 401, ["auth header is missing"], next);
  }
  const token = authHeader.split(" ")[1];
  try {
    const axiosRes = await axios.get("http://localhost:8080/api/userinfo", {
      headers: { Authorization: "Bearer " + token },
    });
    if (!axiosRes.data.email || !axiosRes.data.nickName) {
      errorBuilder("validation failed", 401, ["unauthorized"], next);
    } else {
      res.email = axiosRes.data.email;
      req.nickName = axiosRes.data.nickName;
      next();
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 401;
    }
    next(err);
  }
};

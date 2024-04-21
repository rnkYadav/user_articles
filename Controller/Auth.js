// const { getData, saveData, getSingleData } = require("../Model");
const JWT = require("jsonwebtoken");

class Auth {
  getToken = function (data) {
    return JWT.sign(data, process.env.TOKEN_SECRET_KEY);
  };
  authenticateUser = async function (req, res, next) {
    try {
      let { token } = req.headers;
      if (!token) throw Error("Login required");
      let decoded = JWT.decode(token, process.env.TOKEN_SECRET_KEY);
      if (!decoded?.email) {
        throw Error("Invalid token");
      } else {
        req.user = decoded;
        next();
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  verifyRequest = async function(req, res, next){
    try {
        let ipAddress = req.ip;
        // Logic to verify the request
        next ();
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
  }
}

module.exports = new Auth();

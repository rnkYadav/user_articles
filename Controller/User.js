const { getData, saveData, getSingleData } = require("../Model");
const JWT = require("jsonwebtoken");

class User {
  getUser = async function (req, res) {
    try {
      let { _id } = req.params;
      let condition = {
        isActive: true,
      };
      let users;
      if (_id) {
        Object.assign(condition, { _id: _id });
        users = await getSingleData("User", condition);
      } else {
        users = await getData("User", condition);
      }
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  loginUser = async function (req, res) {
    try {
      let { email, password } = req.body;
      const user = await getSingleData(
        "User",
        {
          isActive: true,
          email: email,
          password: password,
        },
        {
          name: 1,
          email: 1,
        }
      );
      if (!user) throw Error("Invalid email or password");
      let token = JWT.sign(user, process.env.TOKEN_SECRET_KEY);

      return res.status(200).json({
        success: true,
        message: "Login successfull",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  createUser = async function (req, res) {
    try {
      let { email } = req.body;
      const users = await getData("User", {
        isActive: true,
        email: email,
      });
      if (users?.length) throw Error("User with this email already exists");
      const savedUser = await saveData("User", req.body);
      return res.status(200).json({
        success: true,
        data: savedUser,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports.User = new User();

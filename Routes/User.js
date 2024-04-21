const express = require("express");
const { User } = require("../Controller/User");
const router = express.Router();

router.post("/register", User.createUser);
router.post("/login", User.loginUser);
router.get("/list", User.getUser);
router.get("/:_id", User.getUser);


module.exports = router;
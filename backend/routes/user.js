const express = require("express");
const userCtr = require("../controllers/userCtr");

const router = express.Router();

//Sign up user
router.post("/signup", userCtr.signUp);

// Log in
router.post("/login", userCtr.login);

module.exports = router;

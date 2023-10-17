const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");

router.post("/", loginController.login);//Wasan Al-Sayed
router.post("/logout", loginController.logout);//Wasan Al-Sayed

module.exports = router;
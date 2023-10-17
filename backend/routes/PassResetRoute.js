const express = require("express");
const router = express.Router();
const PassResetController = require("../controllers/PassResetController");

router.post("/resetPassword",PassResetController.sendForgetPasswordCode);//Osama Khanfa








module.exports = router;
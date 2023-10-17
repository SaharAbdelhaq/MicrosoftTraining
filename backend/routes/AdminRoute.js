const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");
const isAuth = require('../middleware/is-auth')

router.get("/name",isAuth, adminController.getAdminName);
router.post("/addSection",isAuth, adminController.addSection)//Wasan Al-Sayed
router.get("/AllReports",isAuth, adminController.getReports);//Osama Khanfa
router.get("/AllStats",isAuth, adminController.getStats);//Osama Khanfa
router.get("/report:id",isAuth, adminController.getSpecificReport);//Wasan Al-Sayed


module.exports = router;

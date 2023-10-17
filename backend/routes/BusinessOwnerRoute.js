const express = require("express");
const router = express.Router();

const businessOwnerController = require("../controllers/BusinessOwnerController");
const isAuth = require('../middleware/is-auth')

router.post("/Register", businessOwnerController.postBusinessOwnerRegister); // Omar Salous
router.put("/updateInfo",isAuth, businessOwnerController.updateInfo);//Wasan Al-Sayed
router.get("/businessOwners/type=:type",isAuth, businessOwnerController.getAllBuisnessOwners);//Wasan Al-Sayed
router.get("/allBusinessOwners",isAuth, businessOwnerController.getBuisnessOwners);//Wasan Al-Sayed
router.get("/products/:name",isAuth, businessOwnerController.getBusinessOwnerProducts);//Osama Khanfa

module.exports = router;

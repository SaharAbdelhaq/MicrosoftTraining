const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const isAuth = require('../middleware/is-auth')

router.post("/ProductFeedback",isAuth, userController.postRatingCommentToSpecificProduct); //Omar Salous
router.get("/name", userController.getUserName);
router.get("/sections",isAuth, userController.getSections);//Wasan Al-Sayed
router.get("/favorites",isAuth, userController.getFavorites);//Wasan Al-Sayed
router.post("/Report",isAuth, userController.postReport); //Omar Salous
router.get("/recommendationProducts",isAuth, userController.getRecommendationProducts); //Omar Salous
router.delete("/favorite/remove/:id",isAuth, userController.removeFavorite);//Osama Khanfa
router.post("/favorite/add:id",isAuth, userController.addFavorite);//Osama Khanfa
router.get("/products/:name",isAuth, userController.getBusinessOwnerProducts);//Osama Khanfa

module.exports = router;
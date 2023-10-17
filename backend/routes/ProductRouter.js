const express = require("express");
const router = express.Router();

const productController = require("../controllers/ProductController");
const isAuth = require('../middleware/is-auth')

router.put("/editProductData/:id",isAuth, productController.updateProduct); //Omar Salous
router.get("/allproduct",isAuth, productController.getAllProducts);//Osama Khanfa
router.get("/productByID/:id",isAuth, productController.getProductByID);//Osama Khanfa
router.get("/reviews/:id",isAuth, productController.getReviewsByID);//Osama Khanfa
router.post("/FiltersProducts",isAuth, productController.getFiltersProducts); //Omar Salous
router.post("/newProduct",isAuth, productController.AddProduct); //Omar Salous
router.delete("/removeSpecificProduct/:id",isAuth, productController.deleteProduct); //Omar Salous

module.exports = router;
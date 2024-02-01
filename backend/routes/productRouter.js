const express = require('express');
const router = express.Router();
const {createProduct,getProductsEndpoint,getProduct,updateProduct,deleteProduct} = require("../controllers/productController");
const storage = require('../model/multer'); 
const multer = require('multer');


router.route('/').post(multer({ storage:storage }).array('images', 5),createProduct);
router.route('/').get(getProductsEndpoint);
router.route('/:id').get(getProduct);
router.route('/:id').put(multer({ storage:storage }).array('images', 5),updateProduct)
router.route('/:id').delete(deleteProduct)

module.exports = router;

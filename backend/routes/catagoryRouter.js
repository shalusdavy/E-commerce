
const express = require ("express");
const router = express.Router();
const {getCategories, createCatagories} =require ('../controllers/catagoryController')


router.route("/").get(getCategories);
router.route("/").post(createCatagories);

module.exports = router;
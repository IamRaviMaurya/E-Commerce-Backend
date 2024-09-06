const express = require("express");
const { addProduct, removeProduct, productList} = require("../controllers/productController");

const router = express.Router();

router.post("/addProduct", addProduct);
router.delete("/removeProduct/:id", removeProduct);
router.get("/productList", productList)

module.exports = router;
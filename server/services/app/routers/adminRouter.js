const AdminControllers = require("../controllers/AdminController");
const express = require("express");
const router = express.Router();

router.get("/products", AdminControllers.getAllProducts);
router.get("/categories", AdminControllers.getAllCategories);
router.post("/addCategory", AdminControllers.addCategory);
router.post("/add", AdminControllers.addProduct);
router.get("/:productId", AdminControllers.getProductsDetail);
router.put("/:productId", AdminControllers.editProduct);
router.delete("/category/:categoryId", AdminControllers.deleteCategory);
router.delete("/product/:productId", AdminControllers.deleteProduct);

module.exports = router;

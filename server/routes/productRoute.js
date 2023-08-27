const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { 
    getAllProducts, 
    createProduct, 
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteProductReview,
    getAdminProducts,
    getDashboardStats
} = require("../controllers/productController");
const { multipleUpload } = require("../middlewares/multer");

const router = express.Router();

// Products routes

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), multipleUpload, createProduct);

router.route("/product/:id")
.get(getProductDetails)
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review")
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductReview)
.put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews);

router.route("/admin/stats").get(isAuthenticatedUser, authorizeRoles("admin"), getDashboardStats);

module.exports = router;
const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const { 
    createNewOrder,
    getSingleOrder,
    getMyOrders,
    getAllOrders,
    updateStatus,
    deleteOrder
} = require("../controllers/orderController");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createNewOrder);

router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateStatus)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
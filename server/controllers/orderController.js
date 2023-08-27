const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Stat = require("../models/StatModel");

// Create new order --> User Route

exports.createNewOrder = catchAsyncError (
    async (req, res, next) => {
        const { 
            shippingInfo, 
            orderItems, 
            paymentInfo,
            itemsPrice, 
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            shippingInfo, 
            orderItems, 
            paymentInfo,
            itemsPrice, 
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            createdBy: req.user._id
        })

        res.status(200).json({
            success: true,
            order
        })
    }
)

// Get single order --> Admin Route

exports.getSingleOrder = catchAsyncError (
    async (req, res, next) => {
        const order = await Order.findById(req.params.id).populate("createdBy", "name email");
        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        res.status(200).json({
            success: true,
            order
        })
    }
)

// Get my orders --> User Routes

exports.getMyOrders = catchAsyncError (
    async (req, res, next) => {
        const orders = await Order.find({ createdBy: req.user._id });

        res.status(200).json({
            success: true,
            orders
        })
    }
)

// Get all orders --> Admin Route

exports.getAllOrders = catchAsyncError (
    async (req, res, next) => {
        const orders = await Order.find({});

        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice;  
        })

        res.status(200).json({
            success: true,
            totalAmount,
            orders
        })
    }
)

// Update order status --> Admin Route

exports.updateStatus = catchAsyncError (
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        if (order.orderStatus.toLowerCase() === "delivered") {
            return next(new ErrorHandler("You have already delivered this order", 404));
        }

        order.orderItems.forEach(or => {
            updateStock(or.product, or.quantity);
        })

        order.orderStatus = req.body.status;
        if (req.body.status.toLowerCase() === "delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            order
        })
    }
)

// Delete order --> Admin route

exports.deleteOrder = catchAsyncError (
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        await order.deleteOne();

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        })
    }
)

async function updateStock (id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

// Checking updates of order to update stats

Order.watch().on("change", async () => {
    try {
        const stats = await Stat.find({}).sort({ createdAt: "desc" }).limit(1);
        stats[0].orders = await Order.countDocuments();

        let sales = 0;
        const orders = await Order.find({});

        for (let i = 0; i < orders.length; i++) {
            sales += orders[i].totalPrice;
        }
        stats[0].sales = sales;

        await stats[0].save();   
    } catch (err) {
        console.log(err);
    }
})
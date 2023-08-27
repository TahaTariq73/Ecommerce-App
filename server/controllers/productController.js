const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const Stat = require("../models/StatModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");

// Getting all products --> Public Route

exports.getAllProducts = catchAsyncError (
    async (req, res, next) => {
        const resultPerPage = Number(process.env.ITEMS_PER_PAGE);
        const productsCount = await Product.countDocuments();

        const apiFeature = new ApiFeatures(Product.find({}), req.query)
        .search()
        .filter();

        let products = await apiFeature.query;

        let filteredProductsCount = products.length;
        
        apiFeature.pagination(resultPerPage);

        products = await apiFeature.query.clone();

        res.status(200).json({ 
            success: true,
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount
        })
    }
)

// Getting all products --> Admin Route

exports.getAdminProducts = catchAsyncError (
    async (req, res, next) => {
        const products = await Product.find();
        
        res.status(200).json({
            success: true,
            products
        })
    }
)

// Creating product --> Admin Route

exports.createProduct = catchAsyncError (
    async (req, res, next) => {
        if (req.files.length === 0) {
            return next(new ErrorHandler("Please give a product image", 401));
        } 

        if (req.files.length > process.env.MAX_FILES) {
            return next(new ErrorHandler("Images can't be more than 6", 400));
        }

        const imagesLinks = [];

        for (let i = 0; i < req.files.length; i++) {
            const fileUri = getDataUri(req.files[i]);
            const result = await cloudinary.v2.uploader.upload(fileUri.content, {
                folder: "products"
            })

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks;
        req.body.createdBy = req.user._id;

        const product = await Product.create(req.body);

        res.status(200).json({
            success: true,
            product
        }) 
    }
)

// Getting product details --> Public Route

exports.getProductDetails = catchAsyncError (
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
    
        res.status(200).json({
            success: true,
            product
        })
    }    
)

// Updating product --> Admin Route

exports.updateProduct = catchAsyncError (
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
    
        res.status(200).json({
            success: true,
            product
        })
    }
)

// Deleting product --> Admin Route

exports.deleteProduct = catchAsyncError (
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        for (let i = 0; i < product.images.length; i++) {
            const image = product.images[i];
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
    
        await product.deleteOne();
    
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
)

// Create product review or update --> User Route

exports.createProductReview = catchAsyncError (
    async (req, res, next) => {
        const { rating, comment, productId } = req.body;
        const review = {
            createdBy: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        const product = await Product.findById(productId);
        if (!product) {
            return next(new ErrorHandler("Product Id is invalid", 404));
        }

        const isReviewed = product.reviews.find(
            rev => rev.createdBy.toString() === req.user._id.toString()
        )

        if (isReviewed) {
            product.reviews.forEach(rev => {
                if (rev.createdBy.toString() === req.user._id.toString()) {
                    rev.rating = rating,
                    rev.comment = comment
                }
            })
        } else {
            product.reviews.push(review);
            product.numOfReviews += product.reviews.length;
        }

        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating;
        }) 
        
        product.rating = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });
        
        res.status(200).json({
            success: true,
            message: "Review has been added"
        })
    }
)

// Get all reviews of a product --> Public Route

exports.getProductReviews = catchAsyncError (
    async (req, res, next) => {
        const product = await Product.findById(req.query.id);
        if (!product) {
            return next(new ErrorHandler("Product Id is invalid", 404));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    }
)

// Delete product review --> User Route

exports.deleteProductReview = catchAsyncError (
    async (req, res, next) => {
        const product = await Product.findById(req.query.id);
        if (!product) {
            return next(new ErrorHandler("Product Id is invalid", 404));
        }

        const reviews = product.reviews.filter(rev =>
            rev._id.toString() !== req.query.reviewId.toString()
        )

        let avg = 0;
        reviews.forEach(rev => {
            avg += rev.ratings;
        }) 
        
        const ratings = avg / reviews.length;
        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(req.query.id, {
            reviews,
            ratings,
            numOfReviews
        }, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
)

// Managing dashboard stats --> Admin Route

exports.getDashboardStats = catchAsyncError (
    async (req, res, next) => {
        const stats = await Stat.find({}).sort({ createdAt: "desc" }).limit(12);

        const statsData = [];
        for (let i = 0; i < stats.length; i++) {
            statsData.unshift(stats[i]);
        }

        const requiredSize = 12 - stats.length;
        for (let i = 0; i < requiredSize; i++) {
            statsData.unshift({
                sales: 0,
                products: 0,
                orders: 0
            })
        }

        const productsCount = await Product.countDocuments();
        const usersCount = await User.countDocuments();
        const ordersCount = await Order.countDocuments();

        const products = await Product.find({});
        let productsInStock = 0;
        let productsOutOfStock = 0;

        for (let i = 0; i < products.length; i++) {
            if (products[i].stock <= 0) {
                productsOutOfStock += 1;
            } else {
                productsInStock += 1;
            }
        }

        const deliveredOrders = (await Order.find({ orderStatus: "Delivered" })).length;
        const shippedOrders = (await Order.find({ orderStatus: "Shipped" })).length;
        const processingOrders = (await Order.find({ orderStatus: "Processing" })).length;

        res.json({
            success: true,
            productsCount,
            usersCount,
            ordersCount,
            statsData,
            productsInStock,
            productsOutOfStock,
            deliveredOrders,
            shippedOrders,
            processingOrders
        })
    }
)

// Checking updates of product to update stats

Product.watch().on("change", async () => {
    try {
        const stats = await Stat.find({}).sort({ createdAt: "desc" }).limit(1);
        stats[0].products = await Product.countDocuments();

        await stats[0].save();   
    } catch (err) {
        console.log(err);
    }
})
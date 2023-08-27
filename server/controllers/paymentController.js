const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe = require("stripe");

exports.processPayment = catchAsyncError (
    async (req, res, next) => {
        const myPayment = await stripe(process.env.STRIPE_SECRET_KEY).paymentIntents.create({
            amount: req.body.amount,
            currency: "pkr",
            metadata: {
                company: "Subkart"
            }
        })

        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret
        })
    }
)

exports.sendStripeApiKey = catchAsyncError(
    async (req, res, next) => {
        res.status(200).json({
            stripeApiKey: process.env.STRIPE_API_KEY
        })
    }
)
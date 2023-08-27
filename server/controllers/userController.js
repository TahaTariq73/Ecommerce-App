const User = require("../models/UserModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
const getDataUri = require("../utils/dataUri");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register account --> Public Route

exports.registerUser = catchAsyncError (
    async (req, res, next) => {
        const { name, email, password } = req.body;

        if (req.file === undefined) {
            return next(new ErrorHandler("Please give a avatar", 401));
        }

        const fileUri = getDataUri(req.file);
        const result = await cloudinary.v2.uploader.upload(fileUri.content, {
            folder: "users"
        })

        const user = await User.create({
            name, email, password, avatar: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })

        sendToken(user, 200, res);
    }
)

// Login into account --> Public Route

exports.login = catchAsyncError (
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        sendToken(user, 200, res);
    }
)

// Logout your account --> Public Route

exports.logout = catchAsyncError (
    async (req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "Logget out successfully"
        })
    }
)

// Forgot your password --> Public Route

exports.forgotPassword = catchAsyncError (
    async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const resetToken = await user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const url = `${req.protocol}://${req.get("host")}`;

        const resetPasswordUrl = `${url}/api/v1/password/reset/${resetToken}`;
        // const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

        const message = `Your password reset token is : \n \n ${resetPasswordUrl} \n \n If you have not requested this please ignore`;
    
        try {
            // Sending token to gmail

            await sendEmail({
                email: user.email,
                subject: "Subkart Password Recovery",
                message
            })

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`
            })
        } catch (error) {
            // Reseting token if error occured
            
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

// Reset your password --> Public Route

exports.resetPassword = catchAsyncError (
    async (req, res, next) => {
        if (!req.body.password || !req.body.confirmPassword) {
            return next(new ErrorHandler("Please fill all credentials", 400));
        }

        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password doesn't match", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        sendToken(user, 200, res);
    }
)

// Get user details --> User route

exports.getUserDetails = catchAsyncError (
    async (req, res, next) => {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user
        })
    }
)

// Update user password --> User Route

exports.updatePassword = catchAsyncError (
    async (req, res, next) => {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user._id).select("+password");

        const isPasswordMatched = await user.comparePassword(oldPassword);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid password", 401));
        }

        if (newPassword !== confirmPassword) {
            return next(new ErrorHandler("Password doesn't matched", 401));
        }

        user.password = newPassword;
        await user.save();

        sendToken(user, 200, res);
    }
)

// Update user profile --> User Route

exports.updateProfile = catchAsyncError (
    async (req, res, next) => {
        const data = {
            name: req.body.name,
            email: req.body.email
        }

        const user = await User.findByIdAndUpdate(req.user._id, data, {
            new: true,
            runValidators: true
        })
        await user.save();

        res.status(200).json({
            success: true,
            user
        })
    }
)

// Get all users --> Admin Route

exports.getAllUsers = catchAsyncError (
    async (req, res, next) => {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            users
        })
    }
)

// Get single user --> Admin Route

exports.getSingleUser = catchAsyncError (
    async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user
        })
    }
)

// Update user role --> Admin Route

exports.updateUserRole = catchAsyncError (
    async (req, res, next) => {
        const data = {
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id, data, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user
        })
    }
)

// Delete user --> Admin Route

exports.deleteUser = catchAsyncError (
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    }
)

// Delete my profile --> User Route

exports.deleteMyProfile = catchAsyncError (
    async (req, res, next) => {
        const user = await User.findById(req.user._id);

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "Your profile deleted successfully"
        })
    }
)
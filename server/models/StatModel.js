const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
    sales: {
        type: Number,
        default: 0
    },
    products: {
        type: Number,
        default: 0
    },
    orders: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Stat", statSchema);
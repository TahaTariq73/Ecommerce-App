const app = require("./app");
const cloudinary = require("cloudinary");
const connectToMongo = require("./config/db");
const Stat = require("./models/StatModel");
const nodeCron = require("node-cron");

// Handling uncaught exception

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to Uncaught Exception");

    process.exit(1);
})

// Configuring environment variables

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "server/config/config.env" });
}

// Connecting to mongo database

connectToMongo();

// Configuring cloundinary storage

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})

// Creating a stats on every month

nodeCron.schedule("0 0 0 1 * *", async () => {
    try {
        await Stat.create({});
    } catch (err) {
        console.log(err);
    }
})

async function createFirstStat () {
    if (await Stat.countDocuments() === 0) {
        await Stat.create({});
    }
}
createFirstStat();

// Listening app

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled promise rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to Unhandled Promise Rejection");

    server.close(() => {
        process.exit(1);
    })
})
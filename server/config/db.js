const mongoose = require("mongoose");

const connectToMongo = async () => {
    await mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`Mongo db connected with server: ${data.connection.host}`);
    })
}

module.exports = connectToMongo;
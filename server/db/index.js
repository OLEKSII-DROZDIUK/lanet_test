const mongoose = require("mongoose");
const {uri} = require('./config');

const connectMongooseDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongoDb connect...");

    } catch(err) {
        throw err.message;
    }
} 

module.exports = connectMongooseDB;

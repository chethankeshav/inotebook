const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/master"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
};

module.exports = connectToMongo
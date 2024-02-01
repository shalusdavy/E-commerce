const mongoose = require('mongoose');

const connectToDatabase = () => {
    const uri = process.env.DB;

    if (!uri) {
        console.error('MongoDB connection URI is not defined in environment variables.');
        return;
    }

    mongoose.connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectToDatabase;

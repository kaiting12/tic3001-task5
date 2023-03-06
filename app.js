const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// Initialize Redis client
const redisClient = redis.createClient();

redisClient.connect();

redisClient.on('connect', function () {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Error connecting to Redis:', err);
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/game', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Create Mongoose schema and model for the data
const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    borrower: {
        type: String,
        required: true
    }
});
const Data = mongoose.model('games', dataSchema);

// Create Express app
const app = express();

// Define route for retrieving data
app.get('/games', async (req, res) => {
    // Get value of "games" key in redis
    const games = await redisClient.get("games");
    if (games !== null) {
        res.send(JSON.parse(games));
    } else {
        try {
            // Retrieve value from mongodb
            const data = await Data.find();
            // Save the value in redis
            await redisClient.set("games", JSON.stringify(data));
            res.send(data);
        } catch (error) {
            console.error(error);
            res.send({data: error});
        }
    }
});

// Start the server
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server started on port ${port}`));

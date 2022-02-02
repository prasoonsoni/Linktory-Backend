require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// connecting to mongoDB
const mongoAtlasUri = process.env.MONGO_URI;
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );
} catch (e) {
    console.log("Could not connect: " + e);
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection Error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));


// all end points will come here
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// Endpoints for users
app.use('/api/auth/register', require('./routes/auth/register'));
app.use('/api/auth/login', require('./routes/auth/login'));

app.listen(port, () => {
    console.log(`LINKtory listening at http://localhost:${port}`);
})
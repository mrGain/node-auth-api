require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route Middlewares
app.use('/api/user',authRoute)
app.use('/api/posts',postRoute)

// Connect to MongoDB
connectDB();




app.listen(process.env.APP_PORT, () => {
    console.log('Server is up and running on port ' + process.env.APP_PORT);
});
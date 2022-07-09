const express = require('express');
const connectDB = require('./config/database');

// Import Routes
const authRoute = require('./routes/auth');

const app = express();
//Route Middlewares
app.use('/api/user',authRoute)

// Connect to MongoDB
connectDB();




app.listen(process.env.APP_PORT, () => {
    console.log('Server is up and running on port ' + process.env.APP_PORT);
});
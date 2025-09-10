const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// CONNECT TO MONGO DATABASE
// You can use environment variables for db configuration
const dbUsername = process.env.DB_USERNAME || 'mongoose';
const dbPassword = process.env.DB_PASSWORD || 'mongoose';
const dbAddress = process.env.DB_ADDRESS || '127.0.0.1';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'tvShows'; 
const dbLocal = process.env.DB_LOCAL || true;
const dbURL = (dbLocal) ? 
  `mongodb://${dbAddress}:${dbPort}/${dbName}` : 
  `mongodb://${dbUsername}:${dbPassword}@${dbAddress}:${dbPort}/${dbName}`;
mongoose.connect(dbURL)
.then(function () {
  console.log('DB Connection Open!');
})
.catch(function (error) {
  console.log(error);
})

// CREATE EXPRESS VIEWS AND ROUTES
app.use(express.json());
app.use(cors())
app.use('/api', apiRoutes)

// CREATE EXPRESS SERVER
// You can use environment variables for api configuration
const apiPort = process.env.API_PORT || 3000;
app.listen(apiPort, () => {
    console.log(`Server is running on port ${apiPort}`);
});

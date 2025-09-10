const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const apiRoutes = require('./routes/apiRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CONNECT TO MONGO DATABASE
// You can use environment variables for db configuration
const dbUsername = process.env.DB_USERNAME || 'mongoose';
const dbPassword = process.env.DB_PASSWORD || 'mongoose';
const dbAddress = process.env.DB_ADDRESS || '127.0.0.1';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'tvShows'; 
const dbLocal = process.env.DB_LOCAL || true;
//
console.log(process.env.DB_LOCAL);
console.log(dbLocal);
console.log(process.env.DB_USERNAME);
console.log(dbUsername);
console.log(process.env.DB_PASSWORD);
console.log(dbPassword);
console.log(process.env.DB_ADDRESS);
console.log(dbAddress);
console.log(process.env.DB_PORT);
console.log(dbPort);
console.log(process.env.DB_NAME);
console.log(dbName);
const dbURL = (dbLocal === true) ? `mongodb://${dbAddress}:${dbPort}/${dbName}` : `mongodb://${dbUsername}:${dbPassword}@${dbAddress}:${dbPort}/${dbName}`;
var dbURL2 = '';
if (dbLocal === true) {
  dbURL2 = `mongodb://${dbAddress}:${dbPort}/${dbName}`;
} else {
  dbURL2 = `mongodb://${dbUsername}:${dbPassword}@${dbAddress}:${dbPort}/${dbName}`;
}
console.log(`dbURL = ${dbURL}`);
console.log(`dbURL2 = ${dbURL2}`);
//
mongoose.connect(dbURL)
.then(function () {
  console.log('DB Connection Open!');
  console.log(dbURL);
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

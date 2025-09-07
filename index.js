const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// CONNECT TO MONGO DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/tvShows')
.then(function () {
  console.log('DB Connection Open!');
})
.catch(function (error) {
  console.log(error);
})

// CREATE EXPRESS VIEWS AND ROUTES
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to the TVshows API!');
});

// CREATE EXPRESS SERVER
const port = process.env.PORT || 3010; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
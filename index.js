import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import uri from './config/keys_prod';


var cors = require('cors');
const path = require('path');

const app = express();

/* Connect to the database */
try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
} catch (error) {
    console.log("Error on initial connection");
    console.log(error);
}

mongoose.connection.on('error', err => {
    console.log("Error after initial connection");
    console.log(err);
});
  
      
/* Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Allow CORS */
app.use(cors());

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});


/**
 * Register the routes
 */

routes(app);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

const port = process.env.PORT || '5000'; app.listen(port); 

console.log(`Listening on port ${port}`);

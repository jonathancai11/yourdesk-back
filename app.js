import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import uri from './config/keys_prod';


var cors = require('cors');

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

export default app;

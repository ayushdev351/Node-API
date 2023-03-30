require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const productsRoute = require('./routes/products.js');
const connectDB = require('./db/connect.js');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error-handler.js');

// Middlewares
app.use(express.json());

//temp root

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello baby.....</h1><a href = "/api/v1/products">Product API</a>');
})

//rootes
app.use('/api/v1/products', productsRoute);

//My middlewares for error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

//starting the server
const port = process.env.PORT || 3000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server running at port : ${port}`));
    }
    catch(err){
        console.log(err);
    }
}

//invoking 
start();

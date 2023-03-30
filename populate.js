require('dotenv').config();

const connectDB = require('./db/connect.js');
const Product = require('./models/product.js');
const jsonData = require('./products.json');

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonData);
        console.log("Populated Data");
    }
    catch(err){
        console.error(err);
    }
}

start();

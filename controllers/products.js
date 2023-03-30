const Product = require('../models/product.js');

const getallProducts = async (req, res) => {
    const {featured, company, name} = req.query;
    const queryObject = {};

    if(featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if(company) {
        queryObject.company = company;
    }

    if(name) {
        queryObject.name = {$regex : name, $options : 'i'};
    }

    console.table(queryObject);
    const products = await Product.find(queryObject);
    res.status(200).json({products, count : products.length});
}

const getallProductsStatic = async(req, res) => {
    const query = 'a';
    const products = await Product.find({
        name : {$regex : query, $options : 'i'},
    });
    res.status(200).json({products, count : products.length});
}

module.exports = {
    getallProducts,
    getallProductsStatic
};
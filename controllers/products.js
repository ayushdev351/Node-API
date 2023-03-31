const Product = require('../models/product.js');

const getallProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const queryObject = {};

    // properties present in Schema
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if(company) {
        queryObject.company = company;
    }

    if(name) {
        queryObject.name = {$regex : name, $options : 'i'};
    }

    //Numeric filters

    if(numericFilters)
    {
        const operatorMap = {
            '>' : '$gt',
            '<' : '$lt',
            '>=' : '$gte',
            '<=' : '$lte',
            '=' : '$eq',
        }

        const regEx = /\b(>|<|>=|<=|=)\b/g;

        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        
        const options = ['price', 'rating'];

        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');

            if(options.includes(field)) {
                queryObject[field] = {[operator] : Number(value)};
            }
        })

    }

    let result = Product.find(queryObject);
    console.table(queryObject);

    // property not present in Schema
    // sort : used to sort the result
    if(sort)
    {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else
    {
        result = result.sort('createdAt');
    }

    // used to show only the specified fields in the result
    if(fields)
    {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    // Paging using skip and limit

    const limit = Number(req.query.limit); // changing string to number
    const page = Number(req.query.page);
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({products, count : products.length});
}

const getallProductsStatic = async(req, res) => {
    const products = await Product.find({price : {$gt : 30}})
    .sort('price')
    .select('price')
    .limit(10)
    .skip(5);

    res.status(200).json({products, count : products.length});
}

module.exports = {
    getallProducts,
    getallProductsStatic
};


const getallProducts = (req, res) => {
    res.status(200).json({msg : "All products"});
}

const getallProductsStatic = (req, res) => {
    res.status(200).json({msg : "All products static"});
}

module.exports = {
    getallProducts,
    getallProductsStatic
};
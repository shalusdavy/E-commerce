const asyncHandler = require('express-async-handler');
const productService = require('../services/productService');
const path = require('path');


const getProductsEndpoint = asyncHandler(async (req, res) => {
    const products = await productService.getProducts();

    res.status(200).json(products);
    console.log("all data", products);
});


// create new products
const createProduct = asyncHandler(async (req, res) => {
    console.log(" The request body is :", req.body);
    const { name, description, price, quantity, product_id } = req.body;
    const images =req.files && req.files.map(file => file.filename) ;
    // console.log(req.files);
    console.log(" images :", images);

  


    const newProduct = await productService.createProduct({
        name,
        description,
        price,
        quantity,
        product_id,
        images,
});
    console.log(" The request body is :", newProduct);

    res.status(201).json(newProduct);
});



// get Product by id
const getProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json(product);
});


// // update product
const updateProduct = asyncHandler(async (req, res) => {
    let imagePaths = [];

    if (req.files && req.files.length > 0) {
        imagePaths = req.files.map(file => file.path);
    } else {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        imagePaths = product.images;
    }

    const updateData = {
        ...req.body,
        ...(imagePaths.length > 0 ? { images: imagePaths } : {}),
    };
    const productId = req.params.id;
    const updatedProduct = await productService.updateProduct(productId, updateData, imagePaths);
console.log(updatedProduct);
    return res.status(200).json(updatedProduct);
});


// // delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await productService.deleteProduct(productId);
    console.log("product deleted succefully")
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json(product);
});


module.exports = {
    getProductsEndpoint,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};









const Product = require('../model/productSchema')
const fs = require('fs').promises;

// get All products
const getProducts = async () => {
    return await Product.find();
};

// create new products
const createProduct = async ({name, description, price, quantity, product_id, images}) => {
    console.log(name, description, price, quantity, product_id, images);
    try {
        const newProduct = await Product.create({ name, description, price, quantity, product_id, images });
        return newProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};


// get Product by id
const getProductById = async (productId) => {
    return await Product.findById(productId);
};

// // update product
const updateProduct = async (productId, updatedData, newImagePaths) => {
    const product = await Product.findById(productId);
    if (!product) {
        console.log('Product not found');
        return null;
    }
    if (newImagePaths && newImagePaths.length > 0) {
        if (product.images && product.images.length > 0) {
            try {
                await Promise.all(product.images.map(async (imagePath) => {
                    await fs.unlink(imagePath);
                }));
            } catch (error) {
                console.error('Error deleting old image files:', error);
            }
        }
        updatedData.images = newImagePaths;
    }
    const editedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    return editedProduct;
};

// // delete product
const deleteProduct = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        console.log('Contact not found');
        return null;
    }
    if (product.images) {
        try {
            await Promise.all(product.images.map(async (imagePath) => {
                await fs.unlink(imagePath);
                
            }));
        } catch (error) {
            console.error('Error deleting image file:', error);
        }
    }
    const deleteProduct = await Product.findByIdAndDelete(productId);
    
    return deleteProduct;
};





module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
  
};


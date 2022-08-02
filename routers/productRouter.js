const express = require('express');

const Product = require('../models/productModel');

const productRouter = express.Router();

productRouter.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            statusCode: 201,
            data: product,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: err.message,
        });
    }
});

module.exports = productRouter;

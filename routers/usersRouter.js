const express = require('express');

const User = require('../models/userModel');

const userRouter = express.Router();

// const filterObject = (obj, ...keys) => {
//     //['name', 'age'];
//     let filtered = {};
//     Object.keys(obj).forEach(key => {
//         //["name","age","height"]
//         if (keys.find(k => k === key)) filtered[key] = obj[key];
//     });
//     return filtered;
// };

function filterObject(obj, ...keys) {
    let filtered = {};
    keys.forEach(k => {
        if (obj[k]) filtered[k] = obj[k];
    });
    return filtered;
}

userRouter.post('/', async (req, res) => {
    try {
        const filtered = filterObject(
            req.body,
            'name',
            'password',
            'birthDate',
            'email',
            'height',
            'weight'
        );
        const user = await User.create(filtered);
        res.status(201).json({
            status: 'success',
            statusCode: 201,
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: err.message,
        });
    }
});

userRouter.get('/', async (req, res) => {
    try {
        // const users = await User.find({ height: { $lt: 1.8 } });
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: users,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: err.message,
        });
    }
});

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: { $eq: id } });
        // const user = await User.findById(id);
        console.log(user);
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: err.message,
        });
    }
});

module.exports = userRouter;

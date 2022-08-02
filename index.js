const express = require('express');
const mongoose = require('mongoose');

const cartRouter = require('./routers/cartRouter');
const userRouter = require('./routers/usersRouter');
const paymentsRouter = require('./routers/paymentsRouter');
const productRouter = require('./routers/productRouter');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/cart', cartRouter);
app.use('/users', userRouter);
app.use('/payments', paymentsRouter);
app.use('/products', productRouter);

mongoose
    .connect('mongodb://localhost:27017/fullstack')
    .then(_ => console.log('connected to mongo'));

app.listen(8000, 'localhost', () => {
    console.log('listening on localhost:8000');
});

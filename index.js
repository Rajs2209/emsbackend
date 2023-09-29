const dotenv = require("dotenv");
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose')


dotenv.config({ path: './.env' });
require('./conn');
app.use(require('./router/auth'));
const middleware = (req, res, next) => {
    console.log(`hello middleware`);
    next();
}

app.listen(8080, () => {
    console.log(`server is running`);
}) 
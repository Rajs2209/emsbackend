const dotenv = require("dotenv");
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const createToken = (async () => {
    const token = await jwt.sign({ _id }, "aaaabbbbccccddddeeeeffffgggghhhh");
    console.log(token);

    const userVer = await jwt.verify(token, "aaaabbbbccccddddeeeeffffgggghhhh");
    console.log(userVer);
})


dotenv.config({ path: './config.env' });
require('./conn');
app.use(require('./router/auth'));
const middleware = (req, res, next) => {
    console.log(`hello middleware`);
    next();
}

app.listen(5000, () => {
    console.log(`server is running`);
}) 
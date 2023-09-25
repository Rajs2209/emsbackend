const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require("../models/employee");
const Userdata = require('../models/userdata');
const bcrypt = require('bcryptjs');
var ObjectId = require('mongodb').ObjectId;
router.get('/', (req, res, next) => {
    res.send('hello world from the server router');
});

router.post('/register', async (req, res) => {

    try {
        // console.log(req.body);
        const { username, phone, email, password } = req.body;
        if (!username || !phone || !email || !password) {
            return res.status(201).send({ message: "plz fill the field properly" });
        }
        const userexists = await Userdata.findOne({ email: email });
        if (userexists) {
            res.status(202).send({ message: 'User already exists' })
        }

        const response = await Userdata.create(req.body);
        console.log(response);
        res.status(200).send({ message: 'user has successfully registererd' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'failure' });
    }
})

router.post('/userlogin', async (req, res) => {
    console.log(req.body);
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(201).send({ message: "please fill the empty data" })
        }
        const userlogin = await Userdata.findOne({ email: email });
        // console.log(userlogin);
        if (userlogin) {
            const isMatch = await Userdata.findOne({ email: email, password: password });
            if (isMatch) {
                res.status(200).send({ message: 'success', userdata: isMatch })
            }
            else {
                res.status(202).send({ message: "Password doesn't match" })
            }
        }
        else {
            res.status(203).send({ message: "user doesnot exist" })
        }


    } catch (err) {
        console.log(err);
    }

})
router.get('/getuser', async (req, res) => {
    const response = await Userdata.find({});
    console.log(response);
    res.status(200).send(response);

})

router.get('/getemployee', async (req, res) => {
    try {
        const response = await Employee.find({});
        // console.log(response);
        res.status(200).send(response);
    }
    catch (err) {
        console.log(err);
    }
})
router.post('/addemployee', async (req, res) => {
    try {
        // console.log(req.body);
        const response = await Employee.create(req.body);
        // console.log(response);
        res.status(200).send({ message: 'success' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'failure' });
    }
})
router.post('/deleteemployee', async (req, res) => {
    try {
        console.log(req.body.id);
        const response = await Employee.deleteOne({ _id: req.body.id });
        console.log(response);
        res.status(200).send({ message: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'failure' });
    }
})
router.post('/updateemployee', async (req, res) => {
    try {
        console.log(req.body._id);
        const response = await Employee.updateOne({ _id: req.body._id }, { $set: req.body })
        console.log(response);
        res.status(200).send({ message: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'failure' });
    }
})
module.exports = router;    
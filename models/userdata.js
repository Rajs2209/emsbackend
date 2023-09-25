const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserdataSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ]

})

module.exports = mongoose.model('Userdata', UserdataSchema);

UserdataSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 12);
    }
    next();
});

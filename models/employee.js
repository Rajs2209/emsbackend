const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    salary: {
        type: String,
    },
    date: {
        type: String,
    }
})

module.exports = mongoose.model('Employee', EmployeeSchema);
const {Schema, model} = require('mongoose');

const ProfileSchema = new Schema({
    firstName: {
        type: String,
        reqired: true,
    },
    lastName: {
        type: String,
        reqired: true,
    },
    age: {
        type: Number,
        required: true,
    },
})

const Transaction = model('transaction', TransactionSchema);

module.exports = Transaction;
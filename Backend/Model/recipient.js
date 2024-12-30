const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipientSchema = new Schema({
    name: {
        type: String,
      
    },
    email: {
        type: String,
        required: true
    },
    group: {
        type: String,
        default: 'default'
    }
}, {
    timestamps: true
});

const Recipient = mongoose.model('Recipient', recipientSchema);
module.exports = Recipient;
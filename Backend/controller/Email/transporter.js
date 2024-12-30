// transporter.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testml892@gmail.com',
        pass: 'syny qmfi pwso ioyu', // Use environment variables for security in production
    },
});

module.exports = transporter;
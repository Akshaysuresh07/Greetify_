// recipientController.js
const emailQueue = require('./emailQueue'); 
const Recipient = require('../../Model/recipient');
const Template=require('../../Model/templates')

const sendEmails = async (req, res) => {
    try {
        // Fetch recipients and template
        const recipients = await Recipient.find(/* your criteria */);
        const template = await Template.findOne({ name: "Celebration Template" });

        // Add email jobs to the queue
        recipients.forEach((recipient) => {
            emailQueue.add({ recipient, template });
        });

        res.status(200).json({ message: 'Emails are being sent', totalRecipients: recipients.length });
    } catch (error) {
        console.error('Error enqueuing emails:', error); 
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendEmails };
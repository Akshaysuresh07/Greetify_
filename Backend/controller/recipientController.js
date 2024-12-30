const Recipient = require('../Model/recipient'); 
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
const nodemailer = require('nodemailer');
const Template = require('../Model/templates');
const emailQueue=require('./Email/emailQueue')
const path = require('path');

exports.recipientUpload = async (req, res) => {
    try {
        const { name, email, group } = req.body;
        const existingRecipient = await Recipient.findone({ email: email });
        if (existingRecipient) {
            return res.status(400).json({ message: 'Recipient already exists' });
        }
        const recipient = new Recipient({
            name: name,
            email: email,
            group: group
        });
        const newRecipient = await recipient.save();
        res.status(201).json(newRecipient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const upload = multer({ dest: 'uploads/' });


// Bulk upload recipients from CSV
exports.bulkUploadrecipients = async (req, res) => {
    try {
        console.log('files csv');
        
        console.log(req.file);
        
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a CSV file' });
        }

        const results = [];
        const errors = [];


        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => {
                results.push({ 
                    name: data.name,
                    email: data.email,
                    group: data.group || 'default'
                });
            })
            .on('end', async () => {
              
                const batchSize = 100;
                for (let i = 0; i < results.length; i += batchSize) {
                    const batch = results.slice(i, i + batchSize);
                    
                    try {
                        const operations = batch.map(item => ({
                            updateOne: {
                                filter: { email: item.email },
                                update: {
                                    $setOnInsert: {
                                        name: item.name,
                                        email: item.email,
                                        group: item.group
                                    },
                                },
                                upsert: true
                            }
                        }));

                        const result = await Recipient.bulkWrite(operations);
                        // successCount += result.upsertedCount + result.modifiedCount;
                    } catch (error) {
                        errors.push(`Batch ${i/batchSize + 1}: ${error.message}`);
                    }
                }

                // Clean up uploaded file
                fs.unlinkSync(req.file.path);

                res.status(200).json({
                    message: 'Bulk upload completed',
                    totalrecipients: results.length,
                    data: results,
                   
                   
                });
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.uploadCSV = [
    upload.single('file'),
    exports.bulkUploadrecipients
];

//get all recipients
exports.getAllRecipients =async (req, res) => {
    try {
        const recipients=await Recipient.find();
        res.status(200).json(recipients);
}
catch (error) {
    res.status(500).json({ message: error.message });
}
}

// Get recipients by category
exports.getRecipientsByCategory = async (req, res) => {
    try {
        const category = req.params.group;
        const recipients = await Recipient.find({group:category||'default'});
        if (recipients.length === 0) {
            return res.status(404).json({ message: 'No recipients found for this category' });
        }
        res.status(200).json(recipients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//send email to recipients
exports.sendEmailToRecipient = async (req, res) => {
    try {
        const { email,subject,templateId } = req.body;

        // Find the recipient by email
        const recipient = await Recipient.findOne({ email: email });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Find the selected template
        const template = await Template.findById(templateId);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        console.log(template);
        
        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            
            auth: {
                user:'testml892@gmail.com',
                pass: 'syny qmfi pwso ioyu'
            }
            
        });

        console.log(transporter);
        

        // Send email to the recipient
        const mailOptions = {
            from: 'testml892@gmail.com',
            to: recipient.email,
            subject:subject ,
            html: template.content,
            attachments: [{
    filename: 'xmas.jpeg',
    path: path.resolve(__dirname +'/../../image/imagename.png'),
    cid: 'xmas'
}],

        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.sendEmailToGroup = async (req, res) => {
    try {
        const { group, content, emails, subject,names,templateId } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        if (!group && (!emails || emails.length === 0)) {
            return res.status(400).json({ message: ' emails are required' });
        }

        

        let recipients = [];
        let imagePath=''
        let emailContent =content
        if(templateId){
            const template = await Template.findById(templateId);
            console.log(template);
            
             imagePath=template.image
            
        }
        console.log(imagePath);
        
      


        if (group) {
            // Find recipients by group
            recipients = await Recipient.find({ group: group || 'default' });
            

            if (recipients.length === 0) {
                return res.status(404).json({ message: 'No recipients found for this group' });
            }
        } else if (Array.isArray(emails) && emails.length > 0) {
            // Use the provided emails array
            recipients = emails.map(email => ({ email ,names}));
        } else if (typeof emails === 'string') {
            // Single email provided
            recipients = [{ email: emails }];
        } else {
            return res.status(400).json({ message: 'Invalid emails format' });
        }

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send email to each recipient
        for (const recipient of recipients) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: recipient.email,
                subject: subject,
                html: emailContent.replace('{{name}}', recipient.names ||names, 'Valued Customer'),
                // attachments: [{
                //     filename: 'templateImage.png',
                //     path: path.resolve(__dirname, `../${imagePath}`),
                //     cid: 'templateImage' // Content ID for inline images
                // }]
               
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(200).json({ message: 'Emails sent successfully', totalRecipients: recipients.length,status:'200' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ message: error.message });
    }
};

// send email to group using queue

// exports.sendGroupEmails = async (req, res) => {
//     try {
//         // Fetch recipients and template
//         const recipients = await Recipient.find(/* your criteria */);
//         const template = await Template.findOne({ name: "Celebration Template" });

//         // Add email jobs to the queue
//         recipients.forEach((recipient) => {
//             emailQueue.add({ recipient, template });
//         });

//         res.status(200).json({ message: 'Emails are being sent', totalRecipients: recipients.length });
//     } catch (error) {
//         console.error('Error enqueuing emails:', error); 
//         res.status(500).json({ message: error.message });
//     }
// };






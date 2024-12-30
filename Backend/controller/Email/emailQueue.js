// emailQueue.js
const Bull = require('bull');
const transporter = require('./transporter'); // Ensure transporter is exported from this file

// Initialize the queue with Redis connection
const emailQueue = new Bull('emailQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
        // password: 'your_redis_password', // If Redis requires authentication
    },
});

// Process jobs from the queue
emailQueue.process(async (job) => {
    const { recipient, template } = job.data;
    const mailOptions = {
        from: 'testml892@gmail.com',
        to: recipient.email,
        subject: template.subject,
        html: template.content.replace('{{name}}', recipient.name),
    };

    await transporter.sendMail(mailOptions);
});

// Optional: Handle job completion and failures
emailQueue.on('completed', (job) => {
    console.log(`Email sent to ${job.data.recipient.email}`);
});

emailQueue.on('failed', (job, err) => {
    console.error(`Failed to send email to ${job.data.recipient.email}:`, err);
});

module.exports = emailQueue;
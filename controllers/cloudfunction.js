//email the user link
//verification link should expire in 2 minutes
//expired link shouldnt be used
const { PubSub } = require('@google-cloud/pubsub');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const pubsub = new PubSub();
const topicName = 'verify_email';
const verificationLinks = new Map(); // Store verification links in-memory (use a database for production)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

exports.verifyEmail = async (event, context) => {
    const pubsubMessage = event.data;
    const user = JSON.parse(Buffer.from(pubsubMessage, 'base64').toString());

    const token = crypto.randomBytes(20).toString('hex');
    const verificationLink = `https://your-domain.com/verify-email?token=${token}`;

    verificationLinks.set(token, {
        email: user.email,
        expires: Date.now() + 2 * 60 * 1000 // 2 minutes
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'Verify Your Email Address',
        text: `Click the link to verify your email address: ${verificationLink}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${user.email}`);
    } catch (error) {
        console.error(`Error sending verification email: ${error}`);
    }
};

// Function to handle verification link expiration and user verification
exports.handleVerification = (req, res) => {
    const { token } = req.query;

    if (!verificationLinks.has(token)) {
        return res.status(400).send('Invalid or expired verification link.');
    }

    const linkData = verificationLinks.get(token);

    if (Date.now() > linkData.expires) {
        verificationLinks.delete(token);
        return res.status(400).send('Verification link expired.');
    }

    // Mark user as verified in the database (implementation depends on your setup)
    // For example:
    // User.update({ email_verified: true }, { where: { email: linkData.email } });

    verificationLinks.delete(token);
    res.send('Email verified successfully.');
};
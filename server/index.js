import nodemailer from 'nodemailer';
import './bootstrap-globals';
import express from 'express';
import cors from 'cors';
// const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = process.env.PORT ?? 8081;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'oseintilegacycentreinc@gmail.com',
        pass: 'tzjkvbnsxdivhtow',
    },
});

app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: ['http://localhost:3001', 'https://example.com'], // Add the allowed origins here
};

app.use(cors(corsOptions));
app.post('/send-email', (req, res) => {
    const { from, to, subject, text } = req.body; // Use the data from the request body

    const mailOptions = {
        from, // Use the 'from' value from the request body
        to, // Use the 'to' value from the request body
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Email sending failed.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

app.listen(PORT, () => console.log(`twilio-video-app-react server running on ${PORT}`));

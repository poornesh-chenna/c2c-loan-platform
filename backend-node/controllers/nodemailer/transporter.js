import nodemailer from 'nodemailer';
const options = {
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PW, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false,
    },
};

export const transporter = nodemailer.createTransport(options);

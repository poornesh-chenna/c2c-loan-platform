import nodemailer from 'nodemailer'
const options = {
    host: process.env.SMTP_HOST || 'smtp-relay.sendinblue.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER || 'partheev8@gmail.com', // generated ethereal user
        pass: process.env.MAIL_PW || 'OJAp1skFTG2gKZ9r', // generated ethereal password
    },
}

export const transporter = nodemailer.createTransport(options)

const nodemailer = require("nodemailer")

exports.sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        // host:process.env.SMPT_HOST,
        // port:process.env.SMPT_PORT,
        // auth:{
        //     user:process.env.SMPT_MAIL,
        //     pass:process.env.SMPT_PASSWORD,
    // }
        // service: process.env.SMPT_SERVICE,

        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "56a17eda66ef01",
            pass: "8fea514dcde67e"
        },
    })

    const mailOptions = {
        // from:process.env.SMPT_MAIL,

        from: "56a17eda66ef01",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendMail(mailOptions)

}
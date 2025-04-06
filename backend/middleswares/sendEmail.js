const nodeMailer=require("nodemailer");

exports.sendEmail=async function(options){
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "48d3a6f6fc8540",
            pass: "7a92e277e1292e"
        }
    });

    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:options.to,
        subject:options.subject,
        text:options.message,
    }

    await transporter.sendMail(mailOptions);

}
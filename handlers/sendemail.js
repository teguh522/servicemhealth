const nodemailer = require("nodemailer");

const sendemail = async () => {
    let transporter = nodemailer.createTransport({
        host: "mail.mhealthofficial.com",
        port: 465,
        secure: true,
        auth: {
            user: "noreply@mhealthofficial.com",
            pass: "B1smillah*#"
        }
    })

    let info = await transporter.sendMail({
        from: 'Bundaqita.com <noreply@bundaqita.com>',
        to: "teguhajah12@gmail.com",
        subject: "Selamat Datang",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    });

    console.log("Email sent: %s", info.messageId);
}

module.exports = sendemail
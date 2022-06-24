
const nodemailer = require("nodemailer");


const  emailSender = async () =>{

    const TEST_MAIL = "fernando.quitzon28@ethereal.email";
    
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: TEST_MAIL,
        pass: "rkpmamwqywmvpept",
      },
    });
    
    const mailOptions = {
      from: "Servidor Node.js",
      to: TEST_MAIL,
      subject: "Mail de prueba desde Node.js",
      html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
    };
    
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
    } catch (error) {
      console.log(err);
    }
}

module.exports = {emailSender}


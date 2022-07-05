const dotenv = require("dotenv");
const nodeMailer = require("nodemailer");

const logger = require("../../lib/utils")


dotenv.config();

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const gmailOptions = (emailSubject, htmlTemplate) => {
  return {
    from: process.env.GMAIL_ACCOUNT,
    to: emailSubject,
    subject: "Nuevo Usuario Registrado ✅",
    html: htmlTemplate,
  };
};

 const emailToNewUser = (id, pass) => {
  return `
        <h2>¡Nuevo usuario Creado!</h2>
        <p>Se ha registrado correctamente</p>
        <ul>
            <li><strong>USUARIO:</strong> ${id}</li>
            <li><strong>CONTRASEÑA:</strong>${pass}</li>
        </ul>
        `;
};

async function sendGmail(subject, htmlTemplate) {
  try {
    const mailOptions = gmailOptions(subject, htmlTemplate);

    await transporter.sendMail(mailOptions);
    logger.logInfo(`Email sent`);
  } catch (error) {
    logger.logwn(error);
  }
}

module.exports = {sendGmail,emailToNewUser, gmailOptions } 
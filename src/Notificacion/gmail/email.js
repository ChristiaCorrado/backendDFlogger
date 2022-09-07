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

const compraToBuyer = (cart)=>{ 
  let acumulador= ''

  cart.forEach(element => {
    acumulador+=
    `           <tr>
                  <td>1137499</td>
                  <td>${element.title}</td>
                  <td align="right">${element.price}</td>
                  <td align="center">prueba </td>
                  <td align="right">prueba</td>
                </tr>
      `
  });

  let listBuy = `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
        <tbody>
          <tr>
            <td valign="top">

              <table border="1" cellspacing="0" cellpadding="0" width="100%" style="font-family:Helvetica;font-size:15px;color:#606060;border-collapse:collapse">
                <tbody>
                    <tr>
                      <td width="70">Cod</td>
                      <td width="320">Producto</td>
                      <td width="70" align="center">Precio</td>
                      <td width="70" align="center">Cantidad</td>
                      <td width="70" align="center">Subtotal</td>
                    </tr>

                      ${acumulador}

                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
  
  
  `
  
  return listBuy

}

async function sendGmail(subject, htmlTemplate) {
  try {
    const mailOptions = gmailOptions(subject, htmlTemplate);

    await transporter.sendMail(mailOptions);

  } catch (error) {

  }
}

module.exports = {sendGmail,emailToNewUser, gmailOptions , compraToBuyer} 
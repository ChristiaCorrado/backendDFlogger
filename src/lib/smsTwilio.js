
const twilio = require("twilio");


const  smsTwilio = async () =>{
    const accountSid = 'ACfedc7d9bd1a8171ae331d4622018394f'
    const authToken = '320507e0e1f92a81fc793cc468192ade'

    const client = twilio(accountSid, authToken)

    try {
    const message = await client.messages.create({
        body: 'Hola soy un SMS desde Node.js!',
        from: '+16067220337',
        to: '+543584861275'
    })

    } catch (error) {

    }

   
}

module.exports = {smsTwilio}
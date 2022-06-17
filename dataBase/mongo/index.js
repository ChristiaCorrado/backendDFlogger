const mongoose = require('mongoose')


const CRUDmongoose = () =>{
    try{
        const URL = process.env.MONGO_URL
        let rta =  mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log( `base mongo conectada`);
    }catch { err =>{
        console.log(err.message);
    }
        
    }
}

module.exports =  CRUDmongoose



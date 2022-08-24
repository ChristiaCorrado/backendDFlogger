const mongoose = require('mongoose')


const CRUDmongoose = () =>{
    try{
        const URL = process.env.MONGO_URL
        let rta =  mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
    
    }catch { err =>{
        
    }
        
    }
}

module.exports =  CRUDmongoose



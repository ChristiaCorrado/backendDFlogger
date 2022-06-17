class ChatSocket {
    constructor(nombre,email,mensaje){
        
        this.nombre = nombre;
        this.email = email;
        this.mensaje = mensaje;
    }

    async getAllMessages() {
        try{
          const todoslosMensajes = await this.readMessages()
          
          const suport = []
          todoslosMensajes.forEach(elem => {
            if(elem.mensaje != " ")
            suport.push(elem)
          });
          
          return suport
        } catch (error) {
          return console.log( `hay error ${error.message}`)
        }
      } 


      readMessages() {
        const todosLosMensajes = knex('chat').select('*').then((data) => {
          
            const mensajesDB =  this.baseJson(data)
              
            return mensajesDB
    
            }).catch( (err) =>{
              return console.log(`error en iniciar tabla ${err.message}`);
            })
            
            return todosLosP
          }

    
}
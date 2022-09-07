

const deleteCart = async (idCart,id_product) => {
    try {
        await fetch(`/api/cart/${idCart}/productos/${id_product}`,
        { method:"DELETE" })
        
        let cantidad = localStorage.getItem("cartTotal")

        console.log(cantidad);

        window.location.reload()
    }
    catch (err) {
        
    }
}



 const updateProduct = async (idProduct) =>{
    const id = idProduct
    const fmU = document.getElementById(`${idProduct}`)
    
  
    
        const data = {}
        new FormData(fmU).forEach((value, key) => data[key] = value)
 
        try{
            await fetch(`/api/productos/${id}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {"Content-type":"application/json;charset=utf-8"},
            })

            
            
        }
        catch (err) {
          
        }
        
        window.location.reload()
}

const deleteProduct = async (idProduct) =>{
    const id = idProduct

        try{
            await fetch(`/api/productos/${id}`,{
                method: 'DELETE',
                
            })
            
            
        }
        catch (err) {
            
        }
        
        window.location.reload()
}


const totalBuy = () =>{

    const price = document.querySelectorAll("#price")

        
        

        var resultadoSpan = document.getElementById('totalBuy');

        var total = 0;
       
        price.forEach(function(innerText) {
            
          total += parseFloat(innerText.innerHTML.replace('$',''));
        });
                         
        
        resultadoSpan.innerHTML = '$'+total ;
    
}


totalBuy()



const articlesInCart = () =>{
    const quantityCollector = document.querySelectorAll("#quantity")

    
    let spanCart = document.getElementById('spanCart')
    let quantity = 0

    quantityCollector.forEach(function(innerText) {
            
        quantity += parseFloat(innerText.innerHTML);

        
        
    })
    
    spanCart.innerHTML = quantity

}




function myProfile() {
    


    window.location.href =`/api/profile/${document.cookie.replace(/_id=/,``)}`
}

const socket = io.connect();


function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong style="color: blue">${elem.author.nombre}</strong>:
            <em style="color: green">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}


socket.on('messages', function(data) {  render(data); });

function addMessage(e) {
    const mensaje = {
        author:{ 
            id: document.getElementById('username').value,
            nombre : document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('texto').value
    };

    
    socket.emit('new-message', mensaje);
    return false;



}



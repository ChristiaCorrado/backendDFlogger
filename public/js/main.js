const deleteCart = async (idCart,id_product) => {
    try {
        await fetch(`/api/cart/${idCart}/productos/${id_product}`,
        { method:"DELETE" })
        
        window.location.reload()
    }
    catch (err) {
        console.log(err);
    }
}



const suma = () =>{

    const price = document.querySelectorAll("#price")

        
        

        var resultadoSpan = document.getElementById('totalBuy');

        var total = 0;
       
        price.forEach(function(innerText) {
            
          total += parseFloat(innerText.innerHTML.replace('$',''));
        });
                         
        
        resultadoSpan.innerHTML = '$'+total ;
    
}

const articlesInCart = () =>{
    const quantityCollector = document.querySelectorAll("#quantity")

    console.log(quantityCollector);
    let spanCart = document.getElementById('spanCart')
    let quantity = 0

    quantityCollector.forEach(function(innerText) {
            
        quantity += parseFloat(innerText.innerHTML);
        
    })
    
    spanCart.innerHTML = quantity

}

suma()
articlesInCart()

function myProfile() {
    
    console.log(document.cookie.replace(/_id=/,``));

    window.location.href =`/api/profile/${document.cookie.replace(/_id=/,``)}`
}



const socket = io("http://localhost:3000/socket.io/socket.io.js");


function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong style="color: blue">${elem.author.nombre}</strong>:
            <em style="color: green">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}


socket.on('messages', function(data) { console.log(data); render(data); });

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
    console.log(mensaje);
    
    socket.emit('new-message', mensaje);
    return false;
}
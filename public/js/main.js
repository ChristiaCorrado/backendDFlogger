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


  function goMyCart() {

    window.location.href =`/api/cart`
  
  }
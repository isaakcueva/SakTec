//Carro
let cartIcon = document.querySelector("#bx-shopping-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")

cartIcon.onclick = () => {
    cart.classList.add('active');
    
};

closeCart.onclick = () => {
    cart.classList.remove('active');
};

let contadorCarrito = 0;

// Función para actualizar la cantidad en la shopping bag
function actualizarCantidadCarrito() {
    document.getElementById('carrito-cantidad').textContent = contadorCarrito;
}

// Event listener para los botones "Añadir al carrito"
const botonesComprar = document.querySelectorAll('.btn-comprar');
botonesComprar.forEach((boton) => {
    boton.addEventListener('click', function () {
        if (boton.getAttribute('data-added') === 'false') {
            contadorCarrito++;
            boton.setAttribute('data-added', 'true');
            actualizarCantidadCarrito();
        }
    });
});

//ACTIVIDAD DEL CARRITO
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready);   
} else {
    ready();
}

// Función para cargar los productos desde el localStorage
function cargarProductosDesdeLocalStorage() {
    var existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    for (var i = 0; i < existingCart.length; i++) {
        var product = existingCart[i];
        addProductToCart(product.title, product.price, product.productImg);
    }
}

//Funciones
function ready() {


    var removeCartButtons=document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for(var i = 0; i < removeCartButtons.length; i++){
        var button= removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged);

    }
    //Agregar al carro
    var addCart = document.getElementsByClassName('btn-comprar')
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener('click', addCartClicked);
    }

    document
    .getElementsByClassName("h-btn")[0]
    .addEventListener("click", buyButtonClicked);
    cargarProductosDesdeLocalStorage();
}

//Comprar
function buyButtonClicked(){
    alert('Tu orden fue procesada')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    
    updateTotal();
}



function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    
    // Actualizar el localStorage al quitar un producto
    actualizarLocalStorage();
}






//Cambio de cantidad
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
       input.value = 1;
    }
    updateTotal();
}

//Agregar productos
function addCartClicked(event){
    var button = event.target
    var shopProductos = button.parentElement
    var title = shopProductos.getElementsByClassName('product-tittle')[0].innerText;
    var price = shopProductos.getElementsByClassName('price')[0].innerText;
    var productImg = shopProductos.getElementsByClassName('celular-img')[0].src;

    addProductToCart(title, price, productImg);
    updateTotal();
    actualizarLocalStorage();
}


function addProductToCart(title, price, productImg, isAdding = true) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemTitles = cartItems.getElementsByClassName('cart-product-tittle');

    // Revisa si el producto ya está en el carrito
    for (var i = 0; i < cartItemTitles.length; i++) {
        if (cartItemTitles[i].innerText === title) {
            // Solo muestra la alerta si se está añadiendo un producto mediante el botón de compra
            if (isAdding) {
                alert('Este producto ya está añadido al carrito.');
            }
            return; // Salir si el producto ya está en el carrito
        }
    }

    // Construye el contenido del producto en el carrito
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-tittle">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Añadir eventos a los nuevos elementos
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    if (isAdding) {
        // Actualizar el localStorage solo si se está añadiendo un producto
        guardarProductoEnLocalStorage(title, price, productImg);
        // Actualizar la cantidad en el carrito
        contadorCarrito++;
        actualizarCantidadCarrito();
    }
}

function guardarProductoEnLocalStorage(title, price, productImg) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var productIndex = cart.findIndex(p => p.title === title); // Encuentra el índice del producto si ya existe

    if (productIndex === -1) { // Si el producto no existe, lo añade al array
        cart.push({ title, price, productImg, quantity: 1 });
    } else {
        cart[productIndex].quantity += 1; // Si el producto ya existe, incrementa la cantidad
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Guarda el array actualizado en localStorage
}

function cargarProductosDesdeLocalStorage() {
    var existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.forEach(product => {
        
        addProductToCart(product.title, product.price, product.productImg, false);
        
    });
}


// Asegúrate de que esta función se llama una sola vez al cargar la página o al cambiar de pestaña
cargarProductosDesdeLocalStorage();



//Actualizar Total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;

    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var priceText = priceElement.innerText; // Obtiene el texto del precio

        // Extrae el valor numérico del precio (ignorando el signo "$" y otros caracteres no numéricos)
        var price = parseFloat(priceText.replace(/[^0-9.-]+/g,""));

        var quantity = quantityElement.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;

    // Formatea el total nuevamente como un precio con el signo "$"
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}

// Actualizar el localStorage con los productos del carrito
function actualizarLocalStorage() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var productos = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName('cart-product-tittle')[0].innerText;
        var price = cartBox.getElementsByClassName('cart-price')[0].innerText;
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        productos.push({ title, price, productImg });
    }

    localStorage.setItem('cart', JSON.stringify(productos));
}

// Cargar productos desde el localStorage al iniciar
cargarProductosDesdeLocalStorage();


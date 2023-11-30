

document.addEventListener("DOMContentLoaded", function () {
     
    let displayCarrito = function () {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let carritoContainer = document.querySelector(".carritoContainer");
    carritoContainer.innerHTML = "";
    carrito.forEach(element => {
        carritoContainer.innerHTML += `
        <div class="div-img">
    <img class="img-carrito" src="/imagenes/products/${element.imagen}" alt="Imagen 1" />
    <div class="div-contenido">
        <h3>${element.nombre}</h3>
        <p>${element.descripcion}</p>
        <p>${element.categoria}</p>
        <p>${element.cantidad}</p>
        <p>${element.color}</>
    <div class="div-botones-precio">
    <div class="div-button">
        <button>Eliminar</button>
        <button>Guardar</button>
    </div> 
    <div class="precio">
        <p>${element.precio}</p>
    </div>
    </div>
    </div>
</div>
        `
    });
    console.log(carrito);
}
let actualizarTotal = function () {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(carrito)
    let total = carrito.reduce((acumulador, elemento) => {
        return acumulador + parseFloat(elemento.subtotal);
    }, 0);
    console.log(total)
displayCarrito();
actualizarTotal();
}
})
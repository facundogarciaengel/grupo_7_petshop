document.addEventListener("DOMContentLoaded", function () {
    let agregarCarrito = document.querySelector('.add-to-cart-button')
    console.log(JSON.parse(localStorage.getItem('carrito')) )

    if(JSON.parse(localStorage.getItem('carrito')) == null){
        localStorage.setItem('carrito', JSON.stringify([]))
    }
    let id = document.getElementById('id')
    let nombre = document.getElementById('nombre')
    let imagen = document.getElementById('imagen')
    let precio = document.getElementById('precio')
    let descripcion = document.getElementById('descripcion')
    let categoria = document.getElementById('categoria')
    let color = document.getElementById('color')

    agregarCarrito.addEventListener('click', function (event) {
        event.preventDefault() //para que no redirija
        const carrito = JSON.parse(localStorage.getItem('carrito'))
        const producto = {
            nombre: nombre.innerText,
            imagen: imagen.alt,
            precio: precio.innerText,
            descripcion: descripcion.innerText,
            categoria: categoria.innerText,
            color: color.innerText
        }
        console.log(producto)
        if(carrito.length > 0){
            let productoEnCarrito = carrito.find(prod => prod.id == producto.id)
            if(productoEnCarrito){
                productoEnCarrito.cantidad++
                productoEnCarrito.subtotal += productoEnCarrito.precio
            }else{
                producto.cantidad = 1
                producto.subtotal = producto.cantidad*producto.precio
                carrito.push(producto)
            }
        }else{
            producto.catindad = 1
            producto.subtotal = producto.cantidad*producto.precio
            carrito.push(producto)
        }
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }
    )
}
)
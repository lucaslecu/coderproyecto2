const carrito = JSON.parse(localStorage.getItem("carrito")) ||[];

const conProductos = document.querySelector("#contenedor_pelis");
const carritoVacio = document.querySelector("#carritoVacio");
const carritoProductos = document.querySelector("#lista-productos");
const carritoTotal = document.querySelector("#carritoTotal");
const vaciarCarrito = document.querySelector("#vaciarCarrito");


fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
        productos.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("pelicula");
            div.innerHTML = `
                <h2 class="titulo_pelis">${producto.titulo}</h2>
                <img class="tamano" src="${producto.img}" alt="${producto.titulo}">
                <h3>${producto.precio}</h3>
            `;

            let boton = document.createElement("button");
            boton.classList.add("btn");
            boton.innerText = "Comprar";
            boton.addEventListener("click", () => {
                agregarAlCarrito(producto);   
            });
            div.append(boton);
            conProductos.append(div);
        });
    })
    .catch(error => console.error('Error al cargar productos:', error));

const agregarAlCarrito = (producto) => {
    let productosAlCarrito = carrito.find((i) => i.id === producto.id);

    if (productosAlCarrito) {
        productosAlCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();

    Toastify({
        text: producto.titulo + " agregado",
        avatar: producto.img,
        duration: 3000,
        close: true,
        style: {
            background: "linear-gradient(to right, #6200ea, #6252ea)",
        }
    }).showToast();
};

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoProductos.classList.add("oculto");
        carritoVacio.classList.remove("oculto");
        vaciarCarrito.classList.add("oculto");
    } else {
        carritoProductos.classList.remove("oculto");
        carritoVacio.classList.add("oculto");
        vaciarCarrito.classList.remove("oculto");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <h2>${producto.titulo}</h2>
                <span class="precio">${producto.precio}</span>
                <p>${producto.cantidad}</p>  
                <p>${producto.cantidad * producto.precio}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("eliminar");
            button.innerHTML = "X";
            button.addEventListener("click", () => {
                borrarCarrito(producto);
            });
            div.append(button);

            carritoProductos.append(div);
        });
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function borrarCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = total;
}

vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: "CARRITO",
        text: "ESTAS SEGURO DE VACIAR EL CARRITO",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, BORRAR!"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            Swal.fire("BORRADO!", "TUS PRODUCTOS SE BORRARON.", "success");
            actualizarCarrito();
        }
    });
});

actualizarCarrito();

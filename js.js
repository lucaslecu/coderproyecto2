const carrito = [];


const arrayproductos = [

    {
        titulo:"Intensamente",
        precio:2000,
        img:"img/INTENSAMENTE.jpg",
        id:"peli001",
    },
    {
        titulo:"Dead pool",
        precio:3000,
        img:"img/DEADPOOL.jpeg",
        id:"peli002",
    },
    {
        titulo:"Encanto",
        precio:1000,
        img:"img/ENCANTO.jpeg",
        id:"peli003",
    }
]

const conProductos = document.querySelector("#contenedor_pelis");
const carritoVacio = document.querySelector("#carritoVacio");
const carritoProductos = document.querySelector("#lista-productos");
const carritoTotal= document.querySelector("#carritoTotal");

arrayproductos.forEach((producto) => 
{
    let div = document.createElement("div");
    div.classList.add("pelicula");
    div.innerHTML = `
            <h2 class="titulo_pelis">${producto.titulo}</h2>
            <img class="tamano" src="${producto.img}" alt="pelicula encanto">
            <h3>${producto.precio}</h3>     
    `;

    let boton = document.createElement ("button");
        boton.classList.add ("btn");
        boton.innerText = "Comprar";
        boton.addEventListener("click", () => {
         agregarAlCarrito(producto);   
        })
        div.append(boton);
    conProductos.append(div);


}
)

const agregarAlCarrito = (producto) =>{
 carrito.push(producto);
 actualizarCarrito ()


}
/*chequear si el carrito esta vacio oculta el contenido*/

function actualizarCarrito (){
    if(carrito.length === 0) {
        carritoProductos.classList.add("oculto")
        carritoVacio.classList.remove("oculto")
        }else{
            carritoProductos.classList.remove("oculto")
            carritoVacio.classList.add("oculto")
            carritoProductos.innerHTML="";
            carrito.forEach((producto) =>{
                let div = document.createElement("div");
                div.classList.add("producto");
                div.innerHTML = `
                    <h2>${producto.titulo}</h2>
                    <span class="precio">${producto.precio}</span>
                       
                                                        `;
                
                let button = document.createElement("button");
                button.classList.add("eliminar");
                button.innerHTML="X";
                button.addEventListener("click", () =>{
                    borrarCarrito(producto);


                })
                div.append(button);


                carritoProductos.append(div)
            })
        }
        actualizarTotal();
}
        function borrarCarrito(producto){
            const indice =carrito.findIndex((item) =>item.id === producto.id);
            carrito.splice(indice,1);
            actualizarCarrito();

        }
        function actualizarTotal(){
            const total = carrito.reduce((acc,prod)=> acc + prod.precio,0);
            carritoTotal.innerText= total;



        }


/*
<h2>Producto 3</h2>
            <span class="precio">$30</span>
            <span class="eliminar">X</span>
<span class="eliminar">X</span>  

    <div id="carritoVacio" class="carritoVacio ">
    <div id="lista-productos" class="oculto">

*/
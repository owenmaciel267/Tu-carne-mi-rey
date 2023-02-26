
// Slider
var swiper = new  Swiper('.MySwiper',{
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlanck: true,

    pagination:{
        el:'.swiper-pagination',
        clickable: true,
    },
    navigation:{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
    },
    breakpoints:{
        0:{
            slidesPerView: 1
        },
        520:{
            slidesPerView: 2
        },
        950:{
            slidesPerView: 3
        }
    }
})



// Carrito
const carrito = document.getElementById('carrito')
const elementos = document.getElementById('lista')
const elementos2 = document.getElementById('lista-2')
const lista = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

cargarEventoListeners();

function cargarEventoListeners (){
    elementos.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);

    carrito.addEventListener('click', eliminarElemento);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parenteElement.parentElement;
        leerDatosElemento(elemento);
    }
}



function leerDatosElemento(elemento){
    const infoElemento = {
        imagen : elemento.querySelector('img').src,
        titulo : elemento.querySelector('h3').textContent,
        precio : elemento.querySelector('.precio').textContent,
        id : elemento.querySelector('a').getAttribute('data-id')
    }
    insetarCarrito(infoElemento);
}


function insetarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>  
            <img src='${elemento.imagen}' width=100>
        </td>

        <td>
            ${elemento.titulo} 
        </td>

        <td>
            ${elemento.precio} 
        </td>
        <td>
            <a herf='#' class='borrar' data-id'${elemento.id}'> X </a>
        </td>
    `;
    lista.appendChild(row)
    guardarElementoLocalStorage(elemento)
}

function eliminarElemento(e){
    e.preventDefault();

    let elemento,
        elementoId;

    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id')
    }

    eliminarElementoLocalStorage(elementoId)

}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild)
    }

    vaciarLocalStorage();
    return false;
}

function guardarElementoLocalStorage(elemento){

    let elementos;

    elementos = obtenerelementoLocalStorage();

    elementos.push(elemento);

    localStorage.setItem('elementos', JSON.stringify(elementos));
}
// Hasta aca lo que hace es agregar elementos


function obtenerelementoLocalStorage(){
    let elementosLS;

    if(localStorage.getItem('elementos') === null){
        elementosLS = [];
    }else{
        elementosLS = JSON.parse(localStorage.getItem('elementos'));
    }
    return elementosLS
}

function leerLocalStorage(){
    let elementosLS
    
    elementosLS = obtenerelementoLocalStorage();

    elementosLS.forEach(function(elemento){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${elemento.imagen}' width=100>
            </td>
            <td>
                ${elemento.titulo} 
            </td>
            <td>
                ${elemento.precio} 
            </td>
            <td>
                <a herf='#' class='borrar' data-id'${elemento.id}'>X</a>
            </td>
        `;
        lista.appendChild(row);
        guardarElementoLocalStorage();
    })
}

function eliminarElementoLocalStorage(elemento){
    let elementosLS;

    elementosLS = obtenerelementoLocalStorage();
    elementosLS.forEach(function(elementosLS, index){
        if(elementosLS.id === elemento){
            elementosLS.splice(index, 1)
        }
    });

    localStorage.setItem('elementos', JSON.stringify(elementosLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}
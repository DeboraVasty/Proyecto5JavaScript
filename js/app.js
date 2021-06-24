//Débora Chacach
//variables
const carrito=document.querySelector('#carrito');

const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');
const listaCursos=document.querySelector('#lista-cursos');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners(){
    //cuando se agrega un curso al carrito
    listaCursos.addEventListener('click', agregarCurso);


    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    carrito.addEventListener('click',sumarCurso);
    carrito.addEventListener('click',restarCurso);

    //muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded',() =>{
        articulosCarrito=JSON.parse(localStorage.getItem('carrito'))||[];
        carritoHTML();

    })
    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito=[]; //resetea el arreglo
        limpiarHTML();//eliminar todo html

    })

}


//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
      const crusoSeleccionado=e.target.parentElement.parentElement;
     
      leerDatosCurso(crusoSeleccionado);
    }
    
}
//elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId=e.target.getAttribute('data-id');
        //elimina del arreglo de articulos del carrito
        articulosCarrito=articulosCarrito.filter(curso=>curso.id !== cursoId);
        carritoHTML(); //iterar sobre el carrito y muestra html
    }

}

//sumar Curso
function sumarCurso(e){

    const curs=articulosCarrito.map(
        cursoMap=>{
            if(e.target.classList.contains('sumarCurso')){
                const cursoId=e.target.getAttribute('data-id');
              if(cursoMap.id === cursoId){
                cursoMap.cantidad++;
              }
              
              
            }
        }
    )
    carritoHTML();
  
    
}

//restar Curso
function restarCurso(e){
    const curs=articulosCarrito.map(
        cursoMap=>{
            if(e.target.classList.contains('restarCurso')){
                const cursoId=e.target.getAttribute('data-id');
              if(cursoMap.id === cursoId){
                  if(cursoMap.cantidad===1){
                    articulosCarrito=articulosCarrito.filter(curso=>curso.id !== cursoId);
                    carritoHTML();
                  }else{
                    cursoMap.cantidad--;   
                  }
               
              }
              
              
            }
        }
    )
    carritoHTML();
  
     
 }



//leer contenido al que se le da click
function leerDatosCurso(curso){
  
    //crear un objet con el contenido del curso
    const infoCurso={
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
//revisar si el elemento ya existe en el carrito
const existe=articulosCarrito.some(curso=> curso.id=== infoCurso.id);
if(existe){
//alcualizar cantidad
    const cursos=articulosCarrito.map( curso=>{
        if(curso.id=== infoCurso.id){
            curso.cantidad++;
            return curso; //retorna objetos actualizados
        }else{
            return curso;//retorna los objetos nuevos
        }
    });
    articulosCarrito=[...cursos];

} else{
    //agregar curso al carrito
    articulosCarrito=[...articulosCarrito, infoCurso];
}

  
    carritoHTML();

}

//muestra el carrito de compras
function carritoHTML(){
    //limpiar el HTMl
    limpiarHTML();
    //Recorre el carrito y genera el HTml
    articulosCarrito.forEach(curso=>{
        const {imagen, titulo,precio,cantidad,id}=curso;
        const row=document.createElement('tr');
        let total1=(parseInt(precio)*parseInt(cantidad));
        
        row.innerHTML=`
        
        <td>
        <img src="${imagen}" width=100>
        </td>
        <td> ${titulo}</td>
        <td> $${precio}</td>
        <td> <a href="#" class="sumarCurso" data-id="${id}"> + </a> </td>
        <td> ${cantidad}</td>
        <td> <a href="#" class="restarCurso" data-id="${id}"> - </a> </td>
        <td> $${total1}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
        //Agregar el carrito de compras al storage
        sincronizarStorage();

}
function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}

function limpiarHTML(){
    //contenedorCarrito.innerHTML='';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}
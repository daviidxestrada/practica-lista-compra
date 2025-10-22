document.addEventListener("DOMContentLoaded", () =>{
  const campoArticulo = document.getElementById("articulo");
  const botonArticulo = document.getElementById("nuevoArticulo");
  const lista = document.getElementById("lista")
  const botonNuevaLista = document.getElementById("nuevaLista")

  let listaCompra = [];

  const datosGuardados = localStorage.getItem("listaCompra")
  if(datosGuardados){
    listaCompra = JSON.parse(datosGuardados);
    lista.innerHTML = "";
    for (const item of listaCompra){
        agregarArticulo(item.nombre)
    }
  }

  window.listaCompra = listaCompra;

  function onInputKeyUp(){
    const hayTexto = campoArticulo.value.trim().length > 0;
    botonArticulo.disabled = !hayTexto;
  }
  
   function agregarArticulo(nombre) {
    // si el primer <li> es el placeholder "No hay nada...", lo quitamos
    if (lista.children.length === 1 && lista.children[0].textContent.includes("No hay nada")){
        lista.innerHTML = "";
    }
    
    const li = document.createElement("li");
    li.textContent = nombre;
    lista.appendChild(li)

   }

   function onNuevoArticuloClick(){
    const nombre = campoArticulo.value.trim();
    if (nombre.length === 0) return 
    
    listaCompra.push({nombre});
    localStorage.setItem("listaCompra",JSON.stringify(listaCompra));
    agregarArticulo(nombre);

    //limpiar UI
    campoArticulo.value = "";
    botonArticulo.disabled = true;
    campoArticulo.focus();
   }

   function onNuevaListaClick(){
    const confirmar = window.confirm("¿Seguro que quieres borrar toda la lista?")
    if (!confirmar) return;
    
    listaCompra = [];
    localStorage.removeItem("listaCompra")
    lista.innerHTML = "<li>No hay nada que comprar</li>"
   }

  campoArticulo.addEventListener("keyup", onInputKeyUp)
  botonArticulo.addEventListener("click", onNuevoArticuloClick);
  botonNuevaLista.addEventListener("click", onNuevaListaClick)
});
document.addEventListener("DOMContentLoaded", () =>{
  const campoArticulo = document.getElementById("articulo");
  const botonArticulo = document.getElementById("nuevoArticulo");
  const lista = document.getElementById("lista")


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
    

    agregarArticulo(nombre);

    //limpiar UI
    campoArticulo.value = "";
    botonArticulo.disabled = true;
    campoArticulo.focus();
   }

  campoArticulo.addEventListener("keyup", onInputKeyUp)
  botonArticulo.addEventListener("click", onNuevoArticuloClick);
});
document.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function resetFormState(){
    const campoArticulo = document.getElementById("articulo")
    const botonArticulo = document.getElementById("nuevoArticulo")

    campoArticulo.value = "";
    botonArticulo.setAttribute("disabled", undefined)
}

function updateAddButtonState(){
    const campoArticulo = document.getElementById("articulo")
    const botonArticulo = document.getElementById("nuevoArticulo")

    if (campoArticulo.value.trim() !== "") {
        botonArticulo.removeAttribute("disabled");
    } else {
        botonArticulo.setAttribute("disabled", undefined)
    }
}

function handleEnterKey(e){
    if (e.code === "Enter"){
        const botonArticulo = document.getElementById("nuevoArticulo");
        
        const clickEvent = new MouseEvent ("click",{
            bubbles: true,
            cancelable: true,
            view: window,
        });

       botonArticulo.dispatchEvent(clickEvent);

    }
}

function onInputKeyUp(e){
    e.stopPropagation();
    handleEnterKey(e);
    updateAddButtonState();
}

function getShoppingList(){
    return JSON.parse(window.localStorage.getItem("lista-compra")) || [];
}

function saveShoppingList(lista){
    window.localStorage.setItem("lista-compra",JSON.stringify(lista));
}

function addItemToDOM(nombreProducto){
    const listaArticulos = document.getElementById("lista");
    const elemento = document.createElement("li");
    elemento.innerText = nombreProducto;
    listaArticulos.appendChild(elemento);
}

function addItem(nombreProducto){
    const listaCompra = getShoppingList();
    const nuevaLista = [...listaCompra, {nombre: nombreProducto}];
    saveShoppingList(nuevaLista)
    addItemToDOM(nombreProducto)
    resetFormState();
}


function onNewArticleClick(e){
    e.stopPropagation()
    const campoArticulo = document.getElementById("articulo");
    if (campoArticulo.value.trim() === "") return;
    addItem(campoArticulo.value.trim());
}

function clearShoppingListStorage(){
    window.localStorage.removeItem("lista-compra")
}

function clearListFromDOM(){
    const listaArticulos = document.getElementById("lista");
    
    while (listaArticulos.childNodes.length > 1){
        listaArticulos.removeChild(listaArticulos.lastChild);
    }
}

function resetShoppingList(){
    clearShoppingListStorage();
    clearListFromDOM();
    resetFormState();
}

function onNewListClick(e){
    e.stopPropagation()
    resetShoppingList(e)
}

function setupEventListeners(){
    const formulario = document.getElementById("formulario")
    const campoArticulo = document.getElementById("articulo")
    const botonArticulo = document.getElementById("nuevoArticulo")
    const botonNuevaLista = document.getElementById("nuevaLista")

    formulario.addEventListener("submit", onFormSubmit);
    campoArticulo.addEventListener("keyup", onInputKeyUp)
    botonArticulo.addEventListener("click", onNewArticleClick)
    botonNuevaLista.addEventListener("click",onNewListClick)
}

function renderInitialList(){
    const listaCompra = getShoppingList();
    for (let i = 0; i < listaCompra.length; i++){
        addItemToDOM(listaCompra[i].nombre);
    }
}

function onDOMContentLoaded(){
    setupEventListeners();
    renderInitialList();
    resetFormState();
}


function onFormSubmit(e){
    e.preventDefault()
}





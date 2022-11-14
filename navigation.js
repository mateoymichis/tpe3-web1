import contacto from './js/contacto.js';
import destinos from './js//destinos.js';
import updateDestino from './js/update-destino.js';
export {load_content};

iniciar();
let abrirMenu = document.getElementById('abrir-menu');
abrirMenu.addEventListener('click', mostrarMenu);

let cerrarMenu = document.getElementById('cerrar-menu');
cerrarMenu.addEventListener('click', mostrarMenu);

let menu = document.getElementById('cabecera-menu');

function mostrarMenu() {
    menu.classList.toggle('abrir-menu-ocultar');
    abrirMenu.classList.toggle('abrir-menu-ocultar');
    cerrarMenu.classList.toggle('abrir-menu-ocultar');
}
let irHome = document.querySelector("#cabecera-marca");
irHome.addEventListener("click", iniciar);

function select_tab(id) {
    document.querySelectorAll(".route").forEach(
        item => item.classList.remove('selected'));
    document.querySelectorAll("#" + id).forEach(
        item => item.classList.add('selected'));
}

async function load_content(id) {
    let container = document.querySelector("#contenido");
    try {
        let response = await fetch(`${window.location.origin}/views/${id}.html`);
        if (response.ok) {
            let content = await response.text();
            container.innerHTML = content;
        
            if(id === "contacto") {
                contacto();
            }

            if(id === "destinos") {
                destinos();
            }

            if (id === "update-destino") {
                updateDestino();
            }
           
        } else{
            container.innerHTML = 'Error loading for /' + id + '...';
        }
    } catch (error) {
        container.innerHTML = "Error";
    }
}

function push(event) {
    // Get id attribute of the button or link clicked
    let id = event.target.id;
    // Visually select the clicked button/tab/box
    select_tab(id);
    // Update Title in Window's Tab
    if (id === "home") {
        document.title = "Viaj.Ar"
    } else {
        document.title = `Viaj.Ar - `+`${id}`.toUpperCase();
    }
    // Load content for this tab/page
    load_content(id);
    // Finally push state change to the address bar
    window.history.pushState({id}, `${id}`,`/${id}`);
}

window.onload = (event) => {
    window["home"].addEventListener("click", (event) => push(event));
    window["destinos"].addEventListener("click", (event) => push(event));
    window["contacto"].addEventListener("click", (event) => push(event));
}

window.addEventListener("popstate", (event) => {
    let stateId = event.state.id;
    console.log("stateId = ",stateId);
    select_tab(stateId);
    load_content(stateId);
});

function iniciar() {
    load_content("home");
    history.pushState("home", "home", "/home");
    document.querySelectorAll(".route").forEach(
        item => item.classList.remove('selected'));
    document.querySelector("#home").classList.add("selected");
}
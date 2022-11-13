document.addEventListener("DOMContentLoaded",
()=>{
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
});

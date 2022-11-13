iniciar();
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
        let response = await fetch(`${window.location.origin}/${id}.html`);
        if (response.ok) {
            let content = await response.text();
            container.innerHTML = content;
        
            if(id === "contacto") {
                contactoJs();
            }

            if(id === "destinos") {
                destinosJs();
            }

            if (id === "update-destino") {
                updateDestinoJs();
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


function contactoJs() {
    function stringAleatorio (caracteres) {
        let letras = "abcdefghijklmnopqrstuvwxyz0123456789";
        let string = "";
        for (let i=1; i<=caracteres; i++) {
            let index = Math.floor(Math.random()*letras.length);
            let caracter = letras[index];
            string = string + caracter;
        }
        return string;
    }
    
    function generarCaptcha() {
        let captcha = document.getElementById('captcha');
        let contenido = stringAleatorio(6);
        captcha.value = contenido;
        captcha.innerHTML = contenido;
    }
    
    function validarCaptcha () {
        
        let captcha = document.getElementById('captcha').value;
        let captchaInput = document.getElementById('captcha-input').value;
        let captchaVacio = document.getElementById('captcha-vacio');
        let captchaIncorrecto = document.getElementById('captcha-incorrecto');
        let captchaCorrecto = document.getElementById('captcha-correcto');
        
        if (captcha === captchaInput) {
            captchaIncorrecto.classList.remove("captcha-incorrecto-mostrar");
            captchaIncorrecto.classList.add("captcha-incorrecto");
            captchaCorrecto.classList.add("captcha-correcto-mostrar");
            captchaCorrecto.classList.remove("captcha-correcto");
            return true;
        } else if (captchaInput === "") {
            captchaVacio.classList.remove("captcha-vacio");
            captchaVacio.classList.add("captcha-vacio-mostrar");
            return false;
        } else {
            captchaVacio.classList.remove("captcha-vacio-mostrar");
            captchaVacio.classList.add("captcha-vacio");
            captchaIncorrecto.classList.remove("captcha-incorrecto");
            captchaIncorrecto.classList.add("captcha-incorrecto-mostrar");
            captchaCorrecto.classList.add("captcha-correcto");
            captchaCorrecto.classList.remove("captcha-correcto-mostrar");
            generarCaptcha();
            return false;
        }
    }
    
    function validarFormulario (evento) {
        evento.preventDefault();
        let enviado = document.getElementById('enviado');
        
        if(validarCaptcha()) {
            form.reset();
            enviado.classList.remove("enviado");
            enviado.classList.add("enviado-ok");
        } else {
            enviado.classList.remove("enviado-ok");
            enviado.classList.add("enviado");
        }
    }
    
    generarCaptcha();
    const form = document.getElementById("form");
    form.addEventListener("submit", validarFormulario);

}

function destinosJs() {
   //comienzo del nuevo codigo
    const url ='https://6363a3068a3337d9a2e2f7d2.mockapi.io/Destinos';
    const tabla = document.getElementById('tabla');
    const form = document.getElementById('form');
    const btnadd = document.getElementById('btnadd');
    btnadd.addEventListener('click',nuevoRegistro);
    const btnCargar = document.getElementById("btncargar");
    btnCargar.addEventListener('click', () => {
        agregarPrecargados(precargados);
    });
    //const btnVaciar = document.getElementById("btnvaciar");
    //btnVaciar.addEventListener('click', eliminarTodo);
    const precargados = [
        {"destino": {   "ciudad": "Cancun",
                        "pais": "Mexico"
                    },
                    "incluye": {    "aereo": "Aereos ida y vuelta desde Bs. As.",
                                    "bus": "",
                                    "hotel": "Hotel 5★ Cancun Beach Resort",
                                    "comida": "All inclusive",
                                    "asistencia": "Asistencia al viajero"
                    },
                    "duracion": {   "dias": 8,
                                    "noches": 7
                    },
                    "precio": 2100
                    },
        {"destino": {   "ciudad": "San Andres",
                        "pais": "Colombia"
                    },
                    "incluye": {    "aereo": "Aereos ida y vuelta desde Bs. As.",
                                    "bus": "",
                                    "hotel": "Hotel 4★ habitacion con vista al mar",
                                    "comida": " Pension completa, bebidas incluidase",
                                    "asistencia": "Asistencia al viajero"
                    },
                    "duracion": {   "dias": 8,
                                    "noches": 7
                    },
                    "precio": 1500
                    },
        {"destino": {   "ciudad": "Cataratas del Iguazu",
                        "pais": "Argentina"
                    },
                    "incluye": {    "aereo": "",
                                    "bus": "Traslados ida y vuelta. Bus semi-cama",
                                    "hotel": "Hotel 4★",
                                    "comida": " Desayuno",
                                    "asistencia": "Excursion a Garganta del diablo"
                                },
                    "duracion": {   "dias": 5,
                                    "noches": 3},
                    "precio": 450
                    }
    ];

    obtenerDatos(); 

    async function obtenerDatos() {
        borrarFilasTabla();
        try {
            let res = await fetch(url);
            let json = await res.json();
            for (const lugar of json) {
                agregarFila(lugar);
            }
        } catch (error) {
            console.log("Error! - " + error)
        }
    }

    async function obtenerUnDato (id) {
        try {
            let res = await fetch(`${url}/${id}`);
            let json = await res.json();
                       
            ciudad.value = json.destino.ciudad;
            pais.value = json.destino.pais;
            aereo.value = json.incluye.aereo;
            bus.value = json.incluye.bus;
            hotel.value = json.incluye.hotel;
            comida.value = json.incluye.comida;
            asistencia.value = json.incluye.asistencia;
            dias.value = json.duracion.dias;
            noches.value = json.duracion.noches;
            precio.value = json.precio;
        } catch (error) {
            console.log("Error! - " + error)
        }
    }

    function borrarFilasTabla() {
        while(tabla.rows.length>0) {
            tabla.deleteRow(0);
        }
    }

    function agregarFila(lugar) {
        let fila = document.createElement('tr');
        let columna1 = document.createElement('td');
        let columna2 = document.createElement('td');
        let columna3 = document.createElement('td');
        let columna4 = document.createElement('td');
        let lista = document.createElement('ul');
        let hotel = document.createElement('li');
        let comida = document.createElement('li');
        let asistencia = document.createElement('li');
        let id = lugar.id;
        let modificar = document.createElement('button');
        let borrar = document.createElement('button');
        modificar.innerHTML = `<img src="../img/pencil - white.svg">`;
        modificar.databuttonname = id;
        modificar.addEventListener('click', ()=>{
            let lugarId = modificar.databuttonname
            load_content("update-destino");
            history.pushState("update-destino", "update-destino", `/update-destino/${lugarId}`);
            document.querySelectorAll(".route").forEach(
                item => item.classList.remove('selected'));
            obtenerUnDato(lugarId);
        });
        borrar.innerHTML = `<img src="../img/trash.svg">`;
        borrar.databuttonname = id;
        borrar.addEventListener('click', ()=>{
            let id = borrar.databuttonname;
            borrarItem(id);
        });
        columna1.innerHTML = lugar.destino.ciudad + ', ' + lugar.destino.pais;
        columna3.innerHTML = lugar.duracion.dias + ' días/ '+ lugar.duracion.noches + ' noches';
        columna4.innerHTML = 'Us$ '+ lugar.precio;
        columna1.appendChild(modificar);
        columna1.appendChild(borrar);
        columna1.classList.add('bordes', 'destacar-destino');
        columna2.classList.add('bordes');
        columna3.classList.add('bordes');
        columna4.classList.add('bordes');

        columna2.appendChild(lista);

        if (lugar.incluye.aereo != '') {
            let aereo = document.createElement('li');
            lista.appendChild(aereo);
            aereo.classList.add('icon', 'icon-avion');
            aereo.innerHTML= lugar.incluye.aereo;
        }

        if(lugar.incluye.bus !='') {
            let bus = document.createElement('li');
            lista.appendChild(bus);
            bus.classList.add('icon', 'icon-bus');
            bus.innerHTML= lugar.incluye.bus;
        }

        lista.appendChild(hotel);
        lista.appendChild(comida);
        lista.appendChild(asistencia);

        hotel.classList.add('icon', 'icon-hotel');
        comida.classList.add('icon','icon-morfi');
        asistencia.classList.add('icon','icon-asist');

        hotel.innerHTML= lugar.incluye.hotel;
        comida.innerHTML= lugar.incluye.comida;
        asistencia.innerHTML= lugar.incluye.asistencia;

        tabla.appendChild(fila);
        fila.appendChild(columna1);
        fila.appendChild(columna2);
        fila.appendChild(columna3);
        fila.appendChild(columna4);

        if(lugar.destino.pais.includes('Argentina')) {
            columna1.classList.add('argentina');
            columna1.classList.remove('destacar-destino');
            columna2.classList.add('argentina');
            columna3.classList.add('argentina');
            columna4.classList.add('argentina');
        }
    }

    async function nuevoRegistro (evento) {
        evento.preventDefault();
        let aereoValor = '';
        let busValor = '';
        if(aereo.value != undefined) {
            aereoValor = aereo.value;
        }
        if(bus.value != undefined) {
            busValor = bus.value;
        }
        let lugar = {
            'destino': { 'ciudad' : ciudad.value,
                        'pais' : pais.value},
            'incluye': { 'aereo': aereoValor,
                'bus': busValor,
                'hotel': hotel.value,
                'comida': comida.value,
                'asistencia': asistencia.value
            },        
            'duracion': {   'dias': dias.value,
                    'noches': noches.value},
            'precio': precio.value
            };
        
        
        
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": {"Content-type": "application/json"},
                "body": JSON.stringify(lugar)
            });
            if (res.status === 201) {
                form.reset();
                obtenerDatos();
            }
        } catch (error) {
            console.log("Error! - " + error)
        }
    }  

    //lo puse así porque me decia que borrar() no era una funcion

    function borrarItem (id) {
        borrar(id);
    }

    async function borrar(id) {
        try {
            let res = await fetch (`${url}/${id}`, {
                "method": "DELETE"
            });
            if (res.status === 200) {
                obtenerDatos();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function agregarPrecargados(array) {
        for (let i = 0; i < array.length; i++) {
            try {
                let res = await fetch(url, {
                    "method": "POST",
                    "headers": {"Content-type": "application/json"},
                    "body": JSON.stringify(array[i])
                });
            } catch (error) {
                console.log("Error! - " + error)
            }
        }
        obtenerDatos();
    }

}

function updateDestinoJs() {
    const url ='https://6363a3068a3337d9a2e2f7d2.mockapi.io/Destinos';

    let direccion = window.location.href;
    let sacar = `${window.location.origin}/update-destino/`;
    let lugarId = direccion.replace(sacar, '');
    
    let formedit = document.getElementById("formedit");
    formedit.addEventListener("submit", modificar);

    async function modificar (evento) {
        evento.preventDefault();
        
        let lugarUpdate = {
            'destino': { 'ciudad' : document.getElementById('ciudad') .value,
                        'pais' : document.getElementById('pais').value},
            'incluye': { 'aereo': document.getElementById('aereo') .value,
                'bus': document.getElementById('bus') .value,
                'hotel': document.getElementById('hotel').value,
                'comida': document.getElementById('comida').value,
                'asistencia': document.getElementById('asistencia').value
            },        
            'duracion': {   'dias': document.getElementById('dias').value,
                    'noches': document.getElementById('noches').value},
            'precio': document.getElementById('precio').value
        }

        try {
            let res = await fetch (`${url}/${lugarId}`, {
                "method": "PUT",
                "headers": {"Content-type": "application/json"},
                "body": JSON.stringify(lugarUpdate)
            });
            if (res.status === 200) {
                load_content("destinos");
                history.pushState("destinos", "destinos", "/destinos");
                document.querySelectorAll(".route").forEach(
                    item => item.classList.remove('selected'));
                document.querySelector("#destinos").classList.add("selected");
            }

        } catch (error) {
            console.log(error);
        }
        
    }
}
import {load_content} from "../../navigation.js";
export default function destinos() {
    
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
 
     let pagina = 1;
     obtenerDatosPaginados(pagina); 
 
     let cantidadDatos = 0;
 
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
 
     async function contarDatos() {
         try {
             let res = await fetch(url);
             let json = await res.json();
             if (res.status === 200) {
                 cantidadDatos = json.length;
             }
         } catch (error) {
             console.log("Error! - " + error)
         }
     }
 
     contarDatos();
 
 
     async function obtenerDatosPaginados(pagina) {
         let resultadosPorPagina = 5;
         borrarFilasTabla();
         try {
             let res = await fetch(`${url}?page=${pagina}&limit=${resultadosPorPagina}`);
             let json = await res.json();
             for (const lugar of json) {
                 agregarFila(lugar);
             }
         } catch (error) {
             console.log("Error! - " + error)
         }
     }
     
     
     
     let anterior = document.getElementById("anterior");
     
     anterior.addEventListener("click", ()=> {
         contarDatos();
         if (pagina > 1) {
             pagina--;
             obtenerDatosPaginados(pagina);
         }
     });
 
     let siguiente = document.getElementById("siguiente");
 
 
     siguiente.addEventListener("click", ()=> {
         contarDatos();
         if ((cantidadDatos/5) > pagina) {
             pagina++;
             obtenerDatosPaginados(pagina);
         }
     });
 
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
         fila.classList.add("lugar");
         columna1.classList.add("info-lugar");
         modificar.innerHTML = `<img src="../img/pencil - white.svg">`;
         modificar.databuttonname = id;
         modificar.addEventListener('click', ()=>{
             let lugarId = modificar.databuttonname;
             load_content("update-destino");
             history.pushState("update-destino", "update-destino", `/update-destino/${lugarId}`);
             document.querySelectorAll(".route").forEach(
                 item => item.classList.remove('selected'));
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
                 obtenerDatosPaginados(pagina);
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
                 obtenerDatosPaginados(pagina);
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
         obtenerDatosPaginados(pagina);
     }
 
     
     let filtrar = document.getElementById("filtrar");

     filtrar.addEventListener("click", async () => {
         borrarFilasTabla();
         try {
             let res = await fetch(url);
             let json = await res.json();
             for (const lugar of json) {
                 agregarFila(lugar);
             }
             if( res.status === 200) {
                 let buscador = document.querySelector("#input-buscador");
                 let lugares = document.querySelectorAll(".lugar");
                 let busqueda = buscador.value;
                 if (busqueda.length > 0) {
         
                     for (let i=0; i<lugares.length; i++) {
                         let lugar = lugares[i];
                         let tdNombre = lugar.querySelector(".info-lugar");
                         let nombre = tdNombre.textContent;
                         let expresion = new RegExp(busqueda, "i");
                         
                         if (!expresion.test(nombre)) {
                             lugar.classList.add("invisible");
                         } else {
                             lugar.classList.remove("invisible");
                         }
                     }
                 } else {
                     for (let i=0; i<lugares.length; i++) {
                         let lugar = lugares[i];
                         lugar.classList.remove("invisible");
                     }
                 }
 
             }
         } catch (error) {
             console.log("Error! - " + error)
         }
     
     });
 
 }
 
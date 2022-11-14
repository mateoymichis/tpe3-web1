import {load_content} from "../../navigation.js";
export default function updateDestino() {
    const url ='https://6363a3068a3337d9a2e2f7d2.mockapi.io/Destinos';

    let direccion = window.location.href;
    let sacar = `${window.location.origin}/update-destino/`;
    let lugarId = direccion.replace(sacar, '');
    
    let formedit = document.getElementById("formedit");
    formedit.addEventListener("submit", modificar);
    obtenerUnDato (lugarId);

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
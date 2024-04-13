const playGame = document.getElementById('start');
const sectionSeleccionarPersonaje = document.getElementById('seleccionarPersonaje');
const sectionSeleccionarPersonaje2 = document.getElementById('seleccionarPersonaje2');
const sectionPantallaPrincipal = document.getElementById('pantallaPrincipal');
const sectionSeleccionarAtaque = document.getElementById('seleccionarAtaque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonPersonajeJugador = document.getElementById('btnPersonaje');
const botonPersonajeJugador2 = document.getElementById('btnPersonaje2');
const botonReiniciar = document.getElementById('btnReiniciar');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataquesDelJugador');
const ataquesDelEnemigo = document.getElementById('ataquesDelEnemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorTarjetas2 = document.getElementById('contenedorTarjetas2');
const contenedorAtaques = document.getElementById('contenedorAtaques');
const ataque1a = document.getElementById('ataque1a');
const ataque2a = document.getElementById('ataque2a');
const ataque3a = document.getElementById('ataque3a');
const ataque1b = document.getElementById('ataque1b');
const ataque2b = document.getElementById('ataque2b');
const ataque3b = document.getElementById('ataque3b');
const aNombre1 = document.getElementById('argenmonNombre1');
const aTipo1 = document.getElementById('argenmonTipo1');
const aVida1 = document.getElementById('argenmonVida1');
const aNombre2 = document.getElementById('argenmonNombre2');
const aTipo2 = document.getElementById('argenmonTipo2');
const aVida2 = document.getElementById('argenmonVida2');

let opcionDeArgenmones = '';
let inputFlamdor;
let inputDuñan;
let inputOrclish;
let inputFlamdor2;
let inputDuñan2;
let inputOrclish2;
let nombreElegido;
let nombreElegido2;
let tipoElegido;
let vidaElegida;
let tipoElegido2;
let vidaElegida2;
let ataque1Elegido;
let ataque2Elegido;
let ataque3Elegido;
let ataque1Elegido2;
let ataque2Elegido2;
let ataque3Elegido2;


function cargarJuego() {

    sectionSeleccionarPersonaje.style.display = 'none';
    sectionSeleccionarPersonaje2.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    playGame.addEventListener('click', () => {
        fetch('data/argenmones.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                argenmones = data;
                seleccionarPersonajeJugador(argenmones);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    });

}

function seleccionarPersonajeJugador(argenmonesData) {
    argenmones = argenmonesData;

    sectionPantallaPrincipal.style.display = 'none';
    sectionSeleccionarPersonaje.style.display = 'flex';
    sectionSeleccionarPersonaje2.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    argenmones.forEach((argenmon) => {
        opcionDeArgenmones += `
        <input type="radio" name="personaje" id= ${argenmon.nombre} />
        <label for= ${argenmon.nombre}>
            <p>${argenmon.nombre}</p>
            <img src=${argenmon.foto} alt= ${argenmon.nombre}>
        </label>
        `;
    });

    contenedorTarjetas.innerHTML = opcionDeArgenmones;

    inputFlamdor = document.getElementById('Flamdor');
    inputDuñan = document.getElementById('Duñan');
    inputOrclish = document.getElementById('Orclish');

    botonPersonajeJugador.addEventListener('click', () => seleccionarPersonajeJugador2(argenmonesData));

}

function seleccionarPersonajeJugador2(argenmonesData) {
    argenmones = argenmonesData;

    sectionPantallaPrincipal.style.display = 'none';
    sectionSeleccionarPersonaje.style.display = 'none';
    sectionSeleccionarPersonaje2.style.display = 'flex';
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    contenedorTarjetas2.innerHTML = '';

    argenmones.forEach((argenmon) => {
        const nuevaOpcion = `
        <input type="radio" name="personaje2" id= ${argenmon.nombre}2 />
        <label for= ${argenmon.nombre}2>
            <p>${argenmon.nombre}</p>
            <img src=${argenmon.foto} alt= ${argenmon.nombre}>
        </label>
        `;
        contenedorTarjetas2.insertAdjacentHTML('beforeend', nuevaOpcion);
    });

    inputFlamdor2 = document.getElementById('Flamdor2');
    inputDuñan2 = document.getElementById('Duñan2');
    inputOrclish2 = document.getElementById('Orclish2');

    botonPersonajeJugador2.addEventListener('click', () => validarPersonajes(argenmonesData));

}

function validarPersonajes(argenmones) {

    sectionSeleccionarPersonaje.style.display = "none";
    sectionSeleccionarPersonaje2.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";

    if (inputFlamdor.checked) {
        nombreElegido = 'Flamdor';
    } else if (inputDuñan.checked) {
        nombreElegido = 'Duñan';
    } else if (inputOrclish.checked) {
        nombreElegido = 'Orclish';
    } else {
        alert('Debes seleccionar una mascota');
        return;
    }

    if (inputFlamdor2.checked) {
        nombreElegido2 = 'Flamdor';
    } else if (inputDuñan2.checked) {
        nombreElegido2 = 'Duñan';
    } else if (inputOrclish2.checked) {
        nombreElegido2 = 'Orclish';
    } else {
        alert('Debes seleccionar una mascota');
        return;
    }

    const argenmonElegido = argenmones.find((argenmon) => argenmon.nombre === nombreElegido);
    const argenmonElegido2 = argenmones.find((argenmon) => argenmon.nombre === nombreElegido2);

    document.getElementById('argenmonNombre1').textContent = 'Nombre: ' +  argenmonElegido.nombre;
    document.getElementById('argenmonTipo1').textContent = 'Tipo: ' + argenmonElegido.tipo;
    document.getElementById('argenmonVida1').textContent = 'Vida: ' + argenmonElegido.vida;

    document.getElementById('argenmonNombre2').textContent = 'Nombre: ' + argenmonElegido2.nombre;
    document.getElementById('argenmonTipo2').textContent = 'Tipo: ' + argenmonElegido2.tipo;
    document.getElementById('argenmonVida2').textContent = 'Vida: ' + argenmonElegido2.vida;

    document.getElementById('ataque1a').value = argenmonElegido.ataque1;
    document.getElementById('ataque2a').value = argenmonElegido.ataque2;
    document.getElementById('ataque3a').value = argenmonElegido.ataque3;

    document.getElementById('ataque1b').value = argenmonElegido2.ataque1;
    document.getElementById('ataque2b').value = argenmonElegido2.ataque2;
    document.getElementById('ataque3b').value = argenmonElegido2.ataque3;

    nombreElegido = argenmonElegido.nombre;
    tipoElegido = argenmonElegido.tipo;
    vidaElegida = argenmonElegido.vida;
    ataque1Elegido = argenmonElegido.ataque1;
    ataque2Elegido = argenmonElegido.ataque2;
    ataque3Elegido = argenmonElegido.ataque3;

    nombreElegido2 = argenmonElegido2.nombre;
    tipoElegido2 = argenmonElegido2.tipo;
    vidaElegida2 = argenmonElegido2.vida;
    ataque1Elegido2 = argenmonElegido2.ataque1;
    ataque2Elegido2 = argenmonElegido2.ataque2;
    ataque3Elegido2 = argenmonElegido2.ataque3;

    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function crearMensajeResultado(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal;
    sectionReiniciar.style.display = "block";
}

window.addEventListener("load", cargarJuego);
const playGame = document.getElementById('start');
const sectionSeleccionarPersonaje = document.getElementById('seleccionarPersonaje');
const inputFlamdor = document.getElementById('flamdor');
const inputDuñan = document.getElementById('duñan');
const inputOrclish = document.getElementById('orclish');
const spanPersonajeJugador = document.getElementById('personajeJugador');

const sectionSeleccionarAtaque = document.getElementById('seleccionarAtaque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonPersonajeJugador = document.getElementById('btnPersonaje');
const botonGolpe = document.getElementById('btnGolpe');
const botonEspecial = document.getElementById('btnEspecial');
const botonDefensa = document.getElementById('btnDefensa');
const botonReiniciar = document.getElementById('btnReiniciar');

const spanPersonajeEnemigo = document.getElementById('PersonajeEnemigo');

const spanVidasJugador = document.getElementById('vidasJugador');
const spanVidasEnemigo = document.getElementById('vidasEnemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataquesDelJugador');
const ataquesDelEnemigo = document.getElementById('ataquesDelEnemigo');

let vidasJugador = 3;
let vidasEnemigo = 3;
let ataqueJugador;
let ataqueEnemigo;

function inicializarJuego() {
    
    sectionSeleccionarPersonaje.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';
    
    playGame.addEventListener('click', iniciarJuego);
}

function iniciarJuego() {
    playGame.style.display = 'none';
    sectionSeleccionarPersonaje.style.display = 'flex'; 
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';


    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    botonGolpe.addEventListener('click', ataqueGolpe);
    botonEspecial.addEventListener('click', ataqueEspecial);
    botonDefensa.addEventListener('click', defenderse);
    botonReiniciar.addEventListener('click', reiniciarJuego);

}

function seleccionarPersonajeJugador() {
    
    sectionSeleccionarPersonaje.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";
    
    if (inputFlamdor.checked) {
        spanPersonajeJugador.innerHTML = "Flamdor";
    } else if (inputDuñan.checked) {
        spanPersonajeJugador.innerHTML = "Duñan";
    } else if (inputOrclish.checked) {
        spanPersonajeJugador.innerHTML = "Orclish";
    } else {
        document.write('Debes seleccionar una mascota');
    }

    seleccionarPersonajeEnemigo()
}

function seleccionarPersonajeEnemigo() {
    let personajeAleatorio = aleatorio(1, 3);

    if (personajeAleatorio == 1) {
        spanPersonajeEnemigo.innerHTML = "Flamdor";
    } else if (personajeAleatorio == 2) {
        spanPersonajeEnemigo.innerHTML = "Duñan";
    } else {
        spanPersonajeEnemigo.innerHTML = "Orclish";
    }
}


function ataqueGolpe() {
    ataqueJugador = 'GOLPE';
    ataqueAleatorioEnemigo()
}
function ataqueEspecial() {
    ataqueJugador = 'ESPECIAL';
    ataqueAleatorioEnemigo()
}
function defenderse() {
    ataqueJugador = 'DEFENSA';
    ataqueAleatorioEnemigo()
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'GOLPE';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'ESPECIAL';
    } else {
        ataqueEnemigo = 'DEFENSA';
    }

    combate()
}

//Cambiar funcion de vidas a Energia
function combate() {
    
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje('EMPATE');
    } else if ((ataqueJugador == 'GOLPE' && ataqueEnemigo == 'ESPECIAL') || (ataqueJugador == 'ESPECIAL' && ataqueEnemigo == 'DEFENSA') || (ataqueJugador == 'DEFENSA' && ataqueEnemigo == 'GOLPE')) {
        crearMensaje('GANASTE');
        vidasEnemigo -= 1;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje('PERDISTE');
        vidasJugador -= 1;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeResultado('El Argenmón enemigo esta hecho bosta. GANASTE PAPÁ!!');
    } else if (vidasJugador == 0) {
        crearMensajeResultado('Te dieron para que tengas y guardes. Reinicia y dale masa')
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeResultado(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal;
    botonDefensa.disabled = true;
    botonEspecial.disabled = true;
    botonGolpe.disabled = true;

    sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", inicializarJuego);
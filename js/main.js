const playGame = document.getElementById('start');
const sectionSeleccionarPersonaje = document.getElementById('seleccionarPersonaje');
const spanPersonajeJugador = document.getElementById('personajeJugador');
const sectionSeleccionarAtaque = document.getElementById('seleccionarAtaque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonPersonajeJugador = document.getElementById('btnPersonaje');
const botonReiniciar = document.getElementById('btnReiniciar');
const spanPersonajeEnemigo = document.getElementById('personajeEnemigo');
const spanVidasJugador = document.getElementById('vidasJugador');
const spanVidasEnemigo = document.getElementById('vidasEnemigo');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataquesDelJugador');
const ataquesDelEnemigo = document.getElementById('ataquesDelEnemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

let argenmones = [];
let vidasJugador = 3;
let vidasEnemigo = 3;
let ataqueJugador = [];
let ataqueEnemigo;
let opcionDeArgenmones;
let inputFlamdor;
let inputDuñan;
let botonFuego;
let botonTierra;
let botonAgua;
let inputOrclish;
let botones = [];
let personajeJugador;
let ataquesArgenmon;

class Argenmon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre,
            this.foto = foto,
            this.vida = vida
        this.ataques = []
    }
}

let flamdor = new Argenmon('Flamdor', './assets/Flamdor.png', 5);
let duñan = new Argenmon('Duñan', './assets/Duñan.png', 5);
let orclish = new Argenmon('Orclish', './assets/Orclish.png', 5);

flamdor.ataques.push(
    { nombre: '🔥', id: 'btnFuego' },
    { nombre: '🔥', id: 'btnFuego' },
    { nombre: '🔥', id: 'btnFuego' },
    { nombre: '🌱', id: 'btnTierra' },
    { nombre: '💧', id: 'btnAgua' },
)

duñan.ataques.push(
    { nombre: '🌱', id: 'btnTierra' },
    { nombre: '🌱', id: 'btnTierra' },
    { nombre: '🌱', id: 'btnTierra' },
    { nombre: '🔥', id: 'btnFuego' },
    { nombre: '💧', id: 'btnAgua' },
)

orclish.ataques.push(
    { nombre: '💧', id: 'btnAgua' },
    { nombre: '💧', id: 'btnAgua' },
    { nombre: '💧', id: 'btnAgua' },
    { nombre: '🌱', id: 'btnTierra' },
    { nombre: '🔥', id: 'btnFuego' },
)

argenmones.push(flamdor, duñan, orclish)

function cargarJuego() {

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

    argenmones.forEach((argenmon) => {
        opcionDeArgenmones = `<input type="radio" name="personaje" id= ${argenmon.nombre} />
        <label for= ${argenmon.nombre}>
            <p>${argenmon.nombre}</p>
            <img src=${argenmon.foto} alt= ${argenmon.nombre}>
        </label>`

        contenedorTarjetas.innerHTML += opcionDeArgenmones;

        inputFlamdor = document.getElementById('Flamdor');
        inputDuñan = document.getElementById('Duñan');
        inputOrclish = document.getElementById('Orclish');
    })

    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);

    botonReiniciar.addEventListener('click', reiniciarJuego);

}


function seleccionarPersonajeJugador() {

    sectionSeleccionarPersonaje.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";

    if (inputFlamdor.checked) {
        spanPersonajeJugador.innerHTML = inputFlamdor.id;
        personajeJugador = inputFlamdor.id;
    } else if (inputDuñan.checked) {
        spanPersonajeJugador.innerHTML = inputDuñan.id;
        personajeJugador = inputDuñan.id;
    } else if (inputOrclish.checked) {
        spanPersonajeJugador.innerHTML = inputOrclish.id;
        personajeJugador = inputOrclish.id;
    } else {
        alert('Debes seleccionar una mascota');
    }

    extraerAtaques(personajeJugador);
    seleccionarPersonajeEnemigo();
}

function extraerAtaques(personajeJugador) {
    let ataques;
    for (let i = 0; i < argenmones.length; i += 1) {
        if (personajeJugador === argenmones[i].nombre) {
            ataques = argenmones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesArgenmon = `
        <button id=${ataque.id} class="btnAtaque bAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesArgenmon;
    })

    botonFuego = document.getElementById('btnFuego');
    botonTierra = document.getElementById('btnTierra');
    botonAgua = document.getElementById('btnAgua');
    botones = document.querySelectorAll('.bAtaque');
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.disabled = true;
            }else if(e.target.textContent === '💧') {
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.disabled = true;
            }else {
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.disabled = true;
            }
        })
    })
}

function seleccionarPersonajeEnemigo() {
    let personajeAleatorio = aleatorio(0, argenmones.length - 1);

    spanPersonajeEnemigo.innerHTML = argenmones[personajeAleatorio].nombre;
    secuenciaAtaque()
}


function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo()
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'TIERRA';
    } else {
        ataqueEnemigo = 'AGUA';
    }

    combate()
}

//Cambiar funcion de vidas a Energia
function combate() {

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje('EMPATE');
    } else if ((ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') || (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') || (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO')) {
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
        crearMensajeResultado('El Argenmón enemigo no puede continuar. GANASTE PAPÁ!!');
    } else if (vidasJugador == 0) {
        crearMensajeResultado('Te dieron masa. Intenta de nuevo.')
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
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    botonFuego.disabled = true;

    sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", cargarJuego);
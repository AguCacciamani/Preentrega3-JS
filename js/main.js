const playGame = document.getElementById('start');
const sectionSeleccionarPersonaje = document.getElementById('seleccionarPersonaje');
const sectionSeleccionarPersonaje2 = document.getElementById('seleccionarPersonaje2');
const sectionPantallaPrincipal = document.getElementById('pantallaPrincipal');
const spanPersonajeJugador = document.getElementById('personajeJugador');
const sectionSeleccionarAtaque = document.getElementById('seleccionarAtaque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonPersonajeJugador = document.getElementById('btnPersonaje');
const botonPersonajeJugador2 = document.getElementById('btnPersonaje2');
const botonReiniciar = document.getElementById('btnReiniciar');
const spanPersonajeEnemigo = document.getElementById('personajeEnemigo');
// const spanVictoriasJugador = document.getElementById('victoriasJugador');
// const spanVictoriasEnemigo = document.getElementById('victoriasEnemigo');
// const spanVictoriasAcumuladasJugador = document.getElementById('victoriasAcumuladasJugador');
// const spanVictoriasAcumuladasEnemigo = document.getElementById('victoriasAcumuladasEnemigo');
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
// const botonesPelea1 = document.getElementById('botonesPelea1');
// const botonesPelea2 = document.getElementById('botonesPelea2');
const aNombre1 = document.getElementById('argenmonNombre1');
const aTipo1 = document.getElementById('argenmonTipo1');
const aVida1 = document.getElementById('argenmonVida1');
const aNombre2 = document.getElementById('argenmonNombre2');
const aTipo2 = document.getElementById('argenmonTipo2');
const aVida2 = document.getElementById('argenmonVida2');

// let argenmones = [];
// let victoriasJugador = 0;
// let victoriasEnemigo = 0;
// let victoriasAcumuladasJugador = 0;
// let victoriasAcumuladasEnemigo = 0;
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeArgenmones = '';
let inputFlamdor;
let inputDuñan;
let inputOrclish;
// let botonFuego;
// let botonPlanta;
// let botonAgua;
let botones = [];
let iAtaqueJugador;
let iAtaqueEnemigo;
let personajeJugador;
let ataquesArgenmon;
let ataquesArgenmonEnemigo;
let nombreElegido;
let tipoElegido;
let vidaElegida;
let ataque1Elegido;
let ataque2Elegido;
let ataque3Elegido;

// class Argenmon {
//     constructor(nombre, foto, vida, tipo) {
//         this.nombre = nombre,
//             this.foto = foto,
//             this.vida = vida,
//             this.tipo = tipo
//         this.ataques = []
//     }
// }

/*let flamdor = new Argenmon('Flamdor', './assets/Flamdor.png', 100, 'Fuego');
let duñan = new Argenmon('Duñan', './assets/Duñan.png', 100, 'Planta');
let orclish = new Argenmon('Orclish', './assets/Orclish.png', 100, 'Agua');

flamdor.ataques.push(
    { nombre: 'Corte Aereo', id: 'btnFuego' },
    { nombre: 'Ascuas', id: 'btnFuego' },
    { nombre: 'Llamarada', id: 'btnFuego' },
)

duñan.ataques.push(
    { nombre: 'Cabezazo', id: 'btnPlanta' },
    { nombre: 'Hoja Afilada', id: 'btnPlanta' },
    { nombre: 'Hoja Aguda', id: 'btnPlanta' },
)

orclish.ataques.push(
    { nombre: 'Mordisco', id: 'btnAgua' },
    { nombre: 'Acua Jet', id: 'btnAgua' },
    { nombre: 'Hidrobomba', id: 'btnAgua' },
)

argenmones.push(flamdor, duñan, orclish)*/

function guardarDatosJugador() {
    localStorage.setItem('jugador', JSON.stringify({
        victorias: victoriasAcumuladasJugador,
    }));
}

function guardarDatosEnemigo() {
    localStorage.setItem('enemigo', JSON.stringify({
        victorias: victoriasAcumuladasEnemigo,
    }))
}

function cargarDatosJugador() {
    const jugadorGuardado = localStorage.getItem('jugador');
    if (jugadorGuardado) {
        const datosJugador = JSON.parse(jugadorGuardado);
        victoriasAcumuladasJugador = datosJugador.victorias;
    }
}

function cargarDatosEnemigo() {
    const enemigoGuardado = localStorage.getItem('enemigo');
    if (enemigoGuardado) {
        const datosEnemigo = JSON.parse(enemigoGuardado);
        victoriasAcumuladasEnemigo = datosEnemigo.victorias;
    }
}

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

    cargarDatosJugador();
    cargarDatosEnemigo();
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
        opcionDeArgenmones += `
        <input type="radio" name="personaje" id= ${argenmon.nombre} />
        <label for= ${argenmon.nombre}>
            <p>${argenmon.nombre}</p>
            <img src=${argenmon.foto} alt= ${argenmon.nombre}>
        </label>
        `;
        contenedorTarjetas2.insertAdjacentHTML('beforeend', nuevaOpcion);
    });
    

    inputFlamdor = document.getElementById('Flamdor');
    inputDuñan = document.getElementById('Duñan');
    inputOrclish = document.getElementById('Orclish');


    botonPersonajeJugador2.addEventListener('click', () => iniciarPelea(argenmones));

}

function iniciarPelea(argenmones) {

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

    const argenmonElegido = argenmones.find((argenmon) => argenmon.nombre === nombreElegido);

    document.getElementById('argenmonNombre1').textContent = argenmonElegido.nombre;
    document.getElementById('argenmonTipo1').textContent = argenmonElegido.tipo;
    document.getElementById('argenmonVida1').textContent = argenmonElegido.vida;
    document.getElementById('argenmonNombre2').textContent = argenmonElegido.nombre;
    document.getElementById('argenmonTipo2').textContent = argenmonElegido.tipo;
    document.getElementById('argenmonVida2').textContent = argenmonElegido.vida;
    document.getElementById('ataque1a').value = argenmonElegido.ataque1;
    document.getElementById('ataque2a').value = argenmonElegido.ataque2;
    document.getElementById('ataque3a').value = argenmonElegido.ataque3;
    
    document.getElementById('ataque1b').value = argenmonElegido.ataque1;
    document.getElementById('ataque2b').value = argenmonElegido.ataque2;
    document.getElementById('ataque3b').value = argenmonElegido.ataque3;

    nombreElegido = argenmonElegido.nombre;
    tipoElegido = argenmonElegido.tipo;
    vidaElegida = argenmonElegido.vida;
    ataque1Elegido = argenmonElegido.ataque1;
    ataque2Elegido = argenmonElegido.ataque2;
    ataque3Elegido = argenmonElegido.ataque3;

    // extraerAtaques(nombreElegido);
    // seleccionarPersonajeEnemigo();
    botonReiniciar.addEventListener('click', reiniciarJuego);
}



// function extraerAtaques(personajeJugador) {
//     let ataques;
//     for (let i = 0; i < argenmones.length; i += 1) {
//         if (personajeJugador === argenmones[i].nombre) {
//             ataques = argenmones[i].ataques;
//         }
//     }
//     mostrarAtaques(ataques);
// }

// function mostrarAtaques(ataques) {
//     ataques.forEach((ataque) => {
//         ataquesArgenmon = `
//         <button id=${ataque.id} class="btnAtaque bAtaque">${ataque.nombre}</button>`

//         contenedorAtaques.innerHTML += ataquesArgenmon;
//     })

//     botonFuego = document.getElementById('btnFuego');
//     botonPlanta = document.getElementById('btnPlanta');
//     botonAgua = document.getElementById('btnAgua');
//     botones = document.querySelectorAll('.bAtaque');
// }


// function secuenciaAtaque() {
//     botones.forEach((boton) => {
//         boton.addEventListener('click', (e) => {
//             if (e.target.textContent === '🔥') {
//                 ataqueJugador.push('FUEGO');
//                 boton.disabled = true;
//             } else if (e.target.textContent === '💧') {
//                 ataqueJugador.push('AGUA');
//                 boton.disabled = true;
//             } else {
//                 ataqueJugador.push('PLANTA');
//                 boton.disabled = true;
//             }
//             ataqueAleatorioEnemigo();
//         })
//     })
// }

// function seleccionarPersonajeEnemigo() {
//     let personajeAleatorio = aleatorio(0, argenmones.length - 1);

//     spanPersonajeEnemigo.innerHTML = argenmones[personajeAleatorio].nombre;
//     ataquesArgenmonEnemigo = argenmones[personajeAleatorio].ataques;
//     secuenciaAtaque()
// }


// function ataqueFuego() {
//     ataqueJugador = 'FUEGO';
//     ataqueAleatorioEnemigo()
// }
// function ataquePlanta() {
//     ataqueJugador = 'PLANTA';
//     ataqueAleatorioEnemigo()
// }
// function ataqueAgua() {
//     ataqueJugador = 'AGUA';
//     ataqueAleatorioEnemigo()
// }


// function aleatorio(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function ataqueAleatorioEnemigo() {
//     let ataqueAleatorio = aleatorio(0, ataquesArgenmonEnemigo.length - 1);

//     if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
//         ataqueEnemigo.push('FUEGO');
//     } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
//         ataqueEnemigo.push('PLANTA');
//     } else {
//         ataqueEnemigo.push('AGUA');
//     }
//     console.log(ataqueEnemigo)
//     iniciarPelea()
// }

// function iniciarPelea() {
//     if (ataqueJugador.length === 5) {
//         combate()
//     }
//     actualizarDatosJugador();
//     actualizarDatosEnemigo();
// }

// function iAmbosOponentes(jugador, enemigo) {
//     iAtaqueJugador = ataqueJugador[jugador];
//     iAtaqueEnemigo = ataqueEnemigo[enemigo];
// }

// function combate() {

//     for (let i = 0; i < ataqueJugador.length; i++) {
//         if (ataqueJugador[i] === ataqueEnemigo[i]) {
//             iAmbosOponentes(i, i);
//             crearMensaje('EMPATE');
//         } else if ((ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'PLANTA') || (ataqueJugador[i] === 'PLANTA' && ataqueEnemigo[i] === 'AGUA') || (ataqueJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO')) {
//             iAmbosOponentes(i, i);
//             crearMensaje('GANASTE');
//             victoriasJugador++
//             spanVictoriasJugador.innerHTML = victoriasJugador;
//         } else {
//             iAmbosOponentes(i, i);
//             crearMensaje('PERDISTE');
//             victoriasEnemigo++
//             spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
//         }
//     }

//     revisarVidas()
// }

function revisarVidas() {
    if (victoriasEnemigo == victoriasJugador) {
        crearMensajeResultado('Fue un empate');

    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeResultado('El Argenmón enemigo no puede continuar. GANASTE PAPÁ!!');
        victoriasAcumuladasJugador += 1
        spanVictoriasAcumuladasJugador.innerHTML = victoriasAcumuladasJugador;
    } else {
        crearMensajeResultado('Te dieron masa. Intenta de nuevo.')
        victoriasAcumuladasEnemigo += 1
        spanVictoriasAcumuladasEnemigo.innerHTML = victoriasAcumuladasEnemigo;
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = iAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = iAtaqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeResultado(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal;
    sectionReiniciar.style.display = "block";
}

function actualizarDatosJugador() {
    guardarDatosJugador();
}

function actualizarDatosEnemigo() {
    guardarDatosEnemigo();
}

function reiniciarJuego() {
    victoriasJugador = 0;
    victoriasEnemigo = 0;
    ataqueJugador = [];
    ataqueEnemigo = [];
    spanVictoriasJugador.innerHTML = victoriasJugador;
    spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
    ataquesDelJugador.innerHTML = "";
    ataquesDelEnemigo.innerHTML = "";

    botones.forEach((boton) => {
        boton.disabled = false;
    })
}

window.addEventListener("load", cargarJuego);
const playGame = document.getElementById('start');
const sectionSeleccionarPersonaje = document.getElementById('seleccionarPersonaje');
const sectionSeleccionarPersonaje2 = document.getElementById('seleccionarPersonaje2');
const sectionPantallaPrincipal = document.getElementById('pantallaPrincipal');
const sectionSeleccionarAtaque = document.getElementById('seleccionarAtaque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonPersonajeJugador = document.getElementById('btnPersonaje');
const botonPersonajeJugador2 = document.getElementById('btnPersonaje2');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorTarjetas2 = document.getElementById('contenedorTarjetas2');
const ataque1a = document.getElementById('ataque1a');
const ataque2a = document.getElementById('ataque2a');
const ataque3a = document.getElementById('ataque3a');
const ataque1b = document.getElementById('ataque1b');
const ataque2b = document.getElementById('ataque2b');
const ataque3b = document.getElementById('ataque3b');
const imgArgen1 = document.getElementById('imgArgen1');
const imgArgen2 = document.getElementById('imgArgen2');
const vol = document.getElementById('volumen');
const botonVolumen = document.getElementById('botonVolumen');
const menuVolumen = document.getElementById('menuVolumen');


let opcionDeArgenmones = '';
let inputFlamdor;
let inputDuñan;
let inputOrclish;
let inputFlamdor2;
let inputDuñan2;
let inputOrclish2;
let argenmonElegido;
let argenmonElegido2;
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
let jugadorTurno1;
let jugadorTurno2;
let botonesAtaqueJugadorTurno1;
let botonesAtaqueJugadorTurno2;
let resultadoDado = null;
let daño = 0;
let turnoEjecutado = false;

reproductor.volume = vol.value;

function cambiarVolumen(evt) {
    reproductor.volume = evt.target.value;
}

vol.addEventListener("change", cambiarVolumen);


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
                Swal.fire({
                    title: 'Error!',
                    html: `
                        <b>No se encontró el personaje</b>
                    `,
                    imageUrl: "./assets/pokerota.png",
                    imageWidth: 100,
                    imageAlt: "Pokebola rota",
                    confirmButtonText: 'Recargar',
                    confirmButtonColor: "#1d73c9",
                    allowOutsideClick: false
                });
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
        Swal.fire({
            title: 'Alto ahí entrenador!',
            html: `
                <b>El Jugador 1 no seleccionó su personaje</b>
            `,
            imageUrl: "./assets/pokerota.png",
            imageWidth: 100,
            imageAlt: "Pokebola rota",
            confirmButtonText: 'Entendido',
            confirmButtonColor: "#1d73c9",
            allowOutsideClick: false
        })
        volverASeleccionarPersonaje();
        return;
    }

    if (inputFlamdor2.checked) {
        nombreElegido2 = 'Flamdor';
    } else if (inputDuñan2.checked) {
        nombreElegido2 = 'Duñan';
    } else if (inputOrclish2.checked) {
        nombreElegido2 = 'Orclish';
    } else {
        Swal.fire({
            title: 'Alto ahí entrenador!',
            html: `
                <b>El Jugador 2 no seleccionó su personaje</b>
            `,
            padding: "-0.2em 1em 0",
            imageUrl: "./assets/pokerota.png",
            imageWidth: 100,
            imageAlt: "Pokebola rota",
            confirmButtonText: 'Entendido',
            confirmButtonColor: "#1d73c9",
            allowOutsideClick: false
        })
        volverASeleccionarPersonaje();
        return;
    }

    argenmonElegido = argenmones.find((argenmon) => argenmon.nombre === nombreElegido);
    argenmonElegido2 = argenmones.find((argenmon) => argenmon.nombre === nombreElegido2);

    document.getElementById('argenmonNombre1').textContent = 'Nombre: ' + argenmonElegido.nombre;
    document.getElementById('argenmonTipo1').textContent = 'Tipo: ' + argenmonElegido.tipo;
    document.getElementById('argenmonVida1').textContent = 'Vida: ' + argenmonElegido.vida;
    document.getElementById('imgArgen1').src = argenmonElegido.foto;

    document.getElementById('argenmonNombre2').textContent = 'Nombre: ' + argenmonElegido2.nombre;
    document.getElementById('argenmonTipo2').textContent = 'Tipo: ' + argenmonElegido2.tipo;
    document.getElementById('argenmonVida2').textContent = 'Vida: ' + argenmonElegido2.vida;
    document.getElementById('imgArgen2').src = argenmonElegido2.foto;

    document.getElementById('ataque1a').value = argenmonElegido.ataque1;
    document.getElementById('ataque2a').value = argenmonElegido.ataque2;
    document.getElementById('ataque3a').value = argenmonElegido.ataque3;

    document.getElementById('ataque1b').value = argenmonElegido2.ataque1;
    document.getElementById('ataque2b').value = argenmonElegido2.ataque2;
    document.getElementById('ataque3b').value = argenmonElegido2.ataque3;

    nombreElegido = argenmonElegido.nombre;
    tipoElegido = argenmonElegido.tipo;
    vidaElegida = argenmonElegido.vida;
    fotoElegida1 = argenmonElegido.foto;
    ataque1Elegido = argenmonElegido.ataque1;
    ataque2Elegido = argenmonElegido.ataque2;
    ataque3Elegido = argenmonElegido.ataque3;

    nombreElegido2 = argenmonElegido2.nombre;
    tipoElegido2 = argenmonElegido2.tipo;
    vidaElegida2 = argenmonElegido2.vida;
    fotoElegida2 = argenmonElegido2.foto;
    ataque1Elegido2 = argenmonElegido2.ataque1;
    ataque2Elegido2 = argenmonElegido2.ataque2;
    ataque3Elegido2 = argenmonElegido2.ataque3;

    document.getElementById('reproductor').src = "./assets/audio/Battle.mp3"
}

function volverASeleccionarPersonaje() {
    sectionSeleccionarPersonaje.style.display = 'flex';
    sectionSeleccionarPersonaje2.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'none';
}

document.querySelectorAll('#botonesPelea1 .btnAtaque').forEach(boton => {
    boton.disabled = true;
});

document.querySelectorAll('#botonesPelea2 .btnAtaque').forEach(boton => {
    boton.disabled = true;
});


function tirarDado() {
    let aleatorio = Math.floor(Math.random() * 6) + 1;

    document.getElementById("resultadoDado").innerHTML = aleatorio;

    resultadoDado = aleatorio;

    if (!turnoEjecutado) {
        turno();
        turnoEjecutado = true;
    }
}

function turno() {

    if (resultadoDado === null) {
        return;
    }

    if (resultadoDado >= 1 && resultadoDado <= 3) {
        jugadorTurno1 = 1;
        jugadorTurno2 = 2;
        botonesAtaqueJugadorTurno1 = document.querySelectorAll('#botonesPelea1 .btnAtaque');
        botonesAtaqueJugadorTurno2 = document.querySelectorAll('#botonesPelea2 .btnAtaque');
        document.getElementById('resultado').innerHTML = 'Turno del Jugador 1';
    } else {
        jugadorTurno1 = 2;
        jugadorTurno2 = 1;
        botonesAtaqueJugadorTurno1 = document.querySelectorAll('#botonesPelea2 .btnAtaque');
        botonesAtaqueJugadorTurno2 = document.querySelectorAll('#botonesPelea1 .btnAtaque');
        document.getElementById('resultado').innerHTML = 'Turno del Jugador 2';
    }

    botonesAtaqueJugadorTurno1.forEach(boton => {
        boton.disabled = false;
    });

    botonesAtaqueJugadorTurno2.forEach(boton => {
        boton.disabled = true;
    });

    return jugadorTurno1;
}

document.getElementById('tirarDado').addEventListener('click', tirarDado);

turno();

function calcularDaño(argenmonAtacante, argenmonDefensor) {
    const jugadorAtacante = argenmones.find((argenmon) => argenmon.nombre === argenmonAtacante);
    const jugadorDefensor = argenmones.find((argenmon) => argenmon.nombre === argenmonDefensor);

    const tipoAtacante = jugadorAtacante.tipo;
    const tipoDefensor = jugadorDefensor.tipo;

    if (
        (tipoAtacante === "Fuego" && tipoDefensor === "Planta") ||
        (tipoAtacante === "Planta" && tipoDefensor === "Agua") ||
        (tipoAtacante === "Agua" && tipoDefensor === "Fuego")
    ) {
        return daño += 5;
    } else if (
        (tipoAtacante === "Fuego" && tipoDefensor === "Agua") ||
        (tipoAtacante === "Planta" && tipoDefensor === "Fuego") ||
        (tipoAtacante === "Agua" && tipoDefensor === "Planta")
    ) {
        return daño -= 5;
    } else {
        return daño;
    }
}

function atacar1() {
    let aleatorio = Math.floor(Math.random() * 6) + 1;
    let contraataque;

    if (aleatorio == 1) {
        contraataque = 0;
        document.getElementById('resultado').innerHTML = 'Tu contrincante evadio el ataque.';
    } else if (aleatorio == 2 || aleatorio == 3) {
        contraataque = 0.5;
        document.getElementById('resultado').innerHTML = 'El Argenmon enemigo uso Defensa. Haces la mitad del daño.';
    } else {
        contraataque = 1;
        document.getElementById('resultado').innerHTML = 'Ataque exitoso.';
    }

    const ataqueFinal = calcularDaño(nombreElegido, nombreElegido2) * contraataque;

    vidaElegida2 -= Math.round(ataqueFinal);

    vidaElegida2 = (vidaElegida2 < 0) ? 0 : vidaElegida2;

    document.getElementById('argenmonVida2').textContent = 'Vida: ' + vidaElegida2;

    document.querySelectorAll('#botonesPelea1 .btnAtaque').forEach(boton => {
        boton.disabled = true;
    });
    document.querySelectorAll('#botonesPelea2 .btnAtaque').forEach(boton => {
        boton.disabled = false;
    });

    verificarGanador()
}

function atacar2() {
    let aleatorio = Math.floor(Math.random() * 6) + 1;
    let contraataque;

    if (aleatorio == 1) {
        contraataque = 0;
        document.getElementById('resultado').innerHTML = 'Tu contrincante evadio el ataque.';
    } else if (aleatorio == 2 || aleatorio == 3) {
        contraataque = 0.5;
        document.getElementById('resultado').innerHTML = 'El Argenmon enemigo uso Defensa. Haces la mitad del daño.';
    } else {
        contraataque = 1;
        document.getElementById('resultado').innerHTML = 'Ataque exitoso.';
    }

    const ataqueFinal = calcularDaño(nombreElegido2, nombreElegido) * contraataque;

    vidaElegida -= Math.round(ataqueFinal);

    vidaElegida = (vidaElegida < 0) ? 0 : vidaElegida;

    document.getElementById('argenmonVida1').textContent = 'Vida: ' + vidaElegida;

    document.querySelectorAll('#botonesPelea1 .btnAtaque').forEach(boton => {
        boton.disabled = false;
    });
    document.querySelectorAll('#botonesPelea2 .btnAtaque').forEach(boton => {
        boton.disabled = true;
    });

    verificarGanador()
}

function verificarGanador() {
    if (vidaElegida <= 0) {
        mostrarMensajeGanador(argenmonElegido2.nombre);
    } else if (vidaElegida2 <= 0) {
        mostrarMensajeGanador(argenmonElegido.nombre);
    }
}

function animarAtaque1() {
    gsap.to(imgArgen1, { x: 30, duration: 0.2, yoyo: true, repeat: 1 });
    gsap.to(imgArgen2, { opacity: 0.5, duration: 0.1, yoyo: true, repeat: 2, onComplete: () => gsap.to(imgArgen2, { opacity: 1 }) });
}

function animarAtaque2() {
    gsap.to(imgArgen2, { x: -30, duration: 0.2, yoyo: true, repeat: 1 });
    gsap.to(imgArgen1, { opacity: 0.5, duration: 0.1, yoyo: true, repeat: 2, onComplete: () => gsap.to(imgArgen1, { opacity: 1 }) });
}

function mostrarMensajeGanador(nombreGanador) {
    Swal.fire({
        title: '¡Felicidades!',
        html: `<b>${nombreGanador}</b> ha ganado la partida.`,
        imageUrl: 'https://www.eldiario.ec/wp-content/uploads/2022/11/ash_victoria_2_2-10-768x506.jpg',
        imageWidth: 230,
        imageAlt: 'Pokebola',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1d73c9',
        allowOutsideClick: false
    }).then(() => {
        location.reload();
    });

    document.getElementById('reproductor').src = './assets/audio/Victory.mp3';
}

function reproducirAudio() {
    let reproductor = document.getElementById("reproductor");
    reproductor.play();
}

ataque1a.addEventListener('click', () => {
    daño = 10;
    atacar1();
    animarAtaque1()
});

ataque2a.addEventListener('click', () => {
    daño = 20;
    atacar1();
    animarAtaque1()
});

ataque3a.addEventListener('click', () => {
    daño = 30;
    atacar1();
    animarAtaque1()
});

ataque1b.addEventListener('click', () => {
    daño = 10;
    atacar2();
    animarAtaque2()
});

ataque2b.addEventListener('click', () => {
    daño = 20;
    atacar2();
    animarAtaque2()
});

ataque3b.addEventListener('click', () => {
    daño = 30;
    atacar2();
    animarAtaque2()
});

window.addEventListener("load", function() {
    reproducirAudio();
        cargarJuego();
    });
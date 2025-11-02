const hoy = new Date(); // fecha actual
let añoObjetivo = hoy.getFullYear();

// Creamos la fecha del cumpleaños (30 de marzo)
let fechaObjetivo = new Date(añoObjetivo, 2, 30, 0, 0, 0); // marzo = mes 2

// Si ya pasó este año, se pone para el siguiente
if (fechaObjetivo < hoy) {
    añoObjetivo++;
    fechaObjetivo = new Date(añoObjetivo, 2, 30, 0, 0, 0);
}

// Obtenemos el tiempo en milisegundos
const cumple = fechaObjetivo.getTime();

// Elementos del DOM
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const mensajeEl = document.getElementById("mensaje");

function actualizarCuentaRegresiva() {
    const ahora = new Date().getTime();
    const distancia = cumple - ahora;

    if (distancia <= 0) {
        clearInterval(intervalo);
        mensajeEl.textContent = "🎉 ¡Feliz Cumpleaños!";
        daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "0";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Mostrar en pantalla
    daysEl.textContent = dias;
    hoursEl.textContent = horas.toString().padStart(2, '0');
    minutesEl.textContent = minutos.toString().padStart(2, '0');
    secondsEl.textContent = segundos.toString().padStart(2, '0');
}

const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();

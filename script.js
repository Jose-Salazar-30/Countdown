function proximaFechaObjetivo() {
  const ahora = new Date();
  const objetivoHoy = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate(),
    23, 15, 0 // hoy a las 11:15 PM
  );

  return objetivoHoy;
}

let cumple = proximaFechaObjetivo().getTime();

// Referencias DOM
const $days = document.getElementById("days");
const $hours = document.getElementById("hours");
const $minutes = document.getElementById("minutes");
const $seconds = document.getElementById("seconds");
const $mensaje = document.getElementById("mensaje");

// Confeti 🎊
function lanzarConfeti(duracionMs = 5000) {
  const fin = Date.now() + duracionMs;
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
    if (Date.now() < fin) requestAnimationFrame(frame);
  })();
}

// Animación sutil cada tick
function flashNums() {
  document.querySelectorAll(".numbers").forEach(el => {
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  });
}

// Loop
function tick() {
  const ahora = Date.now();
  const diff = cumple - ahora;

  if (diff <= 0) {
    $days.textContent = "0";
    $hours.textContent = "00";
    $minutes.textContent = "00";
    $seconds.textContent = "00";
    $mensaje.textContent = "🎉 Feliz cumpleaños, mi Karlita, mi Chokis hermosa 🎂💖 Hoy celebro la dicha tan grande de tenerte en mi vida...";
    lanzarConfeti(6000);
    clearInterval(intervalo);
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  $days.textContent = d;
  $hours.textContent = String(h).padStart(2, "0");
  $minutes.textContent = String(m).padStart(2, "0");
  $seconds.textContent = String(s).padStart(2, "0");
  $mensaje.textContent = "";
  flashNums();
}

const intervalo = setInterval(tick, 1000);
tick();
function proximaFechaObjetivo() {
  const ahora = new Date();
  const year = ahora.getFullYear();
  const objetivoEsteAño = new Date(year, 2, 30, 0, 0, 0); // 30 marzo 00:00:00
  // Si ya pasó el 30 de marzo de este año, vamos al próximo
  return (ahora > objetivoEsteAño)
    ? new Date(year + 1, 2, 30, 0, 0, 0)
    : objetivoEsteAño;
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
    // reflow para reiniciar la animación
    void el.offsetWidth;
    el.classList.add("flash");
  });
}

// Loop
function tick() {
  const ahora = Date.now();
  const diff = cumple - ahora;

  if (diff <= 0) {
    // Llegó el día 🎉
    $days.textContent = "0";
    $hours.textContent = "00";
    $minutes.textContent = "00";
    $seconds.textContent = "00";
    $mensaje.textContent = "🎉 Feliz cumpleaños, mi Karlita, mi Chokis hermosa 🎂💖 Hoy celebro la dicha tan grande de tenerte en mi vida, porque no solo cumples un año más, sino que también haces más bonito mi mundo con tu sonrisa, tu ternura y esa manera tan especial que tienes de alegrar mi corazón. Quiero que este día esté lleno de amor, abrazos, momentos felices y muchas razones para sonreír, porque te mereces eso y muchísimo más. Gracias por ser esa personita tan maravillosa, dulce y especial para mí. Eres alguien que quiero cuidar, valorar y hacer feliz siempre. Deseo de todo corazón que cada uno de tus sueños se vaya cumpliendo y que nunca te falten motivos para brillar, porque tú eres una niña preciosa, única e inolvidable. Feliz cumpleaños, mi Karlita y mi Chokis. Te quiero muchísimo y hoy más que nunca deseo que tu día sea tan hermoso como tú.💖";
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
  $mensaje.textContent = ""; // vacío hasta el día
  flashNums();
}

const intervalo = setInterval(tick, 1000);
tick(); // primer render inmediato

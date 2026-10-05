// ======================
// ELEMENT
// ======================
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

// =======================
// WEDDING DATE
// =======================
const weddingDate = new Date(2026, 9, 25, 16, 0, 0).getTime();

// =======================
// START COUNT 
// =======================
function startCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  
  // JIKA SUDAH TERLEWAT
  if (distance <= 0) {
    daysElement.textContent = "000";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    clearInterval(countdownInterval);
    return;
  }

  // HITUNG WAKTU
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % ( 1000 * 60 * 60)) / (1000 *60)
  );

  const seconds = Math.floor(
    (distance % (1000 *60)) / 1000
  );

  // TAMPILKAN KE HTML
  daysElement.textContent = String(days).padStart(3, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

// ===============================
// INTERVAL 
// ===============================
startCountdown();
const countdownInterval = setInterval(startCountdown, 1000);
// --- LECTEUR AUDIO ---
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const btnIcon = musicBtn.querySelector('.icon');
const btnText = musicBtn.querySelector('.btn-text');

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play().then(() => {
            btnIcon.innerText = "⏸";
            btnText.innerText = "PAUSE PHONK";
        }).catch(err => {
            console.log("Lecture bloquée. L'utilisateur doit interagir avec la page d'abord.", err);
        });
    } else {
        music.pause();
        btnIcon.innerText = "▶";
        btnText.innerText = "PLAY PHONK";
    }
});

// --- TIMER DE 24 JOURS ---
// On stocke la date de fin dans le navigateur du visiteur pour éviter que le chrono se réinitialise à chaque actualisation.
let targetDate = localStorage.getItem('countdownTarget');

if (!targetDate) {
    const twentyFourDaysInMs = 24 * 24 * 60 * 60 * 1000;
    targetDate = new Date().getTime() + twentyFourDaysInMs;
    localStorage.setItem('countdownTarget', targetDate);
}

const countdownElement = document.getElementById('countdown');

const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        countdownElement.innerText = "OUT NOW !";
        clearInterval(timerInterval);
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElement.innerText = `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
};

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

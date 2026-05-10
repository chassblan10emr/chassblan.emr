// --- LECTEUR AUDIO PHONK ---
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const btnIcon = musicBtn.querySelector('.icon');
const btnText = musicBtn.querySelector('.btn-text');

// Force le chargement de l'audio dès le départ
music.load();

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        // Option de secours au cas où le navigateur bloque
        music.play()
            .then(() => {
                btnIcon.innerText = "⏸";
                btnText.innerText = "PAUSE PHONK";
            })
            .catch(err => {
                console.log("Erreur de lecture : ", err);
                alert("Cliquez une deuxième fois pour forcer la lecture !");
            });
    } else {
        music.pause();
        btnIcon.innerText = "▶";
        btnText.innerText = "PLAY PHONK";
    }
});

// --- TIMER DE 24 JOURS ---
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

// --- CONFIGURATION LECTEUR YOUTUBE INVISIBLE ---
let player;
const musicBtn = document.getElementById('music-btn');
const btnIcon = musicBtn.querySelector('.icon');
const btnText = musicBtn.querySelector('.btn-text');
let isPlaying = false;

// Cette fonction est appelée automatiquement par l'API YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'tAcnQYvPl1s', // L'ID de ta vidéo "MONTAGEM ELDER"
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'tAcnQYvPl1s' // Obligatoire pour faire tourner en boucle
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Le lecteur est prêt, on active le bouton
    musicBtn.style.opacity = "1";
    musicBtn.style.pointerEvents = "auto";
}

musicBtn.addEventListener('click', () => {
    if (!player) return;

    if (!isPlaying) {
        player.playVideo();
        btnIcon.innerText = "⏸";
        btnText.innerText = "PAUSE PHONK";
        isPlaying = true;
    } else {
        player.pauseVideo();
        btnIcon.innerText = "▶";
        btnText.innerText = "PLAY PHONK";
        isPlaying = false;
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

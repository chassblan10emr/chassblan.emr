// --- CONFIGURATION LECTEUR YOUTUBE HORS-ÉCRAN ---
let player;
const musicBtn = document.getElementById('music-btn');
const btnIcon = musicBtn.querySelector('.icon');
const btnText = musicBtn.querySelector('.btn-text');
const equalizer = document.getElementById('equalizer');
const glowBg = document.getElementById('glow-bg');
let isPlaying = false;

// Appelé automatiquement par l'API YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '200',
        width: '200',
        videoId: 'tAcnQYvPl1s', // "MONTAGEM ELDER"
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'rel': 0,
            'modestbranding': 1,
            'loop': 1,
            'playlist': 'tAcnQYvPl1s' 
        }
    });
}

musicBtn.addEventListener('click', () => {
    if (!player || typeof player.playVideo !== 'function') {
        alert("Chargement du Phonk en cours... Réessayez dans 2 secondes.");
        return;
    }

    if (!isPlaying) {
        player.playVideo();
        btnIcon.innerText = "⏸";
        btnText.innerText = "PAUSE PHONK";
        
        // Active les animations visuelles !
        equalizer.classList.add('active');
        glowBg.classList.add('bass-active');
        
        isPlaying = true;
    } else {
        player.pauseVideo();
        btnIcon.innerText = "▶";
        btnText.innerText = "PLAY PHONK";
        
        // Désactive les animations visuelles
        equalizer.classList.remove('active');
        glowBg.classList.remove('bass-active');
        
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

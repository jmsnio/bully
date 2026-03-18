const songs = [
  { title: "PREACHER MAN", src: "music/bully-preacher-man.mp3" },
  { title: "BEAUTY AND THE BEAST", src: "music/bully-beauty-and-the-beast.mp3" },
  { title: "LAST BREATH", src: "music/bully-last-breath.mp3" },
  { title: "WHITE LINES", src: "music/bully-white-lines.mp3" },
  { title: "I CAN'T WAIT", src: "music/bully-i-cant-wait.mp3" },
  { title: "BULLY", src: "music/bully-bully.mp3" },
  { title: "ALL THE LOVE", src: "music/bully-all-the-love.mp3" },
  { title: "THIS ONE HERE", src: "music/bully-this-one-here.mp3" },
  { title: "HIGHS AND LOWS", src: "music/bully-highs-and-lows.mp3" },
  { title: "MISSION CONTROL", src: "music/bully-mission-control.mp3" },
  { title: "CIRCLES", src: "music/bully-circles.mp3" },
  { title: "DAMN", src: "music/bully-damn.mp3" },
  { title: "LOSING YOUR MIND", src: "music/bully-losing-your-mind.mp3" }
];

let currentSong = 0;
let isUpdating = false;

const audio = document.getElementById("audio");
const playlist = document.getElementById("playlist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("playBtn");
const titleDisplay = document.getElementById("title");

function loadSongs() {
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("song");
    div.innerText = (index + 1) + ". " + song.title;

    div.onclick = () => {
      currentSong = index;
      playSong();
    };

    playlist.appendChild(div);
  });
}

function updateActiveSong() {
  const allSongs = document.querySelectorAll(".song");
  allSongs.forEach(s => s.classList.remove("active"));
  allSongs[currentSong].classList.add("active");
}

function playSong() {
  const song = songs[currentSong];

  audio.src = song.src;
  audio.currentTime = 0;
  progress.value = 0;

  audio.play();

  titleDisplay.innerText = song.title;
  playBtn.innerText = "⏸";

  updateActiveSong();

  isUpdating = false;
  startProgressLoop();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
    startProgressLoop();
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  playSong();
}

/* AUTO NEXT */
audio.addEventListener("ended", nextSong);

/* SMOOTH PROGRESS */
function startProgressLoop() {
  if (isUpdating) return;
  isUpdating = true;

  function update() {
    if (!audio.paused && audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;

      document.getElementById("current").innerText = formatTime(audio.currentTime);
      document.getElementById("duration").innerText = formatTime(audio.duration);
    }
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* SEEK */
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* VOLUME */
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}

loadSongs();
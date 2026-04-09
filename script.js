const songs = [
  { title: "KING", src: "music/king.mp3" },
  { title: "THIS A MUST", src: "music/this-a-must.mp3" },
  { title: "FATHER (feat. Travis Scott)", src: "music/father.mp3" },
  { title: "ALL THE LOVE (feat. Andre Troutman)", src: "music/all-the-love.mp3" },
  { title: "PUNCH DRUNK", src: "music/punch-drunk.mp3" },
  { title: "WHATEVER WORKS", src: "music/whatever-works.mp3" },
  { title: "MAMA'S FAVORITE", src: "music/mamas-favorite.mp3" },
  { title: "SISTERS AND BROTHERS", src: "music/sisters-and-brothers.mp3" },
  { title: "BULLY (feat. CeeLo Green)", src: "music/bully.mp3" },

  { title: "HIGHS AND LOWS", src: "music/highs-and-lows.mp3" },
  { title: "I CAN'T WAIT", src: "music/i-cant-wait.mp3" },
  { title: "WHITE LINES (feat. Andre Troutman)", src: "music/white-lines.mp3" },
  { title: "CIRCLES", src: "music/circles.mp3" },
  { title: "PREACHER MAN", src: "music/preacher-man.mp3" },
  { title: "BEAUTY AND THE BEAST", src: "music/beauty-and-the-beast.mp3" },
  { title: "DAMN", src: "music/damn.mp3" },
  { title: "LAST BREATH (feat. Peso Pluma)", src: "music/last-breath.mp3" },
  { title: "THIS ONE HERE", src: "music/this-one-here.mp3" }
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

audio.addEventListener("ended", nextSong);

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

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

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

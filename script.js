const songs = [
  { title: "KING", src: "music/KING_spotdown.org.mp3" },
  { title: "THIS A MUST", src: "music/THIS A MUST_spotdown.org.mp3" },
  { title: "FATHER (feat. Travis Scott)", src: "music/FATHER (feat. Travis Scott)_spotdown.org.mp3" },
  { title: "ALL THE LOVE (feat. Andre Troutman)", src: "music/ALL THE LOVE (feat. Andre Troutman)_spotdown.org.mp3" },
  { title: "PUNCH DRUNK", src: "music/PUNCH DRUNK_spotdown.org.mp3" },
  { title: "WHATEVER WORKS", src: "music/WHATEVER WORKS_spotdown.org.mp3" },
  { title: "MAMA'S FAVORITE", src: "music/MAMA’S FAVORITE_spotdown.org.mp3" },
  { title: "SISTERS AND BROTHERS", src: "music/SISTERS AND BROTHERS_spotdown.org.mp3" },
  { title: "BULLY (feat. CeeLo Green)", src: "music/BULLY (feat. CeeLo Green)_spotdown.org.mp3" },

  { title: "HIGHS AND LOWS", src: "music/HIGHS AND LOWS_spotdown.org.mp3" },
  { title: "I CAN'T WAIT", src: "music/I CAN’T WAIT_spotdown.org.mp3" },
  { title: "WHITE LINES (feat. Andre Troutman)", src: "music/WHITE LINES (feat. Andre Troutman)_spotdown.org.mp3" },
  { title: "CIRCLES", src: "music/CIRCLES.mp3" },
  { title: "PREACHER MAN", src: "music/PREACHER MAN.mp3" },
  { title: "BEAUTY AND THE BEAST", src: "music/BEAUTY AND THE BEAST.mp3" },
  { title: "DAMN", src: "music/DAMN.mp3" },
  { title: "LAST BREATH (feat. Peso Pluma)", src: "music/LAST BREATH (feat. Peso Pluma)_spotdown.org.mp3" },
  { title: "THIS ONE HERE", src: "music/THIS ONE HERE_spotdown.org.mp3" }
];


let currentSong = 0;
let isUpdating = false;

const audio = document.getElementById("audio");
const playlist = document.getElementById("playlist");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");
const playBtn2 = document.getElementById("playBtn2");
const titleDisplay = document.getElementById("title");
const fullscreenTitle = document.getElementById("fullscreenTitle");
const fullscreenPlayer = document.getElementById("fullscreenPlayer");

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
  document.querySelectorAll(".song").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".song")[currentSong].classList.add("active");
}

function playSong() {
  const song = songs[currentSong];

  audio.src = song.src;
  audio.play();

  titleDisplay.innerText = song.title + " ⬆";
  fullscreenTitle.innerText = song.title;

  playBtn.innerText = "⏸";
  playBtn2.innerText = "⏸";

  updateActiveSong();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
    playBtn2.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
    playBtn2.innerText = "▶";
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

/* FULLSCREEN */
function openFullscreen() {
  fullscreenPlayer.style.display = "flex";
}

function closeFullscreen() {
  fullscreenPlayer.style.display = "none";
}

loadSongs();

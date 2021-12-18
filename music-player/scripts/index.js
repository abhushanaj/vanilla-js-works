// List of songs ( credit to Jacinto from zero to mastery)
const songs = [
  {
    name: '1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: '2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: '3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: '4',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

/* Get the DOM Elements */
const music = document.querySelector('#music');

/* Music Details */
const musicImage = document.querySelector('#music-image');
const musicTitle = document.querySelector('#music-title');
const musicAuthor = document.querySelector('#music-author');

/* Music Progress */
const progressBarContainer = document.querySelector('#progress-bar-container');
const progressBar = document.querySelector('#progress-bar');

/* Music Controls */
const prevBtn = document.querySelector('#prev-btn');
const playPauseBtn = document.querySelector('#play-pause-btn');
const nextBtn = document.querySelector('#next-btn');

/* Track if sonf is playing or not */
let isPlaying = false;
let currentSongIndex = generateRandomNumberUpto(songs.length - 1);

/* Helper function to generate a random number upto n */
function generateRandomNumberUpto(n) {
  return Math.floor(Math.random() * n);
}

/* Helper function to load a song with index */
async function loadSongWithIndex(index) {
  // Get the song details
  const songDetails = songs[index];

  // Set the song details
  music.setAttribute('src', `/audio/${songDetails.name}.mp3`);
  musicImage.setAttribute('src', `/images/${songDetails.name}.jpg`);
  musicTitle.textContent = songDetails.displayName;
  musicAuthor.textContent = songDetails.artist;
}

/* Helper function to play song */
async function playSong() {
  isPlaying = true;
  playPauseBtn.setAttribute('src', './images/pauseBtn.svg');
  playPauseBtn.setAttribute('title', 'Pause track');
  music.play();
}

/* Helper function to pause song */
async function pauseSong() {
  isPlaying = false;
  playPauseBtn.setAttribute('src', './images/playBtn.svg');
  playPauseBtn.setAttribute('title', 'Play track');
  music.pause();
}

/* Helper function to play next song */
async function nextSong() {
  currentSongIndex++;
  await pauseSong();

  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  await loadSongWithIndex(currentSongIndex);
  await playSong();
}

/* Helper function to play previous song */
async function prevSong() {
  currentSongIndex--;
  await pauseSong();

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  await loadSongWithIndex(currentSongIndex);
  await playSong();
}

// On load
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

loadSongWithIndex(currentSongIndex);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
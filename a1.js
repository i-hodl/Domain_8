const BACKGROUND_FOLDER = 'background';
const FOREGROUND_FOLDER = 'foreground';
const BASE_FOLDER = 'base';
const EXTRACTIONS_FOLDER = 'extractions';

let backgroundIndex = 1;
let foregroundIndex = 1;
let baseIndex = 1;
let extractionsIndex = 1;

const updatesPerDay = 8;
const updateDuration = 24 * 60 * 60 * 1000 / updatesPerDay;

const base = document.getElementById('base');
const background = document.getElementById('background');
const foreground = document.getElementById('foreground');
const backgroundVideo = document.getElementById('background-video');

function getCurrentUpdateIndex(date) {
  const msSinceEpoch = date.getTime();
  return Math.floor(msSinceEpoch / updateDuration) % updatesPerDay;
}

function getIntervalDuration(currentDate) {
  const nextUpdateIndex = getCurrentUpdateIndex(currentDate) + 1;
  const nextUpdateTime = currentDate.getTime() + updateDuration;
  const nextUpdateDate = new Date(nextUpdateTime);
  return nextUpdateDate - currentDate;
}

async function loadImage(folder, index, imgElement) {
  if (folder === BASE_FOLDER && index === 'Moonlight_Magic') {
    const pngExists = await checkFileExists(`${folder}/Moonlight_Magic.png`);
    if (pngExists) {
      imgElement.src = `${folder}/Moonlight_Magic.png`;
      return;
    }
  }

  const file = `${folder}/${index}`;
  const pngExists = await checkFileExists(`${file}.png`);

  if (pngExists) {
    imgElement.src = `${file}.png`;
  }
}

function checkFileExists(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);
    xhr.onload = function () {
      resolve(xhr.status >= 200 && xhr.status < 400);
    };
    xhr.onerror = function () {
      resolve(false);
    };
    xhr.send();
  });
}

function getBackgroundIndex(currentDate, currentUpdateIndex) {
  const dayOfMonth = currentDate.getDate();
  return (dayOfMonth + currentUpdateIndex) % backgroundIndex + 1;
}

function getForegroundIndex(currentDate, currentUpdateIndex) {
  const dayOfYear = Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24)) % 365;
  return (dayOfYear + currentUpdateIndex) % foregroundIndex + 1;
}

function getBaseImageIndex(currentUpdateIndex) {
  return currentUpdateIndex % baseIndex;
}

async function combineNFT() {
  const currentDate = new Date();

  const currentUpdateIndex = getCurrentUpdateIndex(currentDate);
  const backgroundIndex = getBackgroundIndex(currentDate, currentUpdateIndex);
  const foregroundIndex = getForegroundIndex(currentDate, currentUpdateIndex);

  if (currentUpdateIndex === 0) {
    const base = document.getElementById('base');
    await loadImage('base', 'Moonlight_Magic', base);
    base.style.display = 'block';
    const background = document.getElementById('background');
    background.src = '';
    background.style.display = 'none';
    const foreground = document.getElementById('foreground');
    foreground.src = '';
    foreground.style.display = 'none';
  } else {
    const base = document.getElementById('base');
    base.src = '';
    base.style.display = 'none';
    const background = document.getElementById('background');
    await loadImage('background', backgroundIndex, background);
    background.style.display = 'block';
    const foreground = document.getElementById('foreground');
    await loadImage('foreground', foregroundIndex, foreground);
    foreground.style.display = 'block';
  }

  // Schedule the next update
  const intervalDuration = getIntervalDuration(currentDate);
  setTimeout(combineNFT, intervalDuration);
}

window.onload = () => {
  combineNFT();

  // Add event listener for manual updates
  const manualUpdateBtn = document.getElementById('manual-update-btn');
  manualUpdateBtn.addEventListener('click', combineNFT);
};


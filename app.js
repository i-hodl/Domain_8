const BACKGROUND_FOLDER = 'background';
const FOREGROUND_FOLDER = 'foreground';
const BASE_FOLDER = 'base';
const EXTRACTIONS_FOLDER = 'extractions';

let backgroundIndex = 1;
let foregroundIndex = 1;
let baseIndex = 1;

function combineNFT() {
  const background = document.getElementById('background');
  const foreground = document.getElementById('foreground');
  const backgroundVideo = document.getElementById('background-video');

  backgroundIndex = Math.floor(Math.random() * 9) + 1;
  foregroundIndex = Math.floor(Math.random() * 6) + 1;

  const backgroundSrc = `${BACKGROUND_FOLDER}/${backgroundIndex}`;
  const foregroundSrc = `${FOREGROUND_FOLDER}/${foregroundIndex}.png`;

  checkFileExists(`${backgroundSrc}.mov`)
    .then(() => {
      backgroundVideo.src = `${backgroundSrc}.mov`;
      backgroundVideo.style.display = 'block';
      background.style.display = 'none';
    })
    .catch(() => {
      background.src = `${backgroundSrc}.png`;
      background.style.display = 'block';
      backgroundVideo.style.display = 'none';
    });

  const useExtractionImage = Math.random() < 0.1;

  if (useExtractionImage) {
    const extractionIndex = Math.floor(Math.random() * 2) + 1;
    const extractionSrc = `${EXTRACTIONS_FOLDER}/${extractionIndex}.png`;
    foreground.src = extractionSrc;
  } else {
    foreground.src = foregroundSrc;
    foregroundIndex = (foregroundIndex % 7) + 1;
  }
}

function checkFileExists(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject();
      }
    };
    xhr.send();
  });
}

const manualUpdateBtn = document.getElementById('manual-update-btn');
manualUpdateBtn.addEventListener('click', combineNFT);

const AUTO_UPDATE_INTERVAL = 500000; // 5000 milliseconds = 5 seconds
setInterval(combineNFT, AUTO_UPDATE_INTERVAL);

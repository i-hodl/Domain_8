const BACKGROUND_FOLDER = 'background';
const FOREGROUND_FOLDER = 'foreground';
const BASE_FOLDER = 'base';

let backgroundIndex = 1;
let foregroundIndex = 1;
let baseIndex = 1;

function updateNFT() {
  const currentDate = new Date();

  const background = document.getElementById('background');
  const foreground = document.getElementById('foreground');

  const backgroundSrc = `${BACKGROUND_FOLDER}/${backgroundIndex}.png`;
  const foregroundSrc = `${FOREGROUND_FOLDER}/${foregroundIndex}.png`;

  const useBaseImage = Math.random() < 0.1;
  if (useBaseImage) {
    const baseSrc = `${BASE_FOLDER}/base_${baseIndex}.png`;
    if (Math.random() < 0.5) {
      background.src = baseSrc;
    } else {
      foreground.src = baseSrc;
    }
  }

  background.src = backgroundSrc;
  foreground.src = foregroundSrc;

  foregroundIndex = (foregroundIndex % 3) + 1;
  backgroundIndex = (backgroundIndex % 3) + 1;
  baseIndex = (baseIndex % 18) + 1;
}

const manualUpdateBtn = document.getElementById('manual-update-btn');
manualUpdateBtn.addEventListener('click', updateNFT);


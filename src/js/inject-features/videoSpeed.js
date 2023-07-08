const videoControlBtn = document.createElement('button');
videoControlBtn.classList.add('config-btn', 'display-flex');

const videoControlBtnIcon = document.createElement('i');
videoControlBtnIcon.classList.add('fa-solid', 'fa-gauge', 'icon');

const videoControlBtnTooltip = document.createElement('div');
videoControlBtnTooltip.textContent += 'Click to open speed control bar.';
videoControlBtnTooltip.classList.add('tooltip', 'video-speed-btn-tooltip', 'hidden-element');

const sliderBarContainer = document.createElement('div');
sliderBarContainer.classList.add('slider-bar', 'hidden-element');

const minSpeed = document.createElement('span');
minSpeed.id = 'min-speed';

const maxSpeed = document.createElement('span');
maxSpeed.id = 'max-speed';

const currentSpeed = document.createElement('div');
currentSpeed.id = 'currentSpeed';

const sliderBar = document.createElement('input');
sliderBar.id = 'slider';
sliderBar.type = 'range';
sliderBar.step = '0.1';

sliderBar.addEventListener('input', (e) => {
  currentSpeed.innerHTML = `${e.target.value}X`;

  chrome.storage.local.set({ defaultSpeed: e.target.value });
});

videoControlBtn.addEventListener('mouseover', () => {
  videoControlBtnTooltip.classList.remove('hidden-element');
});

videoControlBtn.addEventListener('mouseleave', () => {
  videoControlBtnTooltip.classList.add('hidden-element');
});

videoControlBtn.addEventListener('click', () => {
  if (!sliderBarContainer.classList.contains('hidden-element')) {
    sliderBarContainer.classList.add('hidden-element');
  } else {
    sliderBarContainer.classList.remove('hidden-element');
  }
}, true);

// 呈現 bar 資訊
chrome.storage.local.get(['defaultSpeed', 'maxSpeed', 'minSpeed', 'sliderInterval'], (result) => {
  currentSpeed.innerHTML = `${result.defaultSpeed}X`;
  maxSpeed.innerHTML = `Max Speed : ${result.maxSpeed}`;
  minSpeed.innerHTML = `Min Speed : ${result.minSpeed}`;

  sliderBar.value = result.defaultSpeed;
  sliderBar.min = result.minSpeed;
  sliderBar.max = result.maxSpeed;
  sliderBar.step = result.sliderInterval;
});

sliderBarContainer.append(minSpeed, sliderBar, maxSpeed);

videoControlBtn.append(currentSpeed, videoControlBtnIcon, videoControlBtnTooltip, sliderBarContainer);

let videoDomElement = null;

const setVideoSpeed = (speed) => {
  if (videoDomElement) {
    videoDomElement.playbackRate = speed;
  }
};

const observeVideoSpeedDOM = () => {
  chrome.storage?.local?.get(['defaultSpeed'], ({ defaultSpeed }) => {
    setVideoSpeed(defaultSpeed);
  });

  if (!videoDomElement) {
    videoDomElement = document.getElementsByTagName('video')[0];
  }
};

chrome.storage?.onChanged?.addListener((changes) => {
  setVideoSpeed(changes.defaultSpeed.newValue);
});

export { videoControlBtn, observeVideoSpeedDOM };

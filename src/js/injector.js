// 用來操作、監聽 DOM 的檔案
import '../css/injector.scss';
import '../utils/fontawesomeJS/all.min';

let isAppendBtns = false;
let videoControlsBarDomElement = null;
let fullWebPageBtn = null;
let isFullWebPage = false;
let videoDomElement = null;
let videoHeightDomElements = null;
let fullWebPageBtnTooltip = null;

const observer = new MutationObserver(() => {
  chrome.storage?.local?.get(['defaultSpeed'], ({ defaultSpeed }) => {
    setVideoSpeed(defaultSpeed);
  });

  if (!videoControlsBarDomElement) {
    videoControlsBarDomElement = document.querySelector('[data-purpose="video-controls"]');
  }

  if (!videoDomElement) {
    videoDomElement = document.getElementsByTagName('video')[0];
  }

  if (videoControlsBarDomElement && !isAppendBtns) {
    addConfigBtns();
  }

  if (!videoHeightDomElements) {
    videoHeightDomElements = document.querySelectorAll('[class*="curriculum-item-view--scaled-height-limiter"]');
  }
});

// 載入時註冊一個 MutationObserver
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

chrome.storage?.onChanged?.addListener((changes) => {
  setVideoSpeed(changes.defaultSpeed.newValue);
});

const setVideoSpeed = (speed) => {
  if (videoDomElement) {
    videoDomElement.playbackRate = speed;
  }
};

const addConfigBtns = () => {
  fullWebPageBtn = document.createElement('button');
  fullWebPageBtn.classList.add('full-web-page-btn');
  const fullWebPageBtnIcon = document.createElement('i');
  fullWebPageBtnIcon.classList.add('fa-solid', 'fa-maximize', 'icon');

  fullWebPageBtnTooltip = document.createElement('div');
  fullWebPageBtnTooltip.textContent += 'Extend to full web page.';
  fullWebPageBtnTooltip.classList.add('tooltip', 'display-none');

  fullWebPageBtn.append(fullWebPageBtnIcon, fullWebPageBtnTooltip);

  const voiceControlBtn = videoControlsBarDomElement.children[7];
  videoControlsBarDomElement.insertBefore(fullWebPageBtn, voiceControlBtn);
  isAppendBtns = true;

  addFullWebPageBtnListener();
};

// 綁定占滿影片網頁按鈕的事件: 點擊後讓影片大小占滿網頁視窗、toolTip 提示
const addFullWebPageBtnListener = () => {
  fullWebPageBtn.addEventListener('click', () => {
    if (!isFullWebPage) {
      videoHeightDomElements[0].style = 'max-height: calc(100vh - 55px);';
      videoHeightDomElements[1].style = 'max-height: 100vh';
    } else {
      videoHeightDomElements[0].style = 'max-height: 80vh;';
      videoHeightDomElements[1].style = 'max-height: 80vh';
    }

    isFullWebPage = !isFullWebPage;
  });

  fullWebPageBtn.addEventListener('mouseover', () => {
    fullWebPageBtnTooltip.classList.remove('hidden-tooltip');
  });

  fullWebPageBtn.addEventListener('mouseout', () => {
    fullWebPageBtnTooltip.classList.add('hidden-tooltip');
  });
};

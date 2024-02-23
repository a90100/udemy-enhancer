// 用來操作、監聽 DOM 的檔案
import '../css/injector.scss';
import '../utils/fontawesomeJS/all.min';

import '../js/inject-features/videoSpeed';
import { videoControlBtn, observeVideoSpeedDOM } from '../js/inject-features/videoSpeed';
import { fullWebPageBtn, observeVideoHeightDomElements } from '../js/inject-features/videoFullWebPage';
import { pipBtn, getVideoDom } from '../js/inject-features/pictureInPicture';
import { screenShotBtn, screenShotTypeModel } from '../js/inject-features/screenShot';

let isAppendBtns = false;
let videoControlsBarDomElement = null;
let videoElementSrc = null;
let voiceControlBtn = null;

const observer = new MutationObserver(() => {
  observeVideoSpeedDOM();
  observeVideoHeightDomElements();

  const videoEle = document.querySelector('video');
  if (videoEle) {
    if (videoElementSrc !== videoEle.src) {
      videoElementSrc = videoEle.src;
      getVideoDom(videoEle);
      screenShotTypeModel.classList.add('display-none');

      isAppendBtns = false;
      videoControlsBarDomElement = null;
    }
  }

  if (!videoControlsBarDomElement) {
    videoControlsBarDomElement = document.querySelector('[data-purpose="video-controls"]');
    voiceControlBtn = videoControlsBarDomElement?.children[7];
  }

  if (videoControlsBarDomElement && !isAppendBtns) {
    addConfigBtns();
  }

  if (document.fullscreenElement) {
    screenShotBtn.style.cursor = 'not-allowed';
    screenShotBtn.disabled = true;
  } else {
    screenShotBtn.style.cursor = 'pointer';
    screenShotBtn.disabled = false;
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

const addConfigBtns = () => {
  videoControlsBarDomElement.insertBefore(videoControlBtn, voiceControlBtn);
  videoControlsBarDomElement.insertBefore(fullWebPageBtn, voiceControlBtn);
  videoControlsBarDomElement.insertBefore(pipBtn, voiceControlBtn);
  videoControlsBarDomElement.insertBefore(screenShotBtn, voiceControlBtn);

  isAppendBtns = true;
};

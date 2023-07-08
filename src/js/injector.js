// 用來操作、監聽 DOM 的檔案
import '../css/injector.scss';
import '../utils/fontawesomeJS/all.min';

import '../js/inject-features/videoSpeed';
import { videoControlBtn, observeVideoSpeedDOM } from '../js/inject-features/videoSpeed';

import {
  fullWebPageBtn,
  observeVideoHeightDomElements,
} from '../js/inject-features/videoFullWebPage';

let isAppendBtns = false;
let videoControlsBarDomElement = null;

const observer = new MutationObserver(() => {
  observeVideoSpeedDOM();
  observeVideoHeightDomElements();

  if (!videoControlsBarDomElement) {
    videoControlsBarDomElement = document.querySelector('[data-purpose="video-controls"]');
  }

  if (videoControlsBarDomElement && !isAppendBtns) {
    addConfigBtns();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

const addConfigBtns = () => {
  const voiceControlBtn = videoControlsBarDomElement.children[7];
  videoControlsBarDomElement.insertBefore(videoControlBtn, voiceControlBtn);
  videoControlsBarDomElement.insertBefore(fullWebPageBtn, voiceControlBtn);

  isAppendBtns = true;
  // addFullWebPageBtnListener();
};

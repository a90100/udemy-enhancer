// 用來操作、監聽 DOM 的檔案

const observer = new MutationObserver(() => {
	chrome.storage?.local?.get(['defaultSpeed'], ({ defaultSpeed }) => {
    setVideoSpeed(defaultSpeed);
  });
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
  [...document.getElementsByTagName('video')].forEach((video) => {
    video.playbackRate = speed;
  });
};

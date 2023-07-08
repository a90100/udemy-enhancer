const fullWebPageBtn = document.createElement('button');
fullWebPageBtn.classList.add('config-btn');

const fullWebPageBtnIcon = document.createElement('i');
fullWebPageBtnIcon.classList.add('fa-solid', 'fa-maximize', 'icon');

const fullWebPageBtnTooltip = document.createElement('div');
fullWebPageBtnTooltip.textContent += 'Extend to full web page.';
fullWebPageBtnTooltip.classList.add('tooltip', 'full-web-page-btn-tooltip', 'hidden-element');

fullWebPageBtn.append(fullWebPageBtnIcon, fullWebPageBtnTooltip);

let isFullWebPage = false;
let videoHeightDomElements = null;

const observeVideoHeightDomElements = () => {
  if (!videoHeightDomElements) {
    videoHeightDomElements = document.querySelectorAll('[class*="curriculum-item-view--scaled-height-limiter"]');
  }
};

// 綁定占滿影片網頁按鈕的事件: 點擊後讓影片大小占滿網頁視窗、toolTip 提示
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
  fullWebPageBtnTooltip.classList.remove('hidden-element');
});

fullWebPageBtn.addEventListener('mouseout', () => {
  fullWebPageBtnTooltip.classList.add('hidden-element');
});

export { fullWebPageBtn, observeVideoHeightDomElements };

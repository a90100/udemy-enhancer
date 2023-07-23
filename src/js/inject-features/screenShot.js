const screenShotBtn = document.createElement('button');
screenShotBtn.classList.add('config-btn');

const screenShotBtnIcon = document.createElement('i');
screenShotBtnIcon.classList.add('fa-solid', 'fa-camera-retro', 'icon');

const screenShotBtnTooltip = document.createElement('div');
screenShotBtnTooltip.textContent += 'Click and drag on your screen to screenshot. Press Crtl+C to cancel.';
screenShotBtnTooltip.classList.add('tooltip', 'screenshot-btn-tooltip', 'hidden-element');

screenShotBtn.append(screenShotBtnIcon, screenShotBtnTooltip);

screenShotBtn.addEventListener('mouseover', () => {
  screenShotBtnTooltip.classList.remove('hidden-element');
});

screenShotBtn.addEventListener('mouseout', () => {
  screenShotBtnTooltip.classList.add('hidden-element');
});
// -------------------------------------------------------

const rect = document.createElement('div');
rect.classList.add('selection-rect');
document.body.append(rect);

function captureImg(selectionRectangle, imgUrl) {
  const template = document.createElement('template');
  const canvas = document.createElement('canvas');
  document.body.appendChild(template);
  template.appendChild(canvas);

  const ratio = window.devicePixelRatio;

  const width = selectionRectangle.right - selectionRectangle.left;
  const height = selectionRectangle.bottom - selectionRectangle.top;

  // 設定 canvas 顯示的尺寸
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // 設定實際尺寸（縮放以考慮到額外的像素密度）
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);

  // 將坐標系經過 devicePixelRatio 調整而使用 css 像素
  canvas.getContext('2d').scale(ratio, ratio);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  const img = new Image();

  img.onload = () => {
    canvas
      .getContext('2d')
      .drawImage(img, selectionRectangle.left * ratio, selectionRectangle.top * ratio, width * ratio, height * ratio, 0, 0, width, height);

    const captureImgBase64Url = canvas.toDataURL('image/png');
    if (captureImgBase64Url === 'data:,') {
      alert('Please select video area.');
    } else {
      saveImg(captureImgBase64Url);
    }
  };

  img.src = imgUrl;
}

// 幫個位數時間補 0
function pad(n) {
  n = n + '';
  return n.length >= 2 ? n : `0${n}`;
}

function getFormatTime(nowTime) {
  return `${pad(nowTime.getFullYear())}-${pad(nowTime.getMonth() + 1)}-${pad(nowTime.getDate())} ${pad(nowTime.getHours())}-${pad(
    nowTime.getMinutes()
  )}-${pad(nowTime.getSeconds())}`;
}

function saveImg(url) {
  const link = document.createElement('a');

  link.download = `Udemy ScreenShot ${getFormatTime(new Date())}.jpeg`;
  link.href = url;
  link.click();
}

function drawSelectionRectangle(selection) {
  rect.style.left = `${selection.left}px`;
  rect.style.top = `${selection.top + window.scrollY}px`;
  rect.style.width = `${selection.right - selection.left}px`;
  rect.style.height = `${selection.bottom - selection.top}px`;
}

function initEventHandlers(base64Url) {
  let isMouseDown = false;
  let selectionRectangle = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  let imgUrl = base64Url;
  document.querySelector('body').style.cursor = 'crosshair';

  function reset() {
    isMouseDown = false;
    selectionRectangle = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
    drawSelectionRectangle(selectionRectangle);
    document.querySelector('body').style.cursor = 'default';

    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('keydown', cancelCapture);
  }

  function onMouseDown(e) {
    isMouseDown = true;
    selectionRectangle.left = e.clientX;
    selectionRectangle.top = e.clientY;
  }

  function onMouseMove(e) {
    if (!isMouseDown) {
      return;
    }
    selectionRectangle.right = e.clientX;
    selectionRectangle.bottom = e.clientY;
    drawSelectionRectangle(selectionRectangle);
  }

  function onMouseUp() {
    captureImg(selectionRectangle, imgUrl);
    reset();
  }

  function cancelCapture(e) {
    // ctrl + c 取消截取
    if (e.keyCode === 67 && e.ctrlKey) {
      reset();
    }
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  // 滑鼠右鍵取消截取圖片
  document.addEventListener('keydown', cancelCapture);
}

screenShotBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ message: 'capture' }, (base64Url) => {
    initEventHandlers(base64Url);
  });
});

export { screenShotBtn };

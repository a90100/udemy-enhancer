import '../css/option.scss';

document.addEventListener('DOMContentLoaded', function () {
  const defaultSpeed = document.getElementById('default-speed');
  const maxSpeed = document.getElementById('max-speed');
  const minSpeed = document.getElementById('min-speed');
  const sInterval = document.getElementById('sInterval');

  // 這裡只需要作呈現數字就好，監聽滑動由 injector.js 處理
  chrome.storage.local.get(['defaultSpeed', 'maxSpeed', 'minSpeed', 'sliderInterval'], (result) => {
    defaultSpeed.value = result.defaultSpeed;
    maxSpeed.value = result.maxSpeed;
    minSpeed.value = result.minSpeed;
    sInterval.value = result.sliderInterval;
  });
});

const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', () => {
  const defaultSpeed = document.getElementById('default-speed');
  const maxSpeed = document.getElementById('max-speed');
  const minSpeed = document.getElementById('min-speed');
  const sInterval = document.getElementById('sInterval');

  let maxSpeedValue = maxSpeed.value;
  let minSpeedValue = minSpeed.value;

  if (maxSpeedValue > 16) {
    maxSpeedValue = 16;
    maxSpeed.value = 16;
  }
  if (maxSpeedValue <= 0) {
    maxSpeedValue = 0.1;
    maxSpeed.value = 0.1;
  }
  if (minSpeedValue <= 0) {
    minSpeedValue = 0.1;
    minSpeed.value = 0.1;
  }

  chrome.storage.local.set({
    defaultSpeed: defaultSpeed.value,
    maxSpeed: maxSpeedValue,
    minSpeed: minSpeedValue,
    sliderInterval: sInterval.value,
  });

  alert('You stored the value successfully!');
});

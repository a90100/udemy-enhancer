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

  maxSpeed.addEventListener('input', (e) => {
    if (e.target.value > 16) e.target.value = 16;
    if (e.target.value <= 0) e.target.value = 0.1;
  });

  minSpeed.addEventListener('input', (e) => {
    if (e.target.value <= 0) e.target.value = 0.1;
  });
});

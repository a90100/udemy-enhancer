import '../css/popup.scss';

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById("slider");
  const output = document.getElementById("output");
  const maxSpeed = document.getElementById("max-speed");
  const minSpeed = document.getElementById("min-speed");
  
  slider.oninput = function() {
    output.innerHTML = `Current Speed : ${this.value}`;
  }

  // 呈現 bar 資訊
  chrome.storage.local.get(['defaultSpeed', 'maxSpeed', 'minSpeed', 'sliderInterval'], (result) => {
    output.innerHTML = `Current Speed : ${result.defaultSpeed}`;
    maxSpeed.innerHTML = `Max Speed : ${result.maxSpeed}`;
    minSpeed.innerHTML = `Min Speed : ${result.minSpeed}`;

    slider.min = result.minSpeed;
    slider.max = result.maxSpeed;
    slider.step = result.sliderInterval;
  })
});

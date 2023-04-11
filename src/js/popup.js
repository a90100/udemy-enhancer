import '../css/popup.scss';

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById("slider");
  const output = document.getElementById("output");
  output.innerHTML = slider.value;
  
  slider.oninput = function() {
    output.innerHTML = this.value;
  }

  // 這裡只需要作呈現數字就好，監聽滑動由 injector.js 處理
});

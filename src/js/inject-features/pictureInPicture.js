const pipBtn = document.createElement('button');
pipBtn.classList.add('config-btn');

const pipBtnIcon = document.createElement('i');
pipBtnIcon.classList.add('fa-solid', 'fa-clone', 'icon');

const pipBtnTooltip = document.createElement('div');
pipBtnTooltip.textContent += 'Picture-in-picture.';
pipBtnTooltip.classList.add('tooltip', 'pip-btn-tooltip', 'hidden-element');

// Check PIP API works in current browser.
if ('pictureInPictureEnabled' in document) {
  pipBtn.append(pipBtnIcon, pipBtnTooltip);
}

pipBtn.addEventListener('mouseover', () => {
  pipBtnTooltip.classList.remove('hidden-element');
});

pipBtn.addEventListener('mouseleave', () => {
  pipBtnTooltip.classList.add('hidden-element');
});

let videoDOMElement = null;
let isPIPOpen = false;

const getVideoDom = (video) => {
  videoDOMElement = video;

  videoDOMElement.addEventListener('enterpictureinpicture', () => {
    isPIPOpen = true;
  });

  videoDOMElement.addEventListener('leavepictureinpicture', () => {
    isPIPOpen = false;
  });
};

pipBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (!isPIPOpen) {
    videoDOMElement.requestPictureInPicture();
    isPIPOpen = true;
  } else {
    document.exitPictureInPicture();
    isPIPOpen = false;
  }
});

export { pipBtn, getVideoDom };

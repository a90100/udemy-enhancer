// 在 extension 背景運行的檔案
import '../css/option.scss';

chrome.runtime.onInstalled.addListener(async () => {
  chrome.action.disable();

  // remove existing rules so only ours are applied
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // add a custom rule
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // define the rule's conditions
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'https://www.udemy.com/' },
          }),
        ],
        // show the action when conditions are met
        actions: [new chrome.declarativeContent.ShowAction()],
      },
    ]);
  });
});

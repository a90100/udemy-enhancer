// 在 extension 背景運行的檔案

const checkingUrl = 'https://www.udemy.com';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
});

// onActivated: 瀏覽器 tab 切換時觸發
// 透過 chrome.tabs.get 和 tabId 去取得該 tab 的詳細資訊
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const isLoadingUdemyWebsite = tab.status === 'loading';
    if (tab.url.includes(checkingUrl) || (isLoadingUdemyWebsite && tab.pendingUrl.includes(checkingUrl))) {
      chrome.action.enable();
    } else {
      chrome.action.disable();
    }
  });
});

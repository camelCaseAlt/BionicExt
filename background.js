chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      files: ["utils/jquery.js"],
    })
    .then(() => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    });
});

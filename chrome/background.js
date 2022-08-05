// Ugh, really Google?
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./elongate.js"],
      })
      .then(() => {
        console.log("./elongate.js loaded");
      })
      .catch((err) => console.log(err));
  }
});

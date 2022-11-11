document
  .getElementById("revertButton")
  .addEventListener("click", onRevertPageClick);

function onRevertPageClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { title: "revertButton", body: true });
  });
}

document
  .getElementById("moveControlBar")
  .addEventListener("click", onDropBarClick);

function onDropBarClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { title: "dropBar", body: true });
  });
}

document.getElementById("switchInput").addEventListener("change", (e) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      title: "switchStatus",
      body: `${e.target.checked}`,
    });
  });
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.title === "switchStatus") {
    document.getElementById("switchInput").checked = request.body;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { title: "requestSwitchStatus" },
      function (response) {
        response = response.body;
        document.getElementById("switchInput").checked = response;
      }
    );
  });
});

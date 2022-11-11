document
  .getElementById("revertButton")
  .addEventListener("click", onRevertPageClick);

function onRevertPageClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { title: "revertButton", body: true },
      function (response) {
        console.log("popup message response to revert page: ", response);
      }
    );
  });
}

document
  .getElementById("moveControlBar")
  .addEventListener("click", onDropBarClick);

function onDropBarClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { title: "dropBar", body: true },
      function (response) {
        console.log("popup message response to drop bar: ", response);
      }
    );
  });
}

document.getElementById("switchInput").addEventListener("change", (e) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { title: "switchStatus", body: `${e.target.checked}` },
      function (response) {
        console.log("popup message response to switch status: ", response);
      }
    );
  });
});

chrome.runtime.onMessage.addListener((request, sender) => {
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
        console.log("request message response to switch status: ", response);
        response = response.body;
        document.getElementById("switchInput").checked = response;
      }
    );
  });
});

function moveVideoControl() {
  let controlBar;
  let controlDiv = document.querySelector(".ytp-chrome-bottom");
  let progressBar = document.querySelector(".ytp-progress-bar-container");
  let newParent = document.getElementById("primary-inner");
  let belowDiv = document.getElementById("below");
  if (controlDiv?.parentNode) {
    controlBar = controlDiv.parentNode.removeChild(controlDiv);
  }
  let newDiv = document.createElement("div");
  newDiv.id = "parentDivForControlBar";
  newDiv.style.display = "flex";
  newDiv.style.justifyContent = "center";
  newDiv.style.width = "100%";
  newDiv.style.bottom = "inherit";
  let ytAppContainer = document.querySelector("ytd-app");
  ytAppContainer.style.overflowX = "hidden";
  newParent.insertBefore(newDiv, belowDiv);
  newDiv.appendChild(controlBar);

  controlBar.style.width = "100%";
  controlBar.style.background = "rgb(101,116,132)";
  controlBar.style.bottom = "inherit";
  progressBar.style.bottom = "inherit";
  controlBar.style.minWidth = "100%";
  controlBar.classList.remove("ytp-chrome-bottom");
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: moveVideoControl,
    });
  }
});

chrome.webNavigation.onDOMContentLoaded.addListener((tabId) => {
  chrome.scripting.executeScript({
    target: { tabId: tabId.tabId },
    function: moveVideoControl,
  });
});

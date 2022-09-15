function moveVideoControl() {
  let controlBar;
  let videoPlayer = document.getElementById("player");
  let controlDiv = document.querySelector(".ytp-chrome-bottom");
  let newParent = document.getElementById("primary-inner");
  let belowDiv = document.getElementById("below");
  //newParent.append(...controlBar.childNodes);
  //controlBar.after(videoPlayer);
  //   controlBar.before(belowDiv);
  if (controlDiv.parentNode) {
    controlBar = controlDiv.parentNode.removeChild(controlDiv);
  }
  newParent.insertBefore(controlBar, belowDiv);
  controlBar.style.left = "12px";
  controlBar.style.background = "rgb(101,116,132)";
  controlBar.style.marginLeft = "12px";
  controlBar.style.bottom = "inherit";
  belowDiv.style.marginTop = "40px";
  console.log(videoPlayer);
  console.log(controlBar);
  console.log(newParent);
  console.log(belowDiv);
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: moveVideoControl,
    });
  }
});

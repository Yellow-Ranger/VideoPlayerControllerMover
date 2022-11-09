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
  let newDiv = document.createElement("div");
  newDiv.id = "parentDivForControlBar";
  newDiv.style.display = "flex";
  newDiv.style.justifyContent = "center";
  newDiv.style.width = "100%";
  newDiv.style.bottom = "inherit";
  // document.body.style.overflowX = "hidden";
  let ytAppContainer = document.querySelector("ytd-app");
  console.log(ytAppContainer);
  ytAppContainer.style.overflowX = "hidden";
  newParent.insertBefore(newDiv, belowDiv);
  newDiv.appendChild(controlBar);
  // newParent.insertBefore(controlBar, belowDiv);
  // controlBar.style.position = "absolute";
  // controlBar.style.transform = "translate(50%, 50%)";
  // controlBar.style.left = "12px";
  controlBar.style.width = "100%";
  controlBar.style.background = "rgb(101,116,132)";
  // controlBar.style.marginLeft = "12px";
  controlBar.style.bottom = "inherit";
  // controlBar.style.margin = "0 auto";
  controlBar.classList.remove("ytp-chrome-bottom");
  // belowDiv.style.marginTop = "40px";
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

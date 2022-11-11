let domLoaded;
let autoDrop;

window.onload = function () {
  domLoaded = false;
  autoDrop = localStorage.getItem("autoDrop");
  if (autoDrop) {
    autoDrop = autoDrop == "true";
  } else {
    localStorage.setItem("autoDrop", "false");
  }
  chrome.runtime.sendMessage({ title: "switchStatus", body: autoDrop });
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.title === "switchStatus") {
    autoDrop = request.body;
    localStorage.setItem("autoDrop", `${autoDrop}`);
    if (autoDrop) {
      moveVideoControl();
    }
  } else if (request.title === "dropBar") {
    moveVideoControl();
  } else if (request.title === "revertButton") {
    location.reload();
  } else if (request.title === "requestSwitchStatus") {
  } else {
    console.log("no case matched");
  }
});

function moveVideoControl() {
  if (!document.getElementById("dropBar")) {
    let controlBar;
    let controlDiv = document.querySelector(".ytp-chrome-bottom");
    let progressBar = document.querySelector(".ytp-progress-bar-container");
    let newParent = document.getElementById("primary-inner");
    let belowDiv = document.getElementById("below");

    controlBar = controlDiv.parentNode.removeChild(controlDiv);
    let newDiv = document.createElement("div");
    newDiv.id = "dropBar";
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
  } else {
    console.log("Bar already dropped or page not loaded");
  }
}

window.addEventListener("load", (event) => {
  if (autoDrop) {
    createObserver();
  }
});

document.addEventListener("visibilitychange", (e) => {
  if (document.visibilityState === "visible") {
    autoDrop = localStorage.getItem("autoDrop");
    if (autoDrop) {
      autoDrop = autoDrop == "true";
      if (autoDrop && domLoaded) {
        moveVideoControl();
      }
      chrome.runtime.sendMessage({ title: "switchStatus", body: autoDrop });
    } else {
      localStorage.setItem("autoDrop", "false");
      chrome.runtime.sendMessage({ title: "switchStatus", body: autoDrop });
    }
  }
});

function createObserver() {
  const observer = new MutationObserver((mutations, observer) => {
    if (document.getElementById("below")) {
      domLoaded = true;
      moveVideoControl();
      observer.disconnect();
    }
  });

  observer.observe(document, {
    subtree: true,
    attributes: true,
  });
}

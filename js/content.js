let domLoaded;
let autoDrop;

window.onload = function () {
  domLoaded = false;
  console.log("VPCM Content Script Loaded.");
  autoDrop = localStorage.getItem("autoDrop");
  if (autoDrop) {
    autoDrop = autoDrop == "true";
  } else {
    localStorage.setItem("autoDrop", "false");
  }
  chrome.runtime.sendMessage({ title: "switchStatus", body: autoDrop });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.title === "switchStatus") {
    sendResponse({ response: "switchStatus message recieved" });
    autoDrop = request.body;
    localStorage.setItem("autoDrop", `${autoDrop}`);
    if (autoDrop) {
      moveVideoControl();
    }
  } else if (request.title === "dropBar") {
    sendResponse({ response: "dropBar message recieved" });
    moveVideoControl();
  } else if (request.title === "revertButton") {
    location.reload();
    sendResponse({ response: "revert message recieved" });
  } else if (request.title === "requestSwitchStatus") {
    sendResponse({ body: autoDrop });
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

    console.log("controlDiv parentNode: ", controlDiv);
    controlBar = controlDiv.parentNode.removeChild(controlDiv);
    let newDiv = document.createElement("div");
    newDiv.id = "dropBar";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.width = "100%";
    newDiv.style.bottom = "inherit";
    let ytAppContainer = document.querySelector("ytd-app");
    ytAppContainer.style.overflowX = "hidden";
    console.log("newParent div: ", newParent);
    console.log("newDiv div: ", newDiv);
    console.log("belowDiv div: ", belowDiv);
    newParent.insertBefore(newDiv, belowDiv);
    newDiv.appendChild(controlBar);

    controlBar.style.width = "100%";
    controlBar.style.background = "rgb(101,116,132)";
    controlBar.style.bottom = "inherit";
    progressBar.style.bottom = "inherit";
    controlBar.style.minWidth = "100%";
    controlBar.classList.remove("ytp-chrome-bottom");
    // if (typeof retryDropInterval !== "undefined") {
    //   clearInterval(retryDropInterval);
    // }
  } else {
    console.log("Bar already dropped or page not loaded");
  }
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

window.addEventListener("load", (event) => {
  console.log("Dom loaded");
  if (autoDrop) {
    createObserver();
  }
  // if (document.visibilityState === "visible" && autoDrop && domLoaded) {
  //   console.log("loaded and visible");
  //   moveVideoControl();
  // }
});

document.addEventListener("visibilitychange", (e) => {
  console.log("Visibility change: ", e);
  if (document.visibilityState === "visible") {
    autoDrop = localStorage.getItem("autoDrop");
    if (autoDrop) {
      autoDrop = autoDrop == "true";
      if (autoDrop && domLoaded) {
        console.log("in second if statement");
        moveVideoControl();
      }
      chrome.runtime.sendMessage({ title: "switchStatus", body: autoDrop });
      // const retryDropInterval = setInterval(moveVideoControl, 1000);
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

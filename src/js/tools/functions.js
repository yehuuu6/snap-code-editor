const getCurrentTime = () => {
  const _time = new Date();
  let _hours = _time.getHours();
  let _minutes = _time.getMinutes();
  _hours = ("0" + _hours).slice(-2);
  _minutes = ("0" + _minutes).slice(-2);
  const _currentTime = _hours + ":" + _minutes;
  return _currentTime;
};
function getExtension(extension) {
  let aceExtension = "text";
  switch (extension.split(".")[1]) {
    case "js":
      aceExtension = "javascript";
      break;
    case "html":
      aceExtension = "html";
      break;
    case "css":
      aceExtension = "css";
      break;
    case "py":
      aceExtension = "python";
      break;
    case "json":
      aceExtension = "json";
      break;
    case "md":
      aceExtension = "markdown";
      break;
    default:
      aceExtension = "text";
      break;
  }
  return aceExtension;
}

function openNewFolder() {
  window.snapExplorerAPI.getFolders();
  router.innerHTML = '<div id="/">/root</div>';
  window.snapExplorerAPI.setExplorer((dirs, files) => {
    workspace.innerHTML = "";
    let fileTree = [];
    dirs.forEach((dir) => {
      const _dir = [dir, [0]];
      fileTree.push(_dir);
    });
    files.forEach((file) => {
      const _file = [file, [1]];
      fileTree.push(_file);
    });
    fileTree.forEach((subArray) => {
      let pathString = "";
      let explorerElement = document.createElement("div");
      let fileIcon = document.createElement("i");
      const name = subArray[0];
      const type = subArray[1];
      let shortName = name;
      if (shortName.length > 24) {
        shortName = shortName.substring(0, 24 - 3) + "...";
      }
      htmlName = " <span>" + shortName + "</span>";
      const result = fileIcon.outerHTML + htmlName;
      explorerElement.classList.add("workspace-item", "set-icon");
      explorerElement.innerHTML = result;
      if (type == 0) {
        explorerElement.addEventListener("click", () => {
          const newRoute = document.createElement("div");
          newRoute.id = name;
          newRoute.innerText = "/" + name;
          router.appendChild(newRoute);
          renderRouter();

          let previousSibling = newRoute.previousSibling;
          while (previousSibling !== null) {
            if (previousSibling.nodeType === Node.ELEMENT_NODE) {
              pathString = `${previousSibling.getAttribute(
                "id"
              )}/${pathString}`;
            }
            previousSibling = previousSibling.previousSibling;
          }
          window.snapExplorerAPI.getContent(pathString + name);
        });
      } else if (type == 1) {
        explorerElement.addEventListener("click", () => {
          let previousSibling = router.lastChild.previousSibling;
          let lastId = router.lastElementChild.getAttribute("id");
          while (previousSibling !== null) {
            if (previousSibling.nodeType === Node.ELEMENT_NODE) {
              pathString = `${previousSibling.getAttribute(
                "id"
              )}/${pathString}`;
            }
            previousSibling = previousSibling.previousSibling;
          }
          const __check = pathString + lastId + "/" + name;
          if (!isEdited) {
            window.snapEditorAPI.getCode(__check, name);
            previousSibling = "";
            lastId = "";
            pathString = "";
            if (openedFile !== __check) {
              const _setActiveFile = new message(
                "Info",
                "Now editing " + __check.replace(/\/\//g, ""),
                infoColor,
                null,
                getCurrentTime()
              );
              setLogger(_setActiveFile);
              window.snapMenuBarAPI.handleTitle((title, raw_title) => {
                document.querySelector("title").innerText = title;
                openedFile = raw_title;
                raw_title = raw_title.replace(/\/\//g, "");
                const currentFile = document.getElementById("current-file");
                currentFile.className = "tab-item set-icon";
                const span = currentFile.querySelector("span");
                const links = document.querySelectorAll(".set-icon");
                const result = "Current file: " + raw_title;
                span.innerText = result;
                setIcons(links);
              });
              window.snapEditorAPI.setCode((extension, file, name, lines) => {
                window.snapMenuBarAPI.setTitle(name, file);

                let aceExtension = getExtension(extension);
                createEditor(aceExtension, file, lines);
              });
            } else {
              // do nothing
            }
          } else {
            const _fileEditedBlockChange = new message(
              "Error",
              "Current file has been edited. Save or discard changes before opening another file.",
              errorColor,
              "shakeLogger",
              getCurrentTime()
            );
            setLogger(_fileEditedBlockChange);
          }
        });
      }

      workspace.appendChild(explorerElement);
      const links = document.querySelectorAll(".set-icon");
      setIcons(links);
    });
  });
}

function getPlaceholderClass(type) {
  let plColor;
  switch (type) {
    case "Info":
      plColor = "info-placeholder";
      break;
    case "Success":
      plColor = "success-placeholder";
      break;
    case "Warning":
      plColor = "warning-placeholder";
      break;
    case "Error":
      plColor = "error-placeholder";
      break;
    case "Default":
      plColor = "default-placeholder";
  }
  return plColor;
}
function clearCommandHistory() {
  logs = [];
  _history.innerHTML = "";
  setLogger(
    new message(
      "Info",
      "Logs history has been cleared!",
      infoColor,
      null,
      getCurrentTime()
    )
  );
}
function run() {
  _logger.focus();
  _logger.style.animation = "focusBorder 1s ease-in-out";
  setTimeout(() => {
    _logger.style.animation = "";
  }, 1000);
}

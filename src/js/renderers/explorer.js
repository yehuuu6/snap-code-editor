let openedFile = "";

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
            pathString = `${previousSibling.getAttribute("id")}/${pathString}`;
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
            pathString = `${previousSibling.getAttribute("id")}/${pathString}`;
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

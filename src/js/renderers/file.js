let editorSaveCheck;

const saveFile = (openedFile) => {
  if (openedFile !== null) {
    try {
      let editor = ace.edit(openedFile);
      if (editorSaveCheck !== editor.getValue()) {
        window.snapEditorAPI.saveFile(openedFile, editor.getValue());
        isEdited = true;
      } else {
        const _noChanges = new message(
          "Warning",
          "No changes detected.",
          warnColor,
          null,
          getCurrentTime()
        );
        setLogger(_noChanges);
      }
    } catch (err) {
      const _noFileOpened = new message(
        "Warning",
        "Can not find any active file.",
        warnColor,
        null,
        getCurrentTime()
      );
      setLogger(_noFileOpened);
    }
  } else {
    const _noFileOpened = new message(
      "Warning",
      "No file opened.",
      warnColor,
      null,
      getCurrentTime()
    );
    setLogger(_noFileOpened);
  }
};

const saveBtn = document.getElementById("save-file");
saveBtn.addEventListener("click", () => {
  saveFile(openedFile.replace(/\/\//g, ""));
});

window.snapEditorAPI.fileSaved((file) => {
  let trimFile = file.replace(/\/\//g, "");
  let editor = ace.edit(trimFile);
  editorSaveCheck = editor.getValue();
  isEdited = false;
  const _fileSaved = new message(
    "Success",
    "Your changes have been written to the disk. (" + trimFile + ")",
    successColor,
    null,
    getCurrentTime()
  );
  setLogger(_fileSaved);
});
window.snapEditorAPI.fileError((err) => {
  isEdited = true;
  const _fileError = new message(
    "Error",
    "Changes could not be written to the disk (" + err + ")",
    errorColor,
    "shakeLogger",
    getCurrentTime()
  );
  setLogger(_fileError);
});

// Add keybind to save file
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    saveFile(openedFile.replace(/\/\//g, ""));
  }
});
// Add keybind to run command
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "r") {
    e.preventDefault();
    run();
  }
});

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 1200,
    minHeight: 700,
    devTools: true,
    contextIsolation: true,
    nodeIntegration: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Handle Title
  ipc.handle("change-title", (event, title, raw_title) => {
    title = title + " - Snap Code Editor";
    event.sender.send("new-title", title, raw_title);
  });
  // Get Code
  ipc.handle("get-code", (event, file, name) => {
    extension = file.split(".")[1].toLowerCase();
    let lines = fs.readFileSync(path.join(__dirname, file), "utf8");
    event.sender.send("set-code", extension, file, name, lines);
  });
  // Filter Folder Content
  function filterContent(list, __path) {
    let result = [];
    let _dirs = [];
    let _files = [];
    list.forEach((file) => {
      if (fs.lstatSync(path.join(__dirname, __path, file)).isDirectory()) {
        _dirs.push(file);
      } else if (fs.lstatSync(path.join(__dirname, __path, file)).isFile()) {
        _files.push(file);
      }
    });
    result.push(_dirs);
    result.push(_files);
    return result;
  }
  // Handle Explorer

  fs.readdir(__dirname, (err, files) => {
    if (err) console.log(err);

    let info = filterContent(files, "");
    win.webContents.on("did-finish-load", () => {
      win.webContents.send("set-explorer", info[0], info[1]);
    });
  });
  // Get Folder Content

  ipc.on("get-folder-content", (event, name) => {
    fs.readdir(path.join(__dirname, name), (err, files) => {
      let info2 = filterContent(files, name);
      event.sender.send("set-explorer", info2[0], info2[1]);
    });
  });

  // Save File
  ipc.handle("save-file", (event, file, lines) => {
    fs.writeFile(path.join(__dirname, file), lines, (err) => {
      if (err) event.sender.send("file-error", err);
      else event.sender.send("file-saved", file);
    });
  });

  // Handle Window State

  ipc.on("change-window-state", (event, state) => {
    switch (state) {
      case 0:
        win.minimize();
        break;
      case 1:
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
        break;
      case 2:
        win.close();
        break;
    }
  });
  // Change maximize icon on maximize and minimize
  win.on("maximize", () => {
    win.webContents.send("change-icon", 1);
  });
  win.on("unmaximize", () => {
    win.webContents.send("change-icon", -1);
  });
  win.loadFile("src/index.html");
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

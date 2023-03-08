const { contextBridge, ipcRenderer } = require("electron");
const ipc = ipcRenderer;
contextBridge.exposeInMainWorld("snapMenuBarAPI", {
  // Renderer-to-main communication

  handleWindow: (state) => ipc.send("change-window-state", state),
  setTitle: (title, raw_title) => ipc.invoke("change-title", title, raw_title),

  // Main-to-renderer communication

  handleTitle: (callback) => {
    ipc.once("new-title", (event, title, raw_title) => {
      callback(title, raw_title);
    });
  },

  handleIcon: (status) => ipc.on("change-icon", status),
});
contextBridge.exposeInMainWorld("snapExplorerAPI", {
  // Renderer-to-main communication

  getContent: (name) => ipc.send("get-folder-content", name),
  getFolders: (name) => ipc.invoke("get-folders", name),

  // Main-to-renderer communication
  setExplorer: (callback) => {
    ipc.on("set-explorer", (event, dirs, files) => {
      callback(dirs, files);
    });
  },
});
contextBridge.exposeInMainWorld("snapEditorAPI", {
  // Renderer-to-main communication

  getCode: (file, name) => ipc.invoke("get-code", file, name),
  saveFile: (file, lines) => ipc.invoke("save-file", file, lines),

  // Main-to-renderer communication
  setCode: (callback) => {
    ipc.once("set-code", (event, extension, file, name, lines) => {
      callback(extension, file, name, lines);
    });
  },
  fileError: (callback) => {
    ipc.on("file-error", (event, err) => {
      callback(err);
    });
  },
  fileSaved: (callback) => {
    ipc.on("file-saved", (event, file) => {
      callback(file);
    });
  },
});

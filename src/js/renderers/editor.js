const container = document.getElementById("editorContainer");
const editorArea = document.createElement("div");
let editorLive;
let isEdited = false;
let activeFile;

function createEditor(_extension, _file, _lines) {
  editorSaveCheck = _lines;
  activeFile = _file;
  _file = _file.replace(/\/\//g, "");
  clearInterval(editorLive);
  editorArea.id = _file;
  const currentfile = document.getElementById("current-file");
  editorArea.classList.add("editor-area");
  container.appendChild(editorArea);
  const _dot = document.getElementById("__dot");
  const _dotText = _dot.querySelector("span");
  _dotText.innerText = "(edited)";
  _dotText.style.fontSize = "12px";
  _dotText.style.fontWeight = "500";
  // Add _dotText to the _dot if the file is edited
  _dot.children[0].style.fontSize = "10px";
  _dot.children[0].style.color = "#959595";
  currentfile.style.fontStyle = "italic";
  currentfile.style.fontWeight = "normal";

  // Ace editor
  ace.require("ace/ext/language_tools");
  let editor = ace.edit(editorArea);
  editor.setTheme("ace/theme/vibrant_ink");
  editor.session.setMode("ace/mode/" + _extension);
  editor.setOptions({
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
  });
  editor.setValue(_lines);
  editor.clearSelection();
  editor.focus();
  // Clear undo history
  editor.getSession().setUndoManager(new ace.UndoManager());

  // Interval functions
  editorLive = setInterval(() => {
    let position = editor.selection.getCursor();
    document.getElementById("cursor-pos").innerText = `Row ${
      position.row + 1
    }, Column ${position.column + 1} ${
      editor.getSelectedText().length > 0
        ? "(Selected " + editor.getSelectedText().length + ")"
        : ""
    }`;
    let errorCount = 0;
    let warningCount = 0;
    let infoCount = 0;
    let annotations = editor.getSession().getAnnotations();
    for (let i = 0; i < annotations.length; i++) {
      switch (annotations[i].type) {
        case "error":
          errorCount++;
          break;
        case "warning":
          warningCount++;
          break;
        case "info":
          infoCount++;
          break;
      }
    }
    // Debugging tools
    function getStatus(_type) {
      let count = "";
      switch (_type) {
        case "error":
          count = errorCount;
          break;
        case "warning":
          count = warningCount;
          break;
        case "info":
          count = infoCount;
          break;
      }
      if (count > 0) {
        document.getElementById(_type + "-count").parentElement.onclick =
          () => {
            let annotations = editor.getSession().getAnnotations();
            let lines = [];
            for (let i = 0; i < annotations.length; i++) {
              if (annotations[i].type == _type) {
                lines.push(annotations[i].row);
              }
            }
            let currentLine = editor.selection.getCursor().row;
            let nextLine = lines[0];
            for (let i = 0; i < lines.length; i++) {
              if (lines[i] > currentLine) {
                nextLine = lines[i];
                break;
              }
            }
            editor.gotoLine(nextLine + 1, 0, true);
          };
      } else {
        document.getElementById(_type + "-count").parentElement.onclick =
          () => {};
      }
    }
    getStatus("error");
    getStatus("warning");
    getStatus("info");

    // Set count values and change parent color
    document.getElementById("error-count").innerText = errorCount;
    document.getElementById("warning-count").innerText = warningCount;
    document.getElementById("info-count").innerText = infoCount;
    if (errorCount > 0) {
      document.getElementById("error-count").parentElement.style.color =
        "#ff4444";
    } else {
      document.getElementById("error-count").parentElement.style.color =
        "#ffffff";
    }
    if (warningCount > 0) {
      document.getElementById("warning-count").parentElement.style.color =
        "#ffcc00";
    } else {
      document.getElementById("warning-count").parentElement.style.color =
        "#ffffff";
    }
    if (infoCount > 0) {
      document.getElementById("info-count").parentElement.style.color =
        "#1d96f3";
    } else {
      document.getElementById("info-count").parentElement.style.color =
        "#ffffff";
    }

    if (editor.getValue() != editorSaveCheck) {
      _dot.style.display = "block";
      isEdited = true;
      currentfile.style.fontStyle = "normal";
      currentfile.style.fontWeight = "bold";
    } else {
      isEdited = false;
      currentfile.style.fontStyle = "italic";
      currentfile.style.fontWeight = "normal";
      _dot.style.display = "none";
    }
  }, 100);
}

const snapOSBash = (commandline) => {
  if (commandline.startsWith(":")) {
    // Get the command after :
    const command = commandline.split(":")[1];
    // Get the arguments after the command
    let args = commandline.split(":")[2];
    if (args === undefined) {
      args = "";
    }

    switch (command) {
      case "clear":
        clearCommandHistory();
        break;
      case "help":
        const _msg = new message(
          "Info",
          "Debug => " + command + " " + args,
          infoColor,
          null,
          getCurrentTime()
        );
        setLogger(_msg);
        break;
      case "save":
        if (openedFile !== null) {
          saveFile(openedFile.replace(/\/\//g, ""));
        } else {
          // do nothing
        }
        break;
    }
  }
};

// Listen to enter key when _logger is focused
_logger.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    snapOSBash(_logger.value);
    _logger.value = "";
  }
});

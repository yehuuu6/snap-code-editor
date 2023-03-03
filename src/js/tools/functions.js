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
  switch (extension) {
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
    default:
      aceExtension = "text";
      break;
  }
  return aceExtension;
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

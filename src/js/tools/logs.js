// Create a class that includes messages about editor status like edited, welcome and more.
let logs = [];
const infoColor = "aliceblue";
const warnColor = "orange";
const errorColor = "#ff4444";
const successColor = "#00C851";

class message {
  constructor(type, msg, color, anim, time) {
    this.type = type;
    this.msg = msg;
    this.color = color;
    this.anim = anim;
    this.time = time;
  }
}

// Initialize elements
let direction = "down";
const _logger = document.getElementById("logger");
const _msgtime = document.querySelector(".log-time");
const _historyBtn = document.getElementById("history");
const _history = document.getElementById("history-list");

_historyBtn.style.display = "block";

_historyBtn.style.transition = "transform 0.5s ease-in-out";
// Rotate 180deg when clicked turn back when clicked again
_historyBtn.addEventListener("click", () => {
  if (direction === "down") {
    _historyBtn.style.transform = "rotate(-180deg)";
    _history.style.display = "block";
    direction = "up";
  } else {
    _historyBtn.style.transform = "rotate(0deg)";
    direction = "down";
    _history.style.display = "none";
  }
});

// Logger default message
const _defaultMessage = new message(
  "Info",
  "Welcome to Snap Code Editor!",
  infoColor,
  null,
  getCurrentTime()
);
_logger.placeholder = _defaultMessage.type + ": " + _defaultMessage.msg;
_logger.className = getPlaceholderClass(_defaultMessage.type);
_msgtime.innerText = _defaultMessage.time;

// Warn message for development
const _warnMessage = new message(
  "Warning",
  "Snap Code Editor is still in development. Please use at your own risk. Visit GitHub page for more information.",
  warnColor,
  null,
  "💕"
);
logs.push(_warnMessage);

// Create an arrow function to insert logger message to logs array
const insertLogger = (message) => {
  logs.push(message);
};

// Create an arrow function to set logger message
const setLogger = (message) => {
  _logger.placeholder = message.type + ": " + message.msg;
  _msgtime.innerText = message.time;
  _logger.className = getPlaceholderClass(message.type);
  if (message.anim !== null) {
    _logger.style.animation = message.anim + " 0.5s ease-in-out";
    setTimeout(() => {
      _logger.style.animation = "";
    }, 500);
  } else {
    _logger.style.animation = "coolTranslate 0.5s ease-in-out";
    setTimeout(() => {
      _logger.style.animation = "";
    }, 500);
  }
  insertLogger(message);
  insertHistory();
};

// Insert every log in logs to history list only if it's not already there
const insertHistory = () => {
  _history.innerHTML = "";
  logs.forEach((log) => {
    const _historyItem = document.createElement("li");
    const _historyItemTime = document.createElement("span");

    if (log.msg.includes("own risk")) {
      _historyItemTime.style.fontSize = "30px";
    }

    _historyItemTime.innerText = log.time;
    _historyItemTime.className = "log-time";
    _historyItem.className = "log-item";
    _historyItem.style.color = log.color;
    _historyItem.innerText = log.type + ": " + log.msg;
    _history.appendChild(_historyItem);
    _historyItem.appendChild(_historyItemTime);
  });
};

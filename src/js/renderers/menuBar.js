minimizeBtn.addEventListener("click", () => {
  window.snapMenuBarAPI.handleWindow(0);
});
maximizeBtn.addEventListener("click", () => {
  window.snapMenuBarAPI.handleWindow(1);
});
closeBtn.addEventListener("click", () => {
  window.snapMenuBarAPI.handleWindow(2);
});

window.snapMenuBarAPI.handleIcon((event, value) => {
  const maximize = '<i class="fa-regular fa-square"></i>';
  const minimize = '<i class="fa-regular fa-clone"></i>';
  const newValue = value === -1 ? maximize : minimize;
  maximizeBtn.innerHTML = newValue;
});

const customBtns = document.querySelectorAll(".frame-item");
const applicaton = document.querySelector(".container");
customBtns.forEach((btn) => {
  // Add event listener to btn to toggle dropdown and hide other dropdowns
  btn.addEventListener("click", (e) => {
    const dropdown = e.target.nextElementSibling;
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      try {
        dropdown.style.display = "none";
      } catch (error) {
        // donothing
      }
    });
    try {
      dropdown.style.display = "block";
    } catch (error) {
      // donothing
    }
  });
  // Add event listener to application to hide dropdown when clicked outside other than dropdown
  applicaton.addEventListener("click", (e) => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  });
});
clearHistory.addEventListener("click", () => {
  clearCommandHistory();
});
runCommand.addEventListener("click", () => {
  run();
});
_logger.addEventListener("focus", () => {
  _logger.placeholder = "Type :help for more information";
  _logger.className = getPlaceholderClass("default");
});

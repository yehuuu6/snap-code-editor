function renderRouter() {
  const links = router.querySelectorAll("div");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const divsToRemove = [];

      // Find all div elements after the button
      let nextSibling = link.nextSibling;
      while (nextSibling) {
        if (nextSibling.tagName === "DIV") {
          divsToRemove.push(nextSibling);
        }
        nextSibling = nextSibling.nextSibling;
      }

      // Remove the div elements
      divsToRemove.forEach((div) => {
        div.parentNode.removeChild(div);
      });
      let pathString = "";

      let previousSibling = link.previousSibling;
      while (previousSibling !== null) {
        if (previousSibling.nodeType === Node.ELEMENT_NODE) {
          pathString = `${previousSibling.getAttribute("id")}/${pathString}`;
        }
        previousSibling = previousSibling.previousSibling;
      }

      window.snapExplorerAPI.getContent(pathString + "/" + event.target.id);
    });
  });
}

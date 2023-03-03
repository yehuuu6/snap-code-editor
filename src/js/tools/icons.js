function setIcons(items) {
  items.forEach((item) => {
    const mySpan = item.querySelector("span");
    const myIcon = item.querySelector("i");
    const myText = mySpan.innerText;
    let myExtension = "";
    myIcon.classList = "";
    let customText = myText.replace(/\/\//g, "");
    customText = customText.replace("Current file: ", "");
    if (customText.includes(".")) {
      myExtension = myText.split(".")[1].toLowerCase();
    } else {
      if (customText == "LICENSE" || customText == "license") {
        item.classList.add("license");
        myIcon.classList.add("fa-solid", "fa-key");
      } else if (customText == "README" || customText == "readme") {
        myIcon.classList.add("fas", "fa-file-alt");
      } else {
        myExtension = "folder";
      }
    }

    if (myExtension == "js") {
      item.classList.add("javascript");
      myIcon.classList.add("fab", "fa-js-square");
    } else if (myExtension == "html") {
      item.classList.add("html");
      myIcon.classList.add("fab", "fa-html5");
    } else if (myExtension == "css") {
      item.classList.add("css");
      myIcon.classList.add("fab", "fa-css3-alt");
    } else if (customText.includes(".ts")) {
      item.classList.add("typescript");
      myIcon.classList.add("fa-regular", "fa-file-code");
    } else if (customText.includes(".json")) {
      if (
        customText == "package.json" ||
        customText == "package-lock.json" ||
        customText == ".package.json" ||
        customText == ".package-lock.json" ||
        customText == "composer.json" ||
        customText == "composer.lock" ||
        customText == ".composer.json" ||
        customText == ".composer.lock" ||
        customText == "composer.phar" ||
        customText == ".composer.phar" ||
        customText == "composer-setup.php" ||
        customText == ".composer-setup.php" ||
        customText == "composer-setup" ||
        customText == ".composer-setup" ||
        customText == "composer-setup.bat" ||
        customText == ".composer-setup.bat" ||
        customText == "composer-setup.sh"
      ) {
        item.classList.add("npm");
        myIcon.classList.add("fab", "fa-npm");
      } else {
        item.classList.add("json");
        myIcon.classList.add("fa-regular", "fa-file-code");
      }
    } else if (myExtension == "py") {
      myIcon.classList.add("fab", "fa-python");
    } else if (myExtension == "txt") {
      myIcon.classList.add("fas", "fa-file-alt");
    } else if (myExtension == "png") {
      myIcon.classList.add("fas", "fa-file-image");
    } else if (myExtension == "jpg") {
      myIcon.classList.add("fas", "fa-file-image");
    } else if (myExtension == "jpeg") {
      myIcon.classList.add("fas", "fa-file-image");
    } else if (myExtension == "gif") {
      myIcon.classList.add("fas", "fa-file-image");
    } else if (myExtension == "svg") {
      myIcon.classList.add("fas", "fa-file-image");
    } else if (myExtension == "mp4") {
      myIcon.classList.add("fas", "fa-file-video");
    } else if (customText == ".bin") {
      myIcon.classList.add("fas", "fa-file-archive");
      item.classList.add("folder");
    } else if (customText == "electron") {
      myIcon.classList.add("fas", "fa-atom");
      item.classList.add("folder");
    } else if (myExtension == "folder") {
      item.classList.add("folder");
      if (customText == "node_modules") {
        item.classList.add("node");
        myIcon.classList.add("fab", "fa-node-js");
      } else if (customText.includes("plugin")) {
        item.classList.add("plugin");
        myIcon.classList.add("fas", "fa-plug");
      } else if (customText == "LICENSE") {
        item.classList.add("license");
        myIcon.classList.add("fa-solid", "fa-key");
      } else {
        myIcon.classList.add("fas", "fa-folder");
      }
    } else if (myExtension == "php") {
      myIcon.classList.add("fab", "fa-php");
      item.classList.add("php");
    } else if (myExtension == "java") {
      myIcon.classList.add("fab", "fa-java");
      item.classList.add("java");
    } else if (myExtension == "c") {
      myIcon.classList.add("fab", "fa-c");
      item.classList.add("c");
    } else if (myExtension == "cpp") {
      item.classList.add("cpp");
      myIcon.classList.add("fab", "fa-cpp");
    } else if (myExtension == "cs") {
      myIcon.classList.add("fab", "fa-csharp");
      item.classList.add("c-sharp");
    } else if (myExtension == "rb") {
      myIcon.classList.add("fab", "fa-ruby");
    } else if (myExtension == "go") {
      item.classList.add("go");
      myIcon.classList.add("fab", "fa-go");
    } else if (myExtension == "dart") {
      item.classList.add("dart");
      myIcon.classList.add("fab", "fa-dart");
    } else if (myExtension == "swift") {
      myIcon.classList.add("fab", "fa-swift");
      item.classList.add("swift");
    } else if (myExtension == "kt") {
      myIcon.classList.add("fab", "fa-kotlin");
      item.classList.add("kotlin");
    } else if (myExtension == "sql") {
      item.classList.add("sql");
      myIcon.classList.add("fas", "fa-database");
    } else if (myExtension == "md") {
      item.classList.add("markdown");
      myIcon.classList.add("fab", "fa-markdown");
    } else if (myExtension == "yml") {
      myIcon.classList.add("fab", "fa-yaml");
    } else if (myExtension == "xml") {
      myIcon.classList.add("fab", "fa-xml");
    } else if (myExtension == "zip") {
      myIcon.classList.add("fas", "fa-file-archive");
    } else if (myExtension == "rar") {
      myIcon.classList.add("fas", "fa-file-archive");
    } else {
      if (customText == "LICENSE") {
        item.classList.add("license");
        myIcon.classList.add("fa-solid", "fa-key");
      } else if (customText.includes("git")) {
        item.classList.add("git");
        myIcon.classList.add("fa-brands", "fa-git-alt");
      } else {
        myIcon.classList.add("fas", "fa-file");
      }
    }
  });
}

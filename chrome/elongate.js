setTimeout(() => {
  // see https://stackoverflow.com/questions/6620393/is-it-possible-to-alter-a-css-stylesheet-using-javascript-not-the-style-of-an
  adjustCSSRules = (selector, props, sheets) => {
    // get stylesheet(s)
    if (!sheets) sheets = [...document.styleSheets];
    else if (sheets.sup) {
      // sheets is a string
      let absoluteURL = new URL(sheets, document.baseURI).href;
      sheets = [...document.styleSheets].filter((i) => i.href == absoluteURL);
    } else sheets = [sheets]; // sheets is a stylesheet

    // CSS (& HTML) reduce spaces in selector to one.
    selector = selector.replace(/\s+/g, " ");
    const findRule = (s) =>
      [...s.cssRules].reverse().find((i) => i.selectorText == selector);
    let rule = sheets
      .map(findRule)
      .filter((i) => i)
      .pop();

    const propsArr = props.sup
      ? props.split(/\s*;\s*/).map((i) => i.split(/\s*:\s*/)) // from string
      : Object.entries(props); // from Object

    if (rule)
      for (let [prop, val] of propsArr) {
        // rule.style[prop] = val; is against the spec, and does not support !important.
        rule.style.setProperty(prop, ...val.split(/ *!(?=important)/));
      }
    else {
      let sheet = sheets.pop();
      if (!props.sup)
        props = propsArr.reduce((str, [k, v]) => `${str}; ${k}: ${v}`, "");
      sheet.insertRule(`${selector} { ${props} }`, sheet.cssRules.length);
    }
  };

  // adjustCSSRules(".ct-subsection.ct-subsection--primary-box", {
  //   backgroundColor: "white",
  //   border: "3px solid #c1272d",
  //   borderRadius: "20px",
  //   overflowY: "visible",
  // });

  // var link = document.createElement("link");
  // link.id = "mine";
  // link.rel = "stylesheet";
  // link.type = "text/css";
  // link.href =
  //   "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";

  // document.head.appendChild(link);

  var style_rules = [];

  // #character-tools-target > div > div.ct-character-sheet__inner > div > div.ct-subsections > div.ct-subsection.ct-subsection--primary-box > div > div.ddbc-tab-list > div.ddbc-tab-list__content > div > section > div > div.ddbc-tab-options__body > div
  //style_rules.push(".elongated" + " {background-color: #FFFFFF !important } ");

  style_rules.push(
    ".elongated .ct-subsection.ct-subsection--primary-box, .elongated .ct-primary-box" +
      " { height: auto !important; bbackground-color: black !important } "
  );
  style_rules.push(
    ".elongated .ct-primary-box .ct-creatures, .elongated .ct-primary-box .ct-equipment, .elongated .ct-primary-box .ct-extras, .elongated .ct-primary-box .ct-spells" +
      " { height: auto !important; bbackground-color: black !important } "
  );
  style_rules.push(
    ".elongated .ct-subsection--primary-box .ddbc-box-background" +
      " { display: none } "
  );

  style_rules.push(
    ".elongated .ddbc-tab-options__body, .elongated .ddbc-tab-options__content" +
      " { overflow-y: visible !important; bbackground-color: black !important} "
  );
  style_rules.push(
    ".elongated .ddbc-tab-options__content, .elongated .ct-spells" +
      " { height: auto !important; bbackground-color: black !important} "
  );

  var style = document.createElement("style");
  style.id = "mine";
  var styles = document.createTextNode(style_rules.join("\n"));
  style.appendChild(styles);
  document.head.appendChild(style);
  console.log("stylesheet injected", document.getElementById("mine"));

  var box = document.querySelector(".ct-subsections");
  box.className = "ct-subsections elongated";

  box = document.querySelector(".ct-subsection--primary-box");
  box.className = box.className + " elongated_list";
}, 1000);

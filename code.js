let getStrip = figma.currentPage.children.map((cases, i) => {
  return {
    id: cases.id,
    name: cases.name,
  };
});

let dataJSON = figma.currentPage.children.map((cases, i) => {
  return {
    id: cases.id,
    name: cases.name,
    x: cases.x,
    y: cases.y,
    width: cases.width,
    height: cases.height,
    children: cases.children.map((childrenCase, j) => {
      return {
        childId: childrenCase.id,
        childName: childrenCase.name,
        type: childrenCase.fills
          .map((fill) => {
            return fill.type;
          })
          .toString(),
        childX: childrenCase.x,
        childY: childrenCase.y,
        childWidth: childrenCase.width,
        childHeight: childrenCase.height,
        childOpacity: childrenCase.opacity,
        childRotation: childrenCase.rotation,
        childFills: childrenCase.fills,
        // Text //
        childContent: childrenCase.characters ? childrenCase.characters : null,
        childFontName: childrenCase.fontName ? childrenCase.fontName : "",
        childFontSize: childrenCase.fontSize ? childrenCase.fontSize : "",
        childTextDecoration: childrenCase.textDecoration
          ? childrenCase.textDecoration
          : "",
        childLetterSpacing: childrenCase.letterSpacing
          ? childrenCase.letterSpacing
          : "",
        childLineHeight: childrenCase.lineHeight ? childrenCase.lineHeight : "",
      };
    }),
  };
});

let exportJSON = [];
const recupData = (id) => {
  let found = [];
  if (id === "all") {
    found = dataJSON;
  } else {
    found = dataJSON.find((element) => element.id === id);
  }
  return found;
};

figma.showUI(__html__);

figma.ui.postMessage({ message: "recupStrip", data: getStrip });

figma.ui.onmessage = function (msg) {
  if (msg.type === "export") {
    exportJSON = recupData(msg.data);
    figma.ui.postMessage({ message: "exportJSON", data: exportJSON });
  }
  if (msg.type === "cancel") {
    figma.closePlugin("Cancel");
  }

  if (msg.type === "closePlugin") {
    figma.closePlugin("Export Finish");
  }
};

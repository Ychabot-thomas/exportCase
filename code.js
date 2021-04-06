let recupCase = figma.currentPage.children;
let afficheCase = recupCase.map((cases, i) => {
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
        childX: childrenCase.x,
        childY: childrenCase.y,
        childWidth: childrenCase.width,
        childHeight: childrenCase.height,
        childOpacity: childrenCase.opacity,
        childRotation: childrenCase.rotation,
        childFills: childrenCase.fills,
        // Text //
        childContent: childrenCase.characters ? childrenCase.characters : "",
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

figma.showUI(__html__);

figma.ui.postMessage(afficheCase);

figma.ui.onmessage = function (msg) {
  if (msg.type === "export") {
    console.log("export");
    figma.closePlugin("Export Finish");
  } else {
    console.log("cancel");
    figma.closePlugin("Cancel");
  }
};

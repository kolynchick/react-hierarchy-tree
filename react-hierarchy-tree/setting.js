const DEFAULT_ELEMENT_HEIGHT = 50;
const DEFAULT_OFFSET_BOTTOM = 5;
const DEFAULT_OFFSET_RIGHT = 5;
const DEFAULT_CONTAINER_CLASSNAME = "";
const DEFAULT_ELEMENT_CLASSNAME = "";
const DEFAULT_ELEMENT_ACTIVE_CLASSNAME = "";
const DEFAULT_ELEMENT_INTERSECTION_CLASSNAME = "";
const DEFAULT_CARET_CLASSNAME = "";
const DEFAULT_NUMBER_CLASSNAME = "";
const DEFAULT_CARET_COLLAPSE_CLASSNAME = "";
const TYPE_OF_NUMBER = "number";

export const processSetting = (settings) => ({
  height: (settings.elementHeight === undefined || typeof settings.elementHeight !== TYPE_OF_NUMBER) ? DEFAULT_ELEMENT_HEIGHT : settings.elementHeight,
  offsetBottom: (settings.elementOffsetBottom === undefined || typeof settings.elementOffsetBottom !== TYPE_OF_NUMBER) ? DEFAULT_OFFSET_BOTTOM : settings.elementOffsetBottom,
  offsetRight: (settings.elementOffsetRight === undefined || typeof settings.elementOffsetRight !== TYPE_OF_NUMBER) ? DEFAULT_OFFSET_RIGHT : settings.elementOffsetRight,
  containerClassName: (settings.containerClassName === undefined) ? DEFAULT_CONTAINER_CLASSNAME : settings.containerClassName,
  elementClassName: (settings.elementClassName === undefined) ? DEFAULT_ELEMENT_CLASSNAME : settings.elementClassName,
  elementActiveClassName: (settings.elementActiveClassName === undefined) ? DEFAULT_ELEMENT_ACTIVE_CLASSNAME : settings.elementActiveClassName,
  elementIntersectionClassName: (settings.elementIntersectionClassName === undefined) ? DEFAULT_ELEMENT_INTERSECTION_CLASSNAME : settings.elementIntersectionClassName,
  caretClassName: (settings.caretClassName === undefined) ? DEFAULT_CARET_CLASSNAME : settings.caretClassName,
  caretCollapseClassName: (settings.caretCollapseClassName === undefined) ? DEFAULT_CARET_COLLAPSE_CLASSNAME : settings.caretCollapseClassName,
  numberClassName: (settings.numberClassName === undefined) ? DEFAULT_NUMBER_CLASSNAME : settings.numberClassName
});

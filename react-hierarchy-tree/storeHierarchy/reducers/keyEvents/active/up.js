import {ArrayHierarchyHelper} from "../../helpClass/arrayHierarchyHelper";

const DELIMITER = ".";
const ACTIVE_ELEMENT_ACTION = "isActive";
const SUB_INDEX_RENDER = "sub";

export const activeUp = (state,action) => {
  const arrayHelper = new ArrayHierarchyHelper(state);
  return calculateNextActiveElementUp(arrayHelper,arrayHelper.getElementByActionType(ACTIVE_ELEMENT_ACTION));
};

const calculateNextActiveElementUp = (arrayHelper,lastElement) => {
  const tempNextActiveIndex = arrayHelper.recalcIndexRender(lastElement.system.indexRender,{type: SUB_INDEX_RENDER});
  const tempNextActiveElement = arrayHelper.getElementByIndexRender(tempNextActiveIndex);
  const tempParentElement = arrayHelper.getElementByIndexRender(lastElement.system.parentIndexRender);


  if(tempNextActiveElement === undefined) {
    return tempParentElement === undefined ? arrayHelper.getArray() : elementActive(arrayHelper.getArray(),tempParentElement.system.indexRender);
  } else {
    return tempNextActiveElement.system.actions.isCollapse ?
           elementActive(arrayHelper.getArray(),tempNextActiveElement.system.indexRender) :
           elementActive(arrayHelper.getArray(),recursionCalculateNextActiveElementUp(arrayHelper,tempNextActiveElement));
  }
}

const recursionCalculateNextActiveElementUp = (arrayHelper,element) => {
  const tempArrayChildren = arrayHelper.getElementsByParentIndexRender(element.system.indexRender);
  return tempArrayChildren.length !== 0 ? recursionCalculateNextActiveElementUp(arrayHelper,tempArrayChildren.sort(sortFunction)[0]) : element.system.indexRender;
};

const sortFunction = (a,b) => {
  const index1 = a.system.indexRender;
  const index2 = b.system.indexRender;
  const splitIndex1 = index1.split(DELIMITER);
  const splitIndex2 = index2.split(DELIMITER);
  const numberIndex1 = Number(splitIndex1[splitIndex1.length-1]);
  const numberIndex2 = Number(splitIndex2[splitIndex2.length-1]);
  return numberIndex1 > numberIndex2 ? -1 : numberIndex1 < numberIndex2 ? 1 : 0;
};

const elementActive = (state,index) => (
[...state.map(
  (element) => {
    element.system.actions.isActive = element.system.indexRender === index;
    return element;
  }
)]);

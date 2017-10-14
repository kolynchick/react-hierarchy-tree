import {ArrayHierarchyHelper} from "../../helpClass/arrayHierarchyHelper";

const DELIMITER = ".";
const ACTIVE_ELEMENT_ACTION = "isActive";
const ADD_INDEX_RENDER = "add";

export const activeDown = (state,action) => {
  const arrayHelper = new ArrayHierarchyHelper(state);
  return calculateNextActiveElementDown(arrayHelper,arrayHelper.getElementByActionType(ACTIVE_ELEMENT_ACTION));
}

const calculateNextActiveElementDown = (arrayHelper,lastElement) => {
  const tempArrayChildren = arrayHelper.getElementsByParentIndexRender(lastElement.system.indexRender);
  const tempNextActiveIndex = arrayHelper.recalcIndexRender(lastElement.system.indexRender,{type: ADD_INDEX_RENDER});
  const tempNextActiveElement = arrayHelper.getElementByIndexRender(tempNextActiveIndex);

  if (tempArrayChildren.length !== 0 && !lastElement.system.actions.isCollapse)
    return elementActive(arrayHelper.getArray(),tempArrayChildren.sort(sortFunction)[tempArrayChildren.length-1].system.indexRender);

  if (tempNextActiveElement !== undefined)
    return elementActive(arrayHelper.getArray(),tempNextActiveIndex);

  const tempIndex = recursionCalculateNextActiveElementDown(arrayHelper,lastElement);

  if (tempIndex !== undefined)
    return elementActive(arrayHelper.getArray(),tempIndex);

  return arrayHelper.getArray();
}

const recursionCalculateNextActiveElementDown = (arrayHelper,element) => {
  const tempParentElement = arrayHelper.getElementByIndexRender(element.system.parentIndexRender);
  if (tempParentElement === undefined) return undefined;
  const tempNextIndexRender = arrayHelper.recalcIndexRender(tempParentElement.system.indexRender,{type:ADD_INDEX_RENDER});
  const tempElement = arrayHelper.getElementByIndexRender(tempNextIndexRender);
  if(tempElement === undefined)
    return recursionCalculateNextActiveElementDown(arrayHelper,tempParentElement);
  return tempNextIndexRender;
}

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

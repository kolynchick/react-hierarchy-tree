import {ArrayHierarchyHelper} from "../helpClass/arrayHierarchyHelper";

const ACTIVE_DIRECTION = {
  UP: "up",
  DOWN: "down"
};
const SUB_INDEX_RENDER = "sub";
const ADD_INDEX_RENDER ="add";
const DELIMITER = ".";

export const active = (state,action) => {
  switch(action.activeType.name){
    //case "mouse": return elementActive(state,action.activeType.indexRender);
    case ACTIVE_DIRECTION.UP: return elementPressedUp(state,getElementLastActive(state));
    case ACTIVE_DIRECTION.DOWN: return elementPressedDown(state,getElementLastActive(state));
    default: return state;
  }
}

const getElementLastActive = (state) => state.filter((element) => element.system.actions.isActive).pop();

const elementPressedUp = (state,lastElement) => calculateNextActiveElementUp(state,lastElement);

const elementPressedDown = (state,lastElement) => calculateNextActiveElementDown(state,lastElement);

const calculateNextActiveElementUp = (state,lastElement) => {
  const arrayHelper = new ArrayHierarchyHelper(state);
  const tempNextActiveIndex = arrayHelper.recalcIndexRender(lastElement.system.indexRender,{type: SUB_INDEX_RENDER});
  const tempNextActiveElement = arrayHelper.getElementByIndexRender(tempNextActiveIndex);
  const tempParentElement = arrayHelper.getElementByIndexRender(lastElement.system.parentIndexRender);


  if(tempNextActiveElement === undefined) {
    return tempParentElement === undefined ? state : elementActive(state,tempParentElement.system.indexRender);
  } else {
    return elementActive(state,recursionCalculateNextActiveElementUp(arrayHelper,tempNextActiveElement));
  }
}

const recursionCalculateNextActiveElementUp = (arrayHelper,element) => {
  const tempArrayChildren = arrayHelper.getElementsByParentIndexRender(element.system.indexRender);
  return tempArrayChildren.length !== 0 ? recursionCalculateNextActiveElementUp(arrayHelper,tempArrayChildren.sort(sortUp)[0]) : element.system.indexRender;
};

const sortUp = (a,b) => {
  const index1 = a.system.indexRender;
  const index2 = b.system.indexRender;
  const splitIndex1 = index1.split(DELIMITER);
  const splitIndex2 = index2.split(DELIMITER);
  const numberIndex1 = Number(splitIndex1[splitIndex1.length-1]);
  const numberIndex2 = Number(splitIndex2[splitIndex2.length-1]);
  return numberIndex1 > numberIndex2 ? -1 : numberIndex1 < numberIndex2 ? 1 : 0;
}


const calculateNextActiveElementDown = (state,lastElement) => {
  const arrayHelper = new ArrayHierarchyHelper(state);

  const tempArrayChildren = arrayHelper.getElementsByParentIndexRender(lastElement.system.indexRender);
  const tempNextActiveIndex = arrayHelper.recalcIndexRender(lastElement.system.indexRender,{type: ADD_INDEX_RENDER});
  const tempNextActiveElement = arrayHelper.getElementByIndexRender(tempNextActiveIndex);

  if (tempArrayChildren.length !== 0) {
    return elementActive(state,tempArrayChildren.sort(sortUp)[tempArrayChildren.length-1].system.indexRender);
  }

  if (tempNextActiveElement !== undefined)
    return elementActive(state,tempNextActiveIndex);

  const tempIndex = recursionCalculateNextActiveElementDown(arrayHelper,lastElement);

  if (tempIndex !== undefined)
    return elementActive(state,tempIndex);

  return state;
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

const elementActive = (state,index) => (
[...state.map(
  (element) => {
    element.system.actions.isActive = element.system.indexRender === index;
    return element;
  }
)]);

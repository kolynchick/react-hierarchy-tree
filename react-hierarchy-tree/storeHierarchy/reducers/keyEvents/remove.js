import {ArrayHierarchyHelper} from '../helpClass/arrayHierarchyHelper';

const ACTIVE_INDEX_ACTION = "isActive";
const ADD_INDEX_RENDER = "add";
const SUB_INDEX_RENDER = "sub";
const TEMP_INDEX_RENDER = "-1";
const DIRECTION_DOWN = "down";

export const remove = (state) => [...run(new ArrayHierarchyHelper(state))];

const run = (arrayHelper) => {
  const pressedElement = arrayHelper.getElementByActionType(ACTIVE_INDEX_ACTION);
  if (pressedElement === undefined) return arrayHelper.getArray();
  return getProcessedArrayHelper(arrayHelper,pressedElement).getArray();
}

const getProcessedArrayHelper = (arrayHelper,elementActive) => {
  const tempIndexRenderActive = elementActive.system.indexRender;
  const tempParentIndexRenderActive = elementActive.system.parentIndexRender;
  const prevIndexRenderActive = arrayHelper.recalcIndexRender(elementActive.system.indexRender,{type: SUB_INDEX_RENDER});
  const nextIndexRenderActive = arrayHelper.recalcIndexRender(elementActive.system.indexRender,{type: ADD_INDEX_RENDER});

  arrayHelper.setArray(arrayHelper.getArray().filter((element) => !element.system.actions.isTemp));

  arrayHelper.setArray(arrayHelper.getArray().map(
    (element) => {
      if(element.system.indexRender === elementActive.system.indexRender) {
        element.system.actions.isTemp = true;
        element.system.actions.isActive = false;
        element.system.indexRender = TEMP_INDEX_RENDER;
        element.system.parentIndexRender = TEMP_INDEX_RENDER;
      }
      return element;
    }
  ));

  arrayHelper.setArray(deleteChildElement(arrayHelper,tempIndexRenderActive));

  arrayHelper.setArray(arrayHelper.getArray().map(
    (element) => {
      if(element.system.indexRender === prevIndexRenderActive || element.system.indexRender === nextIndexRenderActive) {
        if(arrayHelper.getElementByActionType(ACTIVE_INDEX_ACTION) === undefined) element.system.actions.isActive = true;
      }
      return element;
    }
  ));

  arrayHelper.changeIndexRenderDirection(tempIndexRenderActive,tempParentIndexRenderActive,DIRECTION_DOWN);
  return arrayHelper;
}

const deleteChildElement = (arrayHelper,parentElement) => arrayHelper.getArray().reduce(
  (acc,element) => !element.system.actions.isTemp && arrayHelper.isElementChild(element.system.indexRender,parentElement) ? acc : [...acc,element]
,[]);

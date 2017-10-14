import {tempCreate} from '../temp.js';
import {ArrayHierarchyHelper} from '../helpClass/arrayHierarchyHelper';

const ACTIVE_ELEMENT_ACTION = "isActive";
const EMPTY_ARRAY_INDEX = "1";
const EMPTY_STRING = "";
const ADD_INDEX_RENDER = "add";
const TEMP_INDEX_RENDER = "-1";
const DIRECTION_UP = "up";

export const add = (state) => [...run(new ArrayHierarchyHelper(state)),tempCreate(state.length)];

const run = (arrayHelper) => {
  const tempCurrentElementActive = arrayHelper.getElementByActionType(ACTIVE_ELEMENT_ACTION);
  const tempFutureIndexElementActive = tempCurrentElementActive !== undefined ?
                                       arrayHelper.recalcIndexRender(tempCurrentElementActive.system.indexRender,{type: ADD_INDEX_RENDER}) :
                                       EMPTY_ARRAY_INDEX;
  const tempFutureParentIndexRenderActive = tempCurrentElementActive === undefined ? EMPTY_STRING : tempCurrentElementActive.system.parentIndexRender;
  arrayHelper.setArray(setAllDisabledActiveElement(arrayHelper));
  arrayHelper.changeIndexRenderDirection(tempFutureIndexElementActive,tempFutureParentIndexRenderActive,DIRECTION_UP);
  arrayHelper.changeIndexRender(TEMP_INDEX_RENDER,tempFutureIndexElementActive,tempFutureParentIndexRenderActive,changeOtherElementProperties);
  return arrayHelper.getArray();
};

const setAllDisabledActiveElement = (arrayHelper) => arrayHelper.getArray().map(
  (element) => {
    element.system.actions.isActive = false;
    return element;
  }
);

const changeOtherElementProperties = (element) => {
  element.system.actions = Object.assign(element.system.actions,{
    isTemp: element.system.actions.isTemp ? false : element.system.actions.isTemp,
    isActive: element.system.actions.isTemp
  });
  return element;
}

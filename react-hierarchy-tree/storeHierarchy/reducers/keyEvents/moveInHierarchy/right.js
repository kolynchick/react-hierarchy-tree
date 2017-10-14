import {ArrayHierarchyHelper} from "../../helpClass/arrayHierarchyHelper";

const ACTIVE_ELEMENT_ACTION = "isActive";
const DEFAULT_DELIMITER_INDEX_RENDER = ".";
const DIRECTION_DOWN = "down";
const SUB_INDEX_RENDER = "sub";

export const right = (state) => {
  const arrayHelper = new ArrayHierarchyHelper(state);
  const elementActive = arrayHelper.getElementByActionType(ACTIVE_ELEMENT_ACTION);
  if (elementActive === undefined) return state;
  const indexRenderActive = elementActive.system.indexRender;
  return run(arrayHelper,indexRenderActive);
}


const run = (arrayHelper,selectIndexRender) => {
  const parentIndexRenderSelect = arrayHelper.getElementByIndexRender(selectIndexRender).system.parentIndexRender;
  const futureParentElement = getFutureParentElement(arrayHelper,selectIndexRender);

  if(futureParentElement === undefined)
    return arrayHelper.getArray();

  const futureIndexRender = getFutureIndexRender(arrayHelper,futureParentElement);
  arrayHelper.changeIndexRender(selectIndexRender,futureIndexRender,futureParentElement.system.indexRender);
  arrayHelper.changeIndexRenderDirection(selectIndexRender,parentIndexRenderSelect,DIRECTION_DOWN);
  return arrayHelper.getArray();
}

const getFutureIndexRender = (arrayHelper,futureParentElement) =>
futureParentElement.system.indexRender + DEFAULT_DELIMITER_INDEX_RENDER +
(arrayHelper.getElementsByParentIndexRender(futureParentElement.system.indexRender).length+1).toString();


const getFutureParentElement = (arrayHelper,selectIndexRender) => arrayHelper.getElementByIndexRender(
  arrayHelper.recalcIndexRender(selectIndexRender,{
    type: SUB_INDEX_RENDER
  })
);

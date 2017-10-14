import {ArrayHierarchyHelper} from "../../helpClass/arrayHierarchyHelper";

const ACTIVE_ELEMENT_ACTION = "isActive";
const DIRECTION = {
  DOWN: "down",
  UP: "up"
};
const EMPTY_STRING = "";
const INDEX_RENDER_ADD = "add";

export const left = (state) => {
  const arrayHelper = new ArrayHierarchyHelper(state);
  const elementActive = arrayHelper.getElementByActionType(ACTIVE_ELEMENT_ACTION);
  if (elementActive === undefined) return state;

  const indexRenderActive = elementActive.system.indexRender;
  return run(arrayHelper,indexRenderActive);
}

const run = (arrayHelper,selectIndexRender) => {
  const selectParentIndexRender = arrayHelper.getElementByIndexRender(selectIndexRender).system.parentIndexRender;
  const futureIndexRender = getFutureIndexRender(arrayHelper,selectParentIndexRender);
  if (futureIndexRender === undefined) return arrayHelper.getArray()
  const futureParentIndexRender = arrayHelper.getElementByIndexRender(arrayHelper.getElementByIndexRender(selectIndexRender).system.parentIndexRender).system.parentIndexRender;
  arrayHelper.changeIndexRenderDirection(futureIndexRender,futureParentIndexRender,DIRECTION.UP);
  arrayHelper.changeIndexRender(selectIndexRender,futureIndexRender,futureParentIndexRender);
  arrayHelper.changeIndexRenderDirection(selectIndexRender,selectParentIndexRender,DIRECTION.DOWN);
  return arrayHelper.getArray();
}

const getFutureIndexRender = (arrayHelper,parentIndexRenderSelect) =>
  parentIndexRenderSelect !== EMPTY_STRING ?
  arrayHelper.recalcIndexRender(parentIndexRenderSelect,{type: INDEX_RENDER_ADD}) :
  undefined;

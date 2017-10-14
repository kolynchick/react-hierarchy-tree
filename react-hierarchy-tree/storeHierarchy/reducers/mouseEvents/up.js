import {ArrayHierarchyHelper} from "../helpClass/arrayHierarchyHelper";

const ACTION_ELEMENT_INTERSECTION = "isIntersection";
const DIRECTION_DOWN = "down";
const DELIMITER = ".";

export const up = (state,action) => {
  const arrayHelper = new ArrayHierarchyHelper(state.hierarchy);
  return processRun(arrayHelper,action.indexRender,action.coordinate);
}

const processRun = (arrayHelper,indexRender,coordinate) => {
  const tempArrayAfterProcessCoordinate = arrayHelper.getArray().map(
    (element) => {
      if(element.system.indexRender === indexRender) {
        element.system.actions.moveElement = {
          isMoved: false,
          coordinate: 0,
          lastCoordinate: 0,
          coordinateScroll: 0
        }
      }
      return element;
    }
  );
  arrayHelper.setArray(tempArrayAfterProcessCoordinate);
  arrayHelper = moveELementsInIntersection(arrayHelper,indexRender);
  return intersectionOver(arrayHelper.getArray());
}

  const moveELementsInIntersection = (arrayHelper,index) => {
    const parentIndexRenderSelect = arrayHelper.getElementByIndexRender(index).system.parentIndexRender;
    const tempElementIntersection = arrayHelper.getElementByActionType(ACTION_ELEMENT_INTERSECTION);
    if (tempElementIntersection === undefined)
      return arrayHelper;

    const futureIndexRender = getFutureIndexRender(arrayHelper,tempElementIntersection);

    arrayHelper.changeIndexRender(index,futureIndexRender,tempElementIntersection.system.indexRender);
    arrayHelper.changeIndexRenderDirection(index,parentIndexRenderSelect,DIRECTION_DOWN);
    return arrayHelper;
  };

  const getFutureIndexRender = (arrayHelper,element) =>
  element.system.indexRender + DELIMITER +
  (arrayHelper.getElementsByParentIndexRender(element.system.indexRender).length+1).toString();

  const intersectionOver = (array) => [...array.map(
    (element) => {
      element.system.actions.isIntersection = false;
      return element;
    }
  )];

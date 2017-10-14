import {ArrayHierarchyHelper} from "../helpClass/arrayHierarchyHelper";

export const down = (state,action) => {
  const arrayHelper = new ArrayHierarchyHelper(state.hierarchy);
  return processRun(arrayHelper,state.mapRender,state.setting,action.indexRender,action.coordinate);
}

const processRun = (arrayHelper,mapRender,setting,indexRender,coordinate) => arrayHelper.getArray().map(
  (element) => {
    if(element.system.indexRender === indexRender) {
      element.system.actions.isCollapse = true;
      element.system.actions.moveElement = {
        isMoved: true,
        coordinate: mapRender.get(indexRender) * setting.height + setting.offsetBottom * mapRender.get(indexRender),
        lastCoordinate: coordinate.lastCoordinate,
        coordinateScroll: coordinate.coordinateScroll
      }
    }
    element.system.actions.isActive = element.system.indexRender === indexRender;
    return element;
  }
);

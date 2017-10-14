import {ArrayHierarchyHelper} from "../../helpClass/arrayHierarchyHelper";
import {change} from "./change.js";
import {intersection} from "./intersection.js";
import {moveElement} from "./move.js";

const ACTION_CHANGE = "change";
const ACTION_INTERSECTION = "intersection";
const EMPTY_STRING = "";
const SUB_INDEX_RENDER = "sub";
const ADD_INDEX_RENDER = "add";

export const move = (state,action) => {
  const arrayHelper = new ArrayHierarchyHelper(state.hierarchy);
  const tempAction = calculateIntersectionsAndChanges(arrayHelper,state.mapRender,state.setting,action.indexRender);
  const tempCountCoordinate = tempAction.count;
  const tempIndexRender = tempCountCoordinate === undefined ? -1 : getIndexRenderByCountCoordinate(arrayHelper,state.mapRender,tempCountCoordinate);
  arrayHelper.setArray(intersection(arrayHelper.getArray(),tempAction.action === ACTION_INTERSECTION ? tempIndexRender : EMPTY_STRING));
  return tempAction.action === ACTION_CHANGE ? change(arrayHelper,action.indexRender,tempIndexRender) : moveElement(arrayHelper,action.indexRender,action.coordinate);
}

const getIndexRenderByCountCoordinate = (arrayHelper,mapIndexRender,count) => {
  return arrayHelper.getArray().reduce(
    (acc,element) => mapIndexRender.get(element.system.indexRender) === count && !arrayHelper.isParentElementCollapse(element)
                     ? element.system.indexRender
                     : acc
  ,-1);
}

const calculateIntersectionsAndChanges = (arrayHelper,mapIndexRender,setting,index) => {
  const coordinateCenterElement = getMovedElement(arrayHelper).system.actions.moveElement.coordinate + setting.height/2;
  const countCoordinateUp = mapIndexRender.get(arrayHelper.recalcIndexRender(index,{type: SUB_INDEX_RENDER}));
  const countCoordinateDown = mapIndexRender.get(arrayHelper.recalcIndexRender(index,{type: ADD_INDEX_RENDER}));
  const heightWithOffestBottom = setting.height + setting.offsetBottom;

  if(countCoordinateUp !== undefined)
    if(coordinateCenterElement < countCoordinateUp * setting.height + countCoordinateUp * setting.offsetBottom)
      return {action: ACTION_CHANGE, count: countCoordinateUp};

  if(countCoordinateDown !== undefined)
    if(coordinateCenterElement > (countCoordinateDown+1) * setting.height + countCoordinateDown * setting.offsetBottom)
      return {action: ACTION_CHANGE, count: countCoordinateDown};


  if (coordinateCenterElement % heightWithOffestBottom < heightWithOffestBottom && mapIndexRender.get(index) !== Math.floor((coordinateCenterElement / heightWithOffestBottom)))
    return {action: ACTION_INTERSECTION, count: Math.floor(coordinateCenterElement / heightWithOffestBottom)};

  return {action: EMPTY_STRING,count: undefined};
}

const getMovedElement = (arrayHelper) => arrayHelper.getArray().filter((element) => element.system.actions.moveElement.isMoved).pop();

export const moveElement = (arrayHelper,index,coordinate) => arrayHelper.getArray().map(
  (element) => {
    if(element.system.actions.moveElement.isMoved) {
      let tempMoveElement = element.system.actions.moveElement;

      tempMoveElement.coordinate = tempMoveElement.coordinate -
      (tempMoveElement.lastCoordinate - coordinate.lastCoordinate) -
      (tempMoveElement.coordinateScroll - coordinate.coordinateScroll);

      tempMoveElement.lastCoordinate = coordinate.lastCoordinate;

      tempMoveElement.coordinateScroll = coordinate.coordinateScroll;
      element.system.actions.moveElement = tempMoveElement;
    }
    return element;
  }
);

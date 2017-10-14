import GET_RANDOM_NUMBER from './helpClass/randomGenerator.js';

const TEMP_INDEX_RENDER = "-1";
const EMPTY_STRING = "";

export const tempCreate = () => ({
  system: {
    key: GET_RANDOM_NUMBER(),
    indexRender: TEMP_INDEX_RENDER,
    parentIndexRender: TEMP_INDEX_RENDER,
    actions: {
      isTemp: true,
      isActive: false,
      isCollapse: false,
      isIntersection: false,
      moveElement: {
        isMoved: false,
        coordinate: 0,
        lastCoordinate: 0,
        coordinateScroll: 0
      }
    }
  },
  value: EMPTY_STRING
});

import {tempCreate} from './temp.js';

const EMPTY_STRING = "";
const DELIMITER = ".";

export const create = (array) => [...recursionCreateArray(array,EMPTY_STRING),tempCreate()];

const recursionCreateArray = (elements,parentIndexRender) => elements.reduce(
    (acc,element,index) => {
      const tempIndex = (index + 1).toString();
      const tempIndexRender = parentIndexRender === EMPTY_STRING ? tempIndex : parentIndexRender + DELIMITER + tempIndex;
      const tempElement = tempCreate();
      tempElement.system.indexRender = tempIndexRender;
      tempElement.system.parentIndexRender = parentIndexRender;
      tempElement.value = element.value;
      tempElement.system.actions.isTemp = false;
      return [...acc,tempElement,...(element.children !== undefined ? recursionCreateArray(element.children,tempIndexRender) : [])];
    }
,[]);

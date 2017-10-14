import {ArrayHierarchyHelper} from "./helpClass/arrayHierarchyHelper";

const EMPTY_STRING = "";

export const source = (state) => {
  const arrayHelper = new ArrayHierarchyHelper(state);
  const elements = arrayHelper.getElementsByParentIndexRender(EMPTY_STRING);
  return recursionArray(arrayHelper,elements,EMPTY_STRING);

}

const recursionArray = (arrayHelper,elements,parentIndexRender) => elements.reduce((acc,element) => {
  acc.push({value: element.value});
  acc[acc.length-1].children = recursionArray(
    arrayHelper,
    arrayHelper.getElementsByParentIndexRender(element.system.indexRender),
    element.system.indexRender
  );
  return acc;
},[]);

import {ArrayHierarchyHelper} from "./helpClass/arrayHierarchyHelper.js";


/*
Передаем массив с данными
Получаем объект Map => indexRender - счетчик отрисовки * высота поля
*/

const DELIMITER_INDEX_RENDER = ".";
const SUB_ACTION = "sub";

export const getMapRenderFromArrayHirerarchy = (arrayHierarchy) => run(new ArrayHierarchyHelper(arrayHierarchy));


const run = (arrayHelper) => arrayHelper.getArray().reduce(
		(array,element,index,arraySource) =>
		element.system.actions.isTemp ? array :
		arrayHelper.isParentElementCollapse(element) ?
		calculateCountIndexRender(array,arrayHelper,element.system.indexRender,arrayHelper.parentCollapseElement(element.system.indexRender)) :
		calculateCountIndexRender(array,arrayHelper,element.system.indexRender,element.system.indexRender)
,new Map());

const calculateCountIndexRender = (array,arrayHelper,indexRenderSet,indexRenderCalc) => {
	array.set(indexRenderSet,
		array.get(indexRenderCalc) !== undefined ?
		array.get(indexRenderCalc) :
		recursionGetCountIndexRender(indexRenderCalc,arrayHelper)
	);
	return array;
}

const recursionGetCountIndexRender = (indexRender,arrayHelper) => arrayHelper.splitIndexRender(indexRender).reduceRight(
  	(countResult,element,index,source) => {
			let tempIndexRender = arrayHelper.splitIndexRender(indexRender).slice(0,index+1).join(DELIMITER_INDEX_RENDER);
			while (arrayHelper.getElementByIndexRender(tempIndexRender) !== undefined) {

				countResult += !arrayHelper.isElementChild(indexRender,tempIndexRender) ?
											 getElementCountHierarchy(arrayHelper,tempIndexRender,0) + 1 :
											 0;
				tempIndexRender = arrayHelper.recalcIndexRender(tempIndexRender,{type:SUB_ACTION});
			}
      return countResult;
    }
,0) + arrayHelper.splitIndexRender(indexRender).length-1;

const getElementCountHierarchy = (arrayHelper,indexRender,countResult) => {
    const arr = arrayHelper.getElementsByParentIndexRender(indexRender);
		const element = arrayHelper.getElementByIndexRender(indexRender);

    countResult += arrayHelper.isParentElementCollapse(element) || element.system.actions.isCollapse ? 0 : arr.length;
    arr.forEach((element,index) => {
      countResult = getElementCountHierarchy(arrayHelper,element.system.indexRender,countResult);
    });
    return countResult
}

const EVENT_INDEX_RENDER = "replace";

export const change = (arrayHelper,indexOne,indexTwo) => {
  const parentIndexRender = arrayHelper.getElementByIndexRender(indexOne).system.parentIndexRender;
  const tempIndexRender = arrayHelper.recalcIndexRender(indexOne,{type: EVENT_INDEX_RENDER,number: 0});

  arrayHelper.changeIndexRender(indexOne,tempIndexRender,parentIndexRender);
  arrayHelper.changeIndexRender(indexTwo,indexOne,parentIndexRender);
  arrayHelper.changeIndexRender(tempIndexRender,indexTwo,parentIndexRender);

  return arrayHelper.getArray();
}

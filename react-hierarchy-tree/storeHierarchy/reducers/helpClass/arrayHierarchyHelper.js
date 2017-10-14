export class IndexRenderOperations {

  DEFAULT_DELIMITER = () => ".";

  /*
    Разделение индекса отрисовки

    String index - индекс отрисовки иерархии
  */
  splitIndexRender = (index) => index.split(this.DEFAULT_DELIMITER());

  /*
    Операции с индексом отрисовки

    String index - индекс отрисовки иерархии
    Object action - выбранное событие с объектом, формат:
    {
      type: [тип события: сложение - add,вычитание - sub, замена - replace],
      number: [если undefined -  вернет единицу, в остальных случаях указываем численное значение для операции]
    }
  */
  recalcIndexRender = (index,action) => {
      const tempSplitIndexRender = this.splitIndexRender(index);
      let tempElementChange = tempSplitIndexRender[tempSplitIndexRender.length-1];
      const prefixIndexElement = tempSplitIndexRender.slice(0,tempSplitIndexRender.length-1).join(".");


      switch(action.type) {
        case "add": tempElementChange = Number(tempElementChange) + (action.number !== undefined ? action.number : 1); break;
        case "sub": tempElementChange = Number(tempElementChange) - (action.number !== undefined ? action.number : 1); break;
        case "replace": tempElementChange = action.number !== undefined ? action.number : 1; break;
        default: tempElementChange = Number(tempElementChange) + 1;
      }

      return (prefixIndexElement.length === 0 ? "" : prefixIndexElement + this.DEFAULT_DELIMITER()) + tempElementChange.toString()
  }

  /*
    Сравнение двух индексов (пока предполагаем, что сравниваем два элемента у которых один родитель)

    String beforeIndexRender - первый индекс отрисовки
    String operation - знак равенства двух элементов (>,<,=)
    String afterIndexRender - второй индекс отрисовки
  */
  compareIndexRenders = (index1,operation,index2) => {
     const splitIndex1 = this.splitIndexRender(index1);
     const splitIndex2 = this.splitIndexRender(index2);
     const numberIndex1 = Number(splitIndex1[splitIndex1.length-1]);
     const numberIndex2 = Number(splitIndex2[splitIndex2.length-1]);

     switch(operation) {
        case ">":	return numberIndex1 > numberIndex2;
        case "<":	return numberIndex1 < numberIndex2;
        case "=": return numberIndex1 === numberIndex2;
        case ">=": return numberIndex1 >= numberIndex2;
        case "<=": return numberIndex1 <= numberIndex2;
        default: return false;
      }
  }
}


/*
Вспомогательный класс для работы с массивом иерархии
*/
export class ArrayHierarchyHelper extends IndexRenderOperations {

  /*
    Array array - массив с информацией о иерархии
  */
  constructor(array) {
    super();
    this.arrayPrivate = [...array];
  }

  /*
    вернуть массив
  */
  getArray = () => [...this.arrayPrivate];

  /*
    перезаписать массив
    Array newArray - массив иерархии
  */
  setArray = (newArray) => this.arrayPrivate = [...newArray];


  /*
    получить элемент в массиве по индексу отрисовки
    String indexRender - индекс отрисовки иерархии
  */
  getElementByIndexRender = (indexRender) => {
    const tempArray = this.arrayPrivate.filter((element) => element.system.indexRender === indexRender);
    return tempArray.length === 0 ? undefined : tempArray.pop();
  }

  /*
    получить элементы в массиве по родительскому индексу отрисовки
    String parentIndexRender - индекс отрисовки иерархии у вышестоящего элемента
  */
  getElementsByParentIndexRender = (parentIndexRender) => this.arrayPrivate.filter((element) => element.system.parentIndexRender === parentIndexRender);

  getElementByActionType = (actionType) => {

    const tempArray = this.arrayPrivate.filter((element) => {
        switch(actionType) {
          case "isTemp": return element.system.actions.isTemp;
          case "isActive": return element.system.actions.isActive;
          case "isIntersection": return element.system.actions.isIntersection;
          default: return false;
        }
    });
      return tempArray.length === 0 ? undefined : tempArray.pop();
  }

  isParentElementCollapse = (element) => {
    const parentElement = this.getElementByIndexRender(element.system.parentIndexRender);
    return parentElement !== undefined && !element.system.actions.isTemp ?
           parentElement.system.actions.isCollapse ? true : this.isParentElementCollapse(parentElement) :
           false;
  }

  parentCollapseElement = (index,indexCollapse = undefined) => {
    const element = this.getElementByIndexRender(index);
    if(element === undefined) return indexCollapse;
    indexCollapse = element.system.actions.isCollapse ? element.system.indexRender : indexCollapse;
    return this.parentCollapseElement(element.system.parentIndexRender,indexCollapse);
  }

  isElementChild = (childIndex,parentIndex) => {
    if(childIndex === parentIndex) return true;
    const element = this.getElementByIndexRender(childIndex);
    return element === undefined  ? false : this.isElementChild(element.system.parentIndexRender,parentIndex)
  }

  changeIndexRender = (selectIndexRender,futureIndexRender,parentIndexRender,changeOtherElementProperties = undefined) => {
    this.setArray(this.changeIndexRenderMain(selectIndexRender,futureIndexRender,parentIndexRender,changeOtherElementProperties));

    const tempMapResult = this.recursionChangeElementsChildren(selectIndexRender,futureIndexRender);

    this.setArray(
      this.getArray().map(
        (element) => {
          if(tempMapResult.get(element.system.indexRender) !== undefined) {
            const tempIndexRender = element.system.indexRender
            element.system.indexRender = tempMapResult.get(tempIndexRender).indexRender;
            element.system.parentIndexRender = tempMapResult.get(tempIndexRender).parentIndex;
          }
          return element;
        }
      )
    );
  }

  changeIndexRenderMain = (selectIndexRender,futureIndexRender,futureParentIndexRender,changeOtherElementProperties) => this.getArray().map(
    (element) => {
      if (element.system.indexRender === selectIndexRender) {
        element.system.indexRender = futureIndexRender;
        element.system.parentIndexRender = futureParentIndexRender;
      }
      if(typeof changeOtherElementProperties === "function")
        element = changeOtherElementProperties(element);
      return element;
    }
  )

  recursionChangeElementsChildren = (lastIndexRender,futureIndexRender,mapResult = new Map()) => {
    const tempArrayFilterElements = this.getElementsByParentIndexRender(lastIndexRender);

    tempArrayFilterElements.forEach(
      (element) => {
        const tempIndexRender = element.system.indexRender.replace(lastIndexRender,"");
        const tempCurrentIndexRender = element.system.indexRender;

        mapResult.set(element.system.indexRender,{
          indexRender: futureIndexRender + tempIndexRender,
          parentIndex: futureIndexRender
        });

        this.recursionChangeElementsChildren(tempCurrentIndexRender,mapResult.get(element.system.indexRender).indexRender,mapResult);
      }
    );

    return mapResult;
  }

  changeIndexRenderDirection = (selectIndexRender,parentIndexRender,type) => {
    const tempElementsArray = this.getElementsByParentIndexRender(parentIndexRender);
   	const tempElementsArraySort = tempElementsArray.sort(
      (a,b) => {
        const index1 = a.system.indexRender;
        const index2 = b.system.indexRender;
        const splitIndex1 = this.splitIndexRender(index1);
        const splitIndex2 = this.splitIndexRender(index2);
        const numberIndex1 = Number(splitIndex1[splitIndex1.length-1]);
        const numberIndex2 = Number(splitIndex2[splitIndex2.length-1]);
        return numberIndex1 > numberIndex2 ? (type === "up" ? -1 : 1) : numberIndex1 < numberIndex2 ? (type === "up" ? 1 : -1) : 0;
      }
    );
    tempElementsArraySort.forEach((elementSort) => {
      this.getArray().forEach((element) => {
        if (element.system.indexRender === elementSort.system.indexRender && this.compareIndexRenders(element.system.indexRender,(type === "up" ? ">=" : ">"),selectIndexRender)) {
          const futureIndexRender = this.recalcIndexRender(element.system.indexRender,{type: (type === "up" ? "add" : "sub")});
          const tempCurrentIndexRender = element.system.indexRender;
          this.changeIndexRender(tempCurrentIndexRender,futureIndexRender,element.system.parentIndexRender);
        }
      });
    });
  }
}

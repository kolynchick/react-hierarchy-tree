export const intersection = (array,index) => [...array.map(
  (element) => {
    element.system.actions.isIntersection = element.system.indexRender === index;
    return element;
  }
)];

export const collapse = (state,action) => [...state.hierarchy.map((element) => {
    if (element.system.indexRender === action.indexRender)
      element.system.actions.isCollapse = !element.system.actions.isCollapse;
    return element;
})];

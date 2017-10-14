import {reducers} from './reducers';

/*********ACTIONS**********/
const INITIALIZE = "@@redux/INIT";

const UPDATE_SETTING = "UPDATE_SETTING";

const MOUSE_EVENT = "MOUSE_EVENT";

const KEY_EVENT = "KEY_EVENT";

/* Middleware ACTIONS*/
export const actionsHierarchy = {
  updateSetting: (newSetting) => ({type: UPDATE_SETTING, settingUpdate: newSetting}),
  mouseEvents: (index,type,coordinateInformation) => ({type: MOUSE_EVENT,indexRender: index,event: type,coordinate: coordinateInformation}),
  keyEvents: (key) => ({type: KEY_EVENT, eventKey: key})
};
/*********ACTIONS**********/

const CanRecalc = (action) => !(action.type === MOUSE_EVENT && action.typeMouse === "move");

/* Middleware REDUCER */
export const reducersHierarchy = (state = {},action) => {
  let nextState = {...state};

  switch(action.type) {
    case UPDATE_SETTING:
      nextState = Object.assign(nextState,{setting: action.settingUpdate});
      break;
    case INITIALIZE:
      nextState = Object.assign(nextState,{hierarchy: reducers.createHierarchy(nextState.hierarchy,action)});
      nextState = Object.assign(nextState,{setting: nextState.setting});
      break;
    case MOUSE_EVENT:
      nextState = Object.assign(nextState,{hierarchy: reducers.mouseEvents(nextState,action)});
      break;
    case KEY_EVENT:
      nextState = Object.assign(nextState,{hierarchy: reducers.keyEvents(nextState.hierarchy,action)});
      break;
    default:
      return nextState;
  }

  if(CanRecalc) {
    nextState = Object.assign(nextState,{mapRender: reducers.render(nextState.hierarchy)});
    nextState = Object.assign(nextState,{hierarchySourse: reducers.callbackHierarchy(nextState.hierarchy)});
  }

  return nextState;
};

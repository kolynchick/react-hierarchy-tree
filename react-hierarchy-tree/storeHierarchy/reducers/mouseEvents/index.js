import {up} from './up.js';
import {down} from './down.js';
import {move} from './move';
import {collapse} from './collapse.js'

const MOUSE_UP_ELEMENT_DEFAULT = "up";
const MOUSE_DOWN_ELEMENT_DEFAULT = "down";
const MOUSE_MOVE_ELEMENT_DEFAULT = "move";
const MOUSE_COLLAPSE_ELEMENT_DEFAULT = "clickCaret";

export const mouse = (state,action) => {
  switch(action.event) {
    case MOUSE_UP_ELEMENT_DEFAULT:
      return up(state,action);
    case MOUSE_DOWN_ELEMENT_DEFAULT:
      return down(state,action);
    case MOUSE_MOVE_ELEMENT_DEFAULT:
      return move(state,action);
    case MOUSE_COLLAPSE_ELEMENT_DEFAULT:
      return collapse(state,action);
    default: return state.hierarchy;
  }
}

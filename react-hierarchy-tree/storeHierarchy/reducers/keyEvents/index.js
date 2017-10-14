import {add} from "./add.js";
import {remove} from "./remove.js";
import {activeUp} from "./active/up.js";
import {activeDown} from "./active/down.js";
import {left} from "./moveInHierarchy/left.js";
import {right} from "./moveInHierarchy/right.js";

const KEY_ADD_ELEMENT_DEFAULT = "Enter";
const KEY_REMOVE_ELEMENT_DEFAULT = "Delete";
const KEY_ACTIVE_DIRECTION_UP_ELEMENT_DEFAULT = "ArrowUp";
const KEY_ACTIVE_DIRECTION_DOWN_ELEMENT_DEFAULT = "ArrowDown";
const KEY_MOVE_DIRECTION_LEFT_ELEMENT_DEFAULT = "ArrowLeft";
const KEY_MOVE_DIRECTION_RIGHT_ELEMENT_DEFAULT = "ArrowRight";

export const key = (state,action) => {
  switch (action.eventKey.key) {
    case KEY_ADD_ELEMENT_DEFAULT:
      return add(state);
    case KEY_REMOVE_ELEMENT_DEFAULT:
      return remove(state);
    case KEY_ACTIVE_DIRECTION_UP_ELEMENT_DEFAULT:
      return activeUp(state);
    case KEY_ACTIVE_DIRECTION_DOWN_ELEMENT_DEFAULT:
      return activeDown(state);
    case KEY_MOVE_DIRECTION_LEFT_ELEMENT_DEFAULT:
      return left(state);
    case KEY_MOVE_DIRECTION_RIGHT_ELEMENT_DEFAULT:
      return right(state);
    default:
      return state;
  }
}

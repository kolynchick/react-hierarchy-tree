/* Главная функция, выдающая REDUCERS*/

import {create} from './create.js';
import {getMapRenderFromArrayHirerarchy} from './render';
import {mouse} from './mouseEvents';
import {key} from './keyEvents';
import {source} from './source.js';

export const reducers = {
  createHierarchy: create,
  render: getMapRenderFromArrayHirerarchy,
  mouseEvents: mouse,
  keyEvents: key,
  callbackHierarchy: source
};

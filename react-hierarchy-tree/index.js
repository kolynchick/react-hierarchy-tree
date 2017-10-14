import React from 'react';
import PropTypes from 'prop-types';
import {createStore} from 'redux';
import {Element} from './element.js';
import {reducersHierarchy,actionsHierarchy} from './storeHierarchy';
import {ArrayHierarchyHelper} from './storeHierarchy/reducers/helpClass/arrayHierarchyHelper.js';
import {processSetting} from './setting.js';

const DEFAULT_CONTAINER_REF = "container";
const EVENT_KEY_UP = "keyup";
const TYPE_FUNCTION = "function";

export default class Hierarchy extends React.Component {
  constructor(props){
    super(props);
    this.store = createStore(reducersHierarchy,
      {
        hierarchy: this.props.elements,
        mapRender: new Map(),
        setting: processSetting(this.props),
        hierarchySourse: this.props.elements
      }
    );
    this.state = {...this.store.getState()};
    this.store.subscribe(this.update);
    window.addEventListener(EVENT_KEY_UP,this.onKeyPress);
  }

  update = () => this.setState({...this.store.getState()});

  onMouseEvent = (action,index,element) => this.store.dispatch(actionsHierarchy.mouseEvents(index,action,
      {
        coordinate: element.target.offsetTop,
        lastCoordinate: element.clientY,
        coordinateScroll: this.getContainerObject().scrollTop
      }
  ));

  callbackHierarchy = () => {
    if(typeof this.props.callbackHierarchy === TYPE_FUNCTION)
      this.props.callbackHierarchy(this.state.hierarchySourse);
  }

  getContainerObject = () => this.refs.container;

  onKeyPress = (action) => this.store.dispatch(actionsHierarchy.keyEvents(action));

  getElementRender = (element,indexCounter,isParentElement,isParentCollapse) => {
    const coordinateY = (indexCounter * Number(this.state.setting.height))+(indexCounter * Number(this.state.setting.offsetBottom));
    return (
      <Element key={element.system.key}
               isParent={isParentElement}
               isCollapse={isParentCollapse}
               item={element}
               index={coordinateY}
               container={this.getContainerObject}
               mouseEvent={this.onMouseEvent}
               setting={this.state.setting}
      />
    );
  };

  render = () => {
    const arrayHelper = new ArrayHierarchyHelper(this.state.hierarchy);

    this.callbackHierarchy();

    return (
        <div className = {this.state.setting.containerClassName} ref={DEFAULT_CONTAINER_REF} style= {this.state.setting.containerStyle}>
          {
            arrayHelper.getArray().map(
              (element,index,array) => this.getElementRender(element,
                                       this.state.mapRender.get(element.system.indexRender),
                                       arrayHelper.getElementsByParentIndexRender(element.system.indexRender).length !== 0,
                                       arrayHelper.isParentElementCollapse(element))
              )
          }
        </div>
    );
  }
}

Hierarchy.propTypes = {
  containerStyle: PropTypes.object,
  elements: PropTypes.array,
  elementHeight: PropTypes.number,
  elementOffsetBottom: PropTypes.number,
  elementOffsetRight: PropTypes.number,
  elementStyle: PropTypes.object,
  elementActiveStyle: PropTypes.object,
  elementMoveStyle: PropTypes.object,
  elementIntersectionStyle: PropTypes.object,
  numberStyle: PropTypes.object,
  caretStyle: PropTypes.object,
}

Hierarchy.defaultProps = {elements: []};

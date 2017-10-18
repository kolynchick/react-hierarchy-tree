import React from 'react';

const DEFAULT_DELIMITER_INDEX = ".";
const DEFAULT_DELIMITER_SPACE = " ";

const TEMP_ELEMENT_STYLE = {
  TOP: "-50px",
  OPACITY: "0",
  ZINDEX: "0"
}

const MOVE_ELEMENT_STYLE = {
  OPACITY: "1",
  ZINDEX: "9999"
}

const COLLAPSE_ELEMENT_STYLE = {
  OPACITY: "0",
  ZINDEX: "-10"
}

const ELEMENT_STYLE = {
  OPACITY: "1"
}

const MOUSE_ACTION = {
  DOWN: "down",
  UP: "up",
  MOVE: "move",
  CLICK_CARET: "clickCaret"
}

const MOUSE_EVENT = {
  MOVE: "mousemove",
  SCROLL: "scroll",
  UP: "mouseup"
}

export class Element extends React.Component {

  getRenderStyle = (element) => {
    if(element.system.actions.isTemp) return this.elementStyleTemp();
    if(element.system.actions.moveElement.isMoved) return this.elementMoveStyle(element.system.actions.moveElement.coordinate);
    if(this.props.isCollapse) return this.elementCollapseStyle(this.props.index);
    return this.elementStyle(this.props.index);
  }


  getElementClassName = (element) => {
    let className = this.props.setting.elementClassName;

    if(element.system.actions.isActive)
      className += DEFAULT_DELIMITER_SPACE + this.props.setting.elementActiveClassName;

    if(element.system.actions.isIntersection)
      className += DEFAULT_DELIMITER_SPACE + this.props.setting.elementIntersectionClassName;

    return className;
  }

  getCaretClassName = (element) => {
    let className = this.props.setting.caretClassName;

    if(element.system.actions.isCollapse)
      className += DEFAULT_DELIMITER_SPACE + this.props.setting.caretCollapseClassName;

    return className;
  }

  getOffsetRight = () => this.props.item.system.indexRender.split(DEFAULT_DELIMITER_INDEX).length * this.props.setting.offsetRight;

  elementStyleTemp = () => ({
    top: TEMP_ELEMENT_STYLE.TOP,
    opacity: TEMP_ELEMENT_STYLE.OPACITY,
    zIndex: TEMP_ELEMENT_STYLE.ZINDEX,
    left: this.getOffsetRight()
  });

  elementMoveStyle = (coordinate) => ({
    top: coordinate,
    opacity: MOVE_ELEMENT_STYLE.OPACITY,
    zIndex: MOVE_ELEMENT_STYLE.ZINDEX,
    left: this.getOffsetRight()
  });

  elementCollapseStyle = (coordinate) => ({
    top: coordinate,
    opacity: COLLAPSE_ELEMENT_STYLE.OPACITY,
    zIndex: COLLAPSE_ELEMENT_STYLE.ZINDEX,
    left: this.getOffsetRight()
  });

  elementStyle = (coordinate) => ({
    top: coordinate,
    opacity: ELEMENT_STYLE.OPACITY,
    zIndex: coordinate,
    left: this.getOffsetRight()
  });

  onMouseDown = (domObject) => {
    this.addGlobalMouseAndScrollEvents();
    this.props.mouseEvent(MOUSE_ACTION.DOWN,this.props.item.system.indexRender,domObject);
  }

  onMouseMove = (domObject) => {
    this.props.mouseEvent(MOUSE_ACTION.MOVE,this.props.item.system.indexRender,domObject);
  }

  onMouseUp = (domObject) => {
    this.removeGlobalMouseAndScrollEvents();
    this.props.mouseEvent(MOUSE_ACTION.UP,this.props.item.system.indexRender,domObject);
  }

  addGlobalMouseAndScrollEvents = () => {
    window.addEventListener(MOUSE_EVENT.MOVE,this.onMouseMove);
    window.addEventListener(MOUSE_EVENT.SCROLL,this.onMouseMove);
    window.addEventListener(MOUSE_EVENT.UP,this.onMouseUp);
  }

  removeGlobalMouseAndScrollEvents = () => {
    window.removeEventListener(MOUSE_EVENT.MOVE,this.onMouseMove);
    window.removeEventListener(MOUSE_EVENT.SCROLL,this.onMouseMove);
    window.removeEventListener(MOUSE_EVENT.UP,this.onMouseUp);
  }

  caretMouseClick = (e) => this.props.mouseEvent(MOUSE_ACTION.CLICK_CARET,this.props.item.system.indexRender,e);

  renderCaret = () => (
      <i
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => this.caretMouseClick(e)}
        className={this.getCaretClassName(this.props.item)}
        aria-hidden={true}
      >
      </i>
  );

  renderNumber = () => <div className={this.props.setting.numberClassName}>{this.props.item.system.indexRender}</div>;

  renderValue = () => <div className={this.props.setting.valueClassName}>{this.props.item.value}</div>
  render = () => {
    return (
      <div
        className={this.getElementClassName(this.props.item)}
        style={this.getRenderStyle(this.props.item)}
        onMouseDown={this.onMouseDown}
      >
        <div>{this.renderNumber()}</div>
        <div>{this.props.isParent ? this.renderCaret() : null}</div>
        <div>{this.renderValue()}</div>
      </div>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import Hierarchy from './react-hierarchy-tree/react-hierarchy-tree';
import './style.css';
import "font-awesome/css/font-awesome.min.css";

class Main extends React.Component {
  constructor() {
    super();
    this.arraySource = [];
  }

  componentDidMount = () => {
    this.refs.textareaHierarchy.value = JSON.stringify(this.refs.hierarchy.getHierarchyArray(),null,2);
    this.refs.textareaHierarchySource.value = JSON.stringify(this.refs.hierarchy.getHierarchySourceArray(),null,2);
  }

  render() {
    return (
      <div className={"container-fluid"}>
        <div className={"row control-keyboard"} >
          <div className={"col-1 title-control-keyboard"}>
            {"Control"}
          </div>
          <div className={"col-10 info-control-keyboard"}>
            <div className={"row"}>
              <div className={"col-2 keyboard"}>
                  <ControlKey
                    href={"https://www.wpclipart.com/computer/keyboard_keys/large_keys/computer_key_Enter.png"}
                    height={32}
                    alt={""}
                    keyInfo = {"Add"}
                  />
              </div>
              <div className={"col-2 keyboard"}>
                  <ControlKey
                    href={"https://www.wpclipart.com/computer/keyboard_keys/special_keys/computer_key_Delete.png"}
                    height={32}
                    alt={""}
                    keyInfo = {"Delete"}
                  />
              </div>
              <div className={"col-2 keyboard"}>
                  <ControlKey
                    href={"https://www.wpclipart.com/computer/keyboard_keys/arrow_keys/computer_key_Arrow_Up.png"}
                    height={32}
                    alt={""}
                    keyInfo = {"Active Up Element"}
                  />
              </div>
              <div className={"col-2 keyboard"}>
                  <ControlKey
                    href={"https://www.wpclipart.com/computer/keyboard_keys/arrow_keys/computer_key_Arrow_Down.png"}
                    height={32}
                    alt={""}
                    keyInfo = {"Active Down Element"}
                  />
              </div>
              <div className={"col-2 keyboard"}>
                  <ControlKey
                    href={"https://www.wpclipart.com/computer/keyboard_keys/arrow_keys/computer_key_Arrow_Left.png"}
                    height={32}
                    alt={""}
                    keyInfo = {"Move Hierarchy Left"}
                  />
              </div>
              <div className={"col-2 keyboard"}>
                  <ControlKey
                    href={"https://www.wpclipart.com/computer/keyboard_keys/arrow_keys/computer_key_Arrow_Right.png"}
                    height={32}
                    alt={""}
                    keyInfo = {"Move Hierarchy Right"}
                  />
              </div>
            </div>
          </div>
          <a href={"https://github.com/kolynchick/react-hierarchy-tree"} className={"col-1 btn btn-secondary title-control-keyboard button-action"} style={{border: "none",borderRadius: "0",cursor: "pointer"}}>
            {"Github"}
          </a>
        </div>
        <div className={"row"} style={{margin: "0em",marginBottom: "1em"}}>
          <div className={"col-12"}>
            <div className="input-group" style={{border: "2px solid #999999",borderRadius: "5px"}}>
              <input type="text" ref = {"valueInfo"} className="form-control" style={{border: "none"}}/>
              <span className="input-group-btn">
                <button className="btn btn-secondary button-action" type="button" onClick={
                  () => {
                    this.refs.hierarchy.addElement(this.refs.valueInfo.value);
                    this.refs.valueInfo.value = "";
                  }
                }>{"Add"}</button>
              </span>
              <span className="input-group-btn">
                <button className="btn btn-secondary button-action" type="button" onClick={
                  () => this.refs.hierarchy.deleteELement()
                }>{"Delete"}</button>
              </span>
            </div>
          </div>
        </div>
        <div className={"row"} style={{margin: "1em"}}>
          <Hierarchy
            ref = {"hierarchy"}
            elements = {
              [
                {value: "111",
                children: [
                  {value: "112"},
                  {value: "113"},
                  {value: "114"}
                ]
               },
                {value: "222"},
                {value: "333"},
                {value: "444"}
              ]
            }
            elementHeight = {50}
            elementOffsetRight = {0}
            elementOffsetBottom = {10}
            callbackHierarchy = {(array,arraySource) => {
              if (this.refs.textareaHierarchy !== undefined) {
                this.refs.textareaHierarchy.value = JSON.stringify(array,null,2);
                this.refs.textareaHierarchySource.value = JSON.stringify(arraySource,null,2);
              }
            }}
            containerClassName = {"container"}
            elementClassName = {"element"}
            elementActiveClassName = {"checked"}
            elementIntersectionClassName = {"checked_intersection"}
            caretClassName = {"fa fa-caret-down fa-2x caret-animated caret"}
            caretCollapseClassName = {"caret-hover"}
            numberClassName = {"badge badge-pill badge-info number"}
            valueClassName = {"element-value"}
          />
        </div>
        <div className={"row"} style={{margin: "0em",marginBottom: "1em"}}>
          <div className={"col-6"}>
            <div className={"textarea-title"}>{"Source format:"}</div>
            <textarea ref={"textareaHierarchy"} className={"form-control textarea-scroll"} id="message-text" rows="20"></textarea>
          </div>
          <div className={"col-6"}>
            <div className={"textarea-title"}>{"Output format:"}</div>
            <textarea ref={"textareaHierarchySource"} className={"form-control textarea-scroll"} id="message-text" rows="20"></textarea>
          </div>
        </div>
      </div>
    );
  }
}

const ControlKey = (props) => (
  <div>
    <img src={props.href} height={props.height} alt={props.alt}/>
    {props.keyInfo}
  </div>
);

ReactDOM.render(<Main/>, document.getElementById('root'));

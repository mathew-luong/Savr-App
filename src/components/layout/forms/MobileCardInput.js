import { useRef } from "react";
import ContentDropdown from "../ContentDropdown";
import classes from "./MobileCardInput.module.css";

function MobileCardInput(props) {
  let displayedElement;
  let currentValsObject = props.currentValues[props.objectIndex];
  let currentKeys = Object.keys(currentValsObject);
  let currentVal = currentValsObject[currentKeys[props.inputIndex]];

  let refDate = useRef();

  function handleInputChange(e, key){
    props.updateCurrentValues((previousValues) =>{
      let newState = [];
      for(let i =0; i< previousValues.length; i++){
        if(i === props.objectIndex){
          previousValues[i][key] = e.target.value
        }
        newState.push(previousValues[i])
      }
      return newState;
    })

  }

  if (props.entryType === "category") {
    displayedElement = (
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor={props.entryTitle}>
          {props.entryTitle}
        </label>
        <br></br>
        <ContentDropdown
          width="85%"
          toggleValue={currentValsObject["category"]}
          currentValues={props.currentValues}
          updateCurrentValues={props.updateCurrentValues}
          index={props.objectIndex}
        />
      </div>
    );
  } else if(props.entryType==="date"){
    displayedElement = (
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor={props.entryTitle}>
          {props.entryTitle}
        </label>
        <br></br>
        <input
          className={classes.input}
          type= "text"
          ref = {refDate}
          placeholder={currentVal}
          onBlur={(e) => handleInputChange(e, currentKeys[props.inputIndex])}
          onFocus = {() => (refDate.current.type="date")}
          id={props.entryTitle}
        ></input>
      </div>
    );
  } else {
    displayedElement = (
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor={props.entryTitle}>
          {props.entryTitle}
        </label>
        <br></br>
        <input
          className={classes.input}
          type={props.entryType}
          placeholder = {currentVal}
          onBlur={(e) => handleInputChange(e, currentKeys[props.inputIndex])}
          id={props.entryTitle}
        ></input>
      </div>
    );
  }

  return displayedElement;
}

export default MobileCardInput;

import { useRef } from "react";
import ContentDropdown from "../ContentDropdown";
import classes from "./FormInputs.module.css";

function FormInputs(props) {
  let textAreas = [];
  let areaDiv;
  let textAreaWidth = (1 / props.areas) * 100 - 1;
  let textAreaWidthString = textAreaWidth + "%";
  let currentValsObject = props.currentValues[props.index];
  let currentVals = Object.keys(currentValsObject);

  let refDate = useRef();

  function handleInputChange(e, key) {
    props.updateCurrentValues((previousValues) => {
      let newState = [];
      for (let i = 0; i < previousValues.length; i++) {
        if (i === props.index) {
          previousValues[i][key] = e.target.value;
        }
        newState.push(previousValues[i]);
      }
      return newState;
    });
  }

  for (let i = 0; i < props.areas; i++) {
    if (props.inputTypes[i] === "category") {
      areaDiv = (
        <ContentDropdown
          width={textAreaWidthString}
          formCard="true"
          toggleValue={currentValsObject["category"]}
          currentValues={props.currentValues}
          updateCurrentValues={props.updateCurrentValues}
          index={props.index}
        />
      );
    } else if (props.inputTypes[i] === "date") {
      areaDiv = (
        <>
          <input
            style={{ width: textAreaWidthString }}
            type="text"
            className={classes.textAreas}
            placeholder={currentValsObject[currentVals[i]]}
            onBlur={(e) => handleInputChange(e, currentVals[i])}
            required
            ref={refDate}
            onFocus={() => (refDate.current.type = "date")}
            key={i}
            id = {i}
          ></input>
        </>
      );
    } else {
      areaDiv = (
        <>
          <label htmlFor={i}>

          </label>
          <input
            style={{ width: textAreaWidthString }}
            type={props.inputTypes[i]}
            className={classes.textAreas}
            placeholder={currentValsObject[currentVals[i]]}
            onBlur={(e) => handleInputChange(e, currentVals[i])}
            key={i}
            id = {i}
          ></input>
        </>
      );
    }

    textAreas.push(areaDiv);
  }
  return (
    <div key={Math.random()} className={classes.wrapper}>
      <form className={classes.formFlex} key={Math.random()}>
        {textAreas}
      </form>
    </div>
  );
}

export default FormInputs;

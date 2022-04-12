import classes from "./InlineInputs.module.css";

export default function InlineInputs(props) {
  let currentObject = props.currentValues[props.objectIndex];
  let currentVals = Object.keys(currentObject);

  function handleInputChange(e, key) {
    props.updateCurrentValues((previousValues) => {
      let newState = [];
      for (let i = 0; i < previousValues.length; i++) {
        if (i === props.objectIndex) {
          previousValues[i][key] = e.target.value;
        }
        newState.push(previousValues[i])
      }
      return newState;
    });
  }

  return (
    <form className={classes.containerDiv}>
      <label htmlFor="inp" className={classes.label}>
        {props.label}
      </label>
      <input
        id="inp"
        required
        type={props.inputType}
        placeholder={currentObject[currentVals[props.inputIndex]]}
        onBlur = {(e) => handleInputChange(e, currentVals[props.inputIndex])}
        className={classes.input}
      ></input>
    </form>
  );
}

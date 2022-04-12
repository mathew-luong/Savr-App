import classes from "./MobileFormInputsList.module.css";
import MobileCardInput from "./MobileCardInput";

function MobileFormInputsList(props) {
  let inputForms = [];
  for (let i = 0; i < props.formsNum; i++) {
    inputForms.push(
      <div key={i} className={classes.inputsLines}>
        {props.titles.map((entryTitle, j) => {
          return (
            <MobileCardInput
              entryTitle={entryTitle}
              key={j}
              entryType={props.entryTypes[j]}
              currentValues = {props.currentValues}
              updateCurrentValues = {props.updateCurrentValues}
              objectIndex = {i}
              inputIndex = {j}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.formHolder}>
      {inputForms.map((inputForm) => {
        return inputForm;
      })}
    </div>
  );
}

export default MobileFormInputsList;

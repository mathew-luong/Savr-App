import InlineInputs from "./InlineInputs";
import MobileCardInput from "./MobileCardInput";
import classes from "./SavingsAndInvDepositsForm.module.css";

export default function SavingsAndInvDepositsForm(props) {
  console.log(props.currentValues);
  return (
    <div className={classes.baseContainer}>
      <h4>{props.title}</h4>
      {props.labels.map((formLabel, i) => {
        return (
          <>
            <div className={classes.lineContainer} key={i}>
              <InlineInputs
                label={formLabel}
                inputType={props.inputTypes[i]}
                currentValues={props.currentValues}
                updateCurrentValues={props.updateCurrentValues}
                objectIndex={0}
                inputIndex={i}
              />
            </div>
            <div className={classes.mobileInput}>
              <MobileCardInput
                entryTitle={formLabel}
                entryType={props.inputTypes[i]}
                currentValues={props.currentValues}
                updateCurrentValues={props.updateCurrentValues}
                objectIndex={0}
                inputIndex={i}
              />
            </div>
          </>
        );
      })}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className={classes.formButton}>Submit</button>
      </div>
    </div>
  );
}

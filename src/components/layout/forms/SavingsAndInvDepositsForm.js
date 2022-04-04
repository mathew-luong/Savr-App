import InlineInputs from "./InlineInputs";
import classes from "./SavingsAndInvDepositsForm.module.css";

export default function SavingsAndInvDepositsForm(props) {
  return (
    <div className={classes.baseContainer}>
      <h4>{props.title}</h4>
      {props.labels.map((formLabel) => {
        return (
          <div className={classes.lineContainer}>
            <InlineInputs label={formLabel} />
          </div>
        );
      })}
      <div style={{display:"flex", justifyContent:"flex-end"}}>
        <button className={classes.formButton}>Submit</button>
      </div>
    </div>
  );
}

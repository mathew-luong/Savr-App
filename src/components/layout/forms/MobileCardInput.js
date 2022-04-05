import ContentDropdown from "../ContentDropdown";
import classes from "./MobileCardInput.module.css";

function MobileCardInput(props) {
  let displayedElement;

  if (props.entryType === "category") {
    displayedElement = (
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor={props.entryTitle}>
          {props.entryTitle}
        </label>
        <br></br>
        <ContentDropdown width="85%" />
      </div>
    );
  } else {
    displayedElement = (
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor={props.entryTitle}>
          {props.entryTitle}
        </label>
        <br></br>
        <input className={classes.input} type = {props.entryType} id={props.entryTitle}></input>
      </div>
    );
  }

  return displayedElement;
}

export default MobileCardInput;

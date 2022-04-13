import classes from "./MobileFormCard.module.css";
import MobileFormInputsList from "./MobileFormInputsList";

function MobileFormCard(props) {
  const formAdder = () => {
    props.updateCurrentValues((previousValues) => {
      return [...previousValues, props.baseNewObject];
    });
  };

  return (
    <div className={classes.baseCardContainer}>
      <h4 style={{ margin: "1rem" }}>{props.title}</h4>
      <div>
        <MobileFormInputsList
          titles={props.formTitles}
          formsNum={props.currentValues.length}
          entryTypes={props.entryTypes}
          currentValues = {props.currentValues}
          updateCurrentValues = {props.updateCurrentValues}
        />
      </div>
      <button onClick={formAdder} className={classes.newFormButton}>
        +
      </button>
    </div>
  );
}

export default MobileFormCard;

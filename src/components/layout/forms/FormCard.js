
import classes from "./FormCard.module.css";
import FormInputList from "./FormInputList";

function FormCard(props) {

  //State will be in the form card

  let itemWidth;
  let numItems = props.titles.length;
  itemWidth = (1 / numItems) * 100;
  let widthString = itemWidth + "%";

  const formAdder = () => {
    props.updateCurrentValues(previousValues => {
      return [...previousValues, props.baseNewObject]
    })
  };

  return (
    <div className={classes.baseCardContainer}>
      <h4 style={{ margin: "1rem" }}>{props.title}</h4>
      <div className={classes.titlesDiv}>
        {props.titles.map((title,i) => {
          return (
            <div style={{ width: widthString }} className={classes.flexTemp} key = {i}>
              <div className={classes.indvTitles}>{title}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.formHolder}>
        <FormInputList
          lines={props.currentValues.length}
          numItems={numItems}
          inputTypes={props.inputTypes}
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
export default FormCard;

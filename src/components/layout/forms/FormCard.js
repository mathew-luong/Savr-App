import { useState } from "react";
import classes from "./FormCard.module.css";
import FormInputList from "./FormInputList";

function FormCard(props) {

  let [numLines, setLines] = useState(1);
  

  let itemWidth;
  let numItems = props.titles.length;
  itemWidth = (1 / numItems) * 100;
  let widthString = itemWidth + "%";

  const formAdder = () => {
    setLines(numLines+=1);
  }

  return (
    <div className={classes.baseCardContainer}>
      <h4 style={{ margin: "1rem" }}>{props.title}</h4>
      <div className={classes.titlesDiv}>
        {props.titles.map((title) => {
          return (
            <div style={{ width: widthString }} className={classes.flexTemp}>
              <div className={classes.indvTitles}>{title}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.formHolder}>
        <FormInputList lines = {numLines} numItems ={numItems}/>
      </div>
      <button onClick={formAdder} className={classes.newFormButton}>+</button>
    </div>
  );
}
export default FormCard;

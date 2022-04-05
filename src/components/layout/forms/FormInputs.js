import ContentDropdown from "../ContentDropdown";
import classes from "./FormInputs.module.css";

function FormInputs(props) {
  let textAreas = [];
  let areaDiv;
  let textAreaWidth = (1 / props.areas) * 100 - 1;
  let textAreaWidthString = textAreaWidth + "%";

  for (let i = 0; i < props.areas; i++) {

    if (props.inputTypes[i] === "category"){
      areaDiv = <ContentDropdown width = {textAreaWidthString} formCard = "true"/>
    }
    else{
      areaDiv = (
        <>
          <input
            style={{ width: textAreaWidthString }}
            type={props.inputTypes[i]}
            className={classes.textAreas}
            required
            key={i}
          ></input>
        </>
      );
    }
    textAreas.push(areaDiv);
  }
  return (
    <div key={Math.random()} className ={classes.wrapper}>
      <form className={classes.formFlex} key={Math.random()}>
        {textAreas}
      </form>
    </div>
  );
}

export default FormInputs;

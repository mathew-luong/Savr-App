import { Dropdown } from "react-bootstrap";
import classes from "./ContentDropdown.module.css"

export default function ContentDropdown(props) {

    let formCard = props.formCard === "true" ? true : false;

    let categories = [
        "Transportation",
        "Entertainment",
        "Food",
        "Rent",
        "Gas",
        "Travel",
        "Groceries",
        "Household",
        "Utilities",
        "Education",
        "Family",
        "Bills",
        "Personal",
        "Other",
      ];
    
    function clickHandler(e, category){
        e.preventDefault();
        props.updateCurrentValues(previousValues => {
          let newState = []
          for(let i=0; i<previousValues.length; i++){
            if(i === props.index){
              previousValues[i]["category"] = category
            }
            newState.push(previousValues[i]);
          }
          return newState;
        })
    }

  return (
      <Dropdown style={{width: props.width}}>
        <Dropdown.Toggle variant="secondary" className={classes.button} style = {formCard ? {marginTop:"10px"}: {marginTop:"0px"}}>
            {props.toggleValue}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" className = {classes.ddmenu}>
            {categories.map((cat, i) => {
                return <Dropdown.Item key={i} onClick = {(e) => clickHandler(e, cat)} >{cat}</Dropdown.Item>
            })}
        </Dropdown.Menu>
      </Dropdown>
  );
}

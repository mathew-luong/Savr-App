import classes from "./MobileFormInputsList.module.css"
import MobileCardInput from "./MobileCardInput";

function MobileFormInputsList(props) {
    
    let inputForms = [];
    let fullForm = (
    <>
      {props.titles.map((entryTitle) => {
        return <MobileCardInput entryTitle={entryTitle} horizontal = "true"/>;
      })}
    </>
    );
    for(let i=0;i<props.formsNum;i++){
        inputForms.push(fullForm)
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

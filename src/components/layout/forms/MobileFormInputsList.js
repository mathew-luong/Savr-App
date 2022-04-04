import classes from "./MobileFormInputsList.module.css"
import MobileCardInput from "./MobileCardInput";

function MobileFormInputsList(props) {
    
    let inputForms = [];
    // let fullForm = (
    //     <div>
    //     {props.titles.map((entryTitle,i) => {
    //         return <MobileCardInput entryTitle={entryTitle} key={i}/>;
    //     })}
    //     </div>
    // );
    for(let i=0;i<props.formsNum;i++){
        // inputForms.push(fullForm)
        inputForms.push(
            <div key={i}>
            {props.titles.map((entryTitle,i) => {
                return <MobileCardInput entryTitle={entryTitle} key={i}/>;
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
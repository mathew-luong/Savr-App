import classes from "./MobileFormCard.module.css"
import { useState } from "react";
import MobileFormInputsList from "./MobileFormInputsList";

function MobileFormCard(props){

    let [numForms, setNewForms] = useState(1);
    let titles = props.formTitles;
    const formAdder=()=>{
        setNewForms(numForms+=1);
    }

    return(
        <div className={classes.baseCardContainer}>
            <h4 style={{margin:"1rem"}}>{props.title}</h4>
            <div>
                <MobileFormInputsList titles ={titles} formsNum = {numForms}/>
            </div>
            <button onClick={formAdder} className={classes.newFormButton}>+</button>
        </div>
    );

}

export default MobileFormCard;
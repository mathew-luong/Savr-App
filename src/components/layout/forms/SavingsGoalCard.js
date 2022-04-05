import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons';
import classes from "./SavingsGoalCard.module.css"
import MobileFormInputsList from './MobileFormInputsList';

function SavingsGoalCard(){

    let titles = ['Savings Goals:', 'By:']
    let types = ["number", "date"]

    return(
        <div className = {classes.baseCardContainer}>
            <div style={{width:"50%"}}>  
                <FontAwesomeIcon icon = {faHandHoldingDollar} className={classes.cardIcon}/>
            </div>
            <div style = {{width:"50%"}} className={classes.formDiv}>
                <MobileFormInputsList titles = {titles} formsNum = {1} className ={classes.form} entryTypes = {types}/>
            </div>
        </div>
    );

}
export default SavingsGoalCard;
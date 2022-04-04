import MobileFormInputsList from "./MobileFormInputsList";
import classes from "./SavingsAndInvestmentsForm.module.css"

function SavingsAndInvestmentsForm(){

    let titleSavings = ['Savings Amount']
    let titleInvestments = ['What is the value of your investment portfolio now?']

    return(
        <div className={classes.baseCardContainer}>
            <h4 style={{margin:"1rem"}}>Savings and Investments</h4>
            <div className={classes.flexWrapper}>
                <div className = {classes.savingsFlex}>
                    <MobileFormInputsList titles = {titleSavings} formsNum = {1}  />
                </div>
                <div className = {classes.investmentsFlex}>
                    <MobileFormInputsList titles = {titleInvestments} formsNum = {1} />
                </div>
            </div>
        </div>
    );

}

export default SavingsAndInvestmentsForm;
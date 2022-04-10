import MobileCardInput from "./MobileCardInput";
// import MobileFormInputsList from "./MobileFormInputsList";
import classes from "./SavingsAndInvestmentsForm.module.css";

function SavingsAndInvestmentsForm(props) {
  let titleSavings = "Savings Amount";
  let titleInvestments = "What is the value of your investment portfolio now?";

  return (
    <div className={classes.baseCardContainer}>
      <h4 style={{ margin: "1rem" }}>Savings and Investments</h4>
      <div className={classes.flexWrapper}>
        <div className={classes.savingsFlex}>
          <MobileCardInput
            entryTitle={titleSavings}
            entryType="number"
            currentValues = {props.currentValues}
            updateCurrentValues = {props.updateCurrentValues}
            objectIndex = {0}
            inputIndex = {0}
          />
        </div>
        <div className={classes.investmentsFlex}>
          <MobileCardInput
            entryTitle={titleInvestments}
            entryType="number"
            currentValues = {props.currentValues}
            updateCurrentValues = {props.updateCurrentValues}
            objectIndex = {0}
            inputIndex = {1}
          />
        </div>
      </div>
    </div>
  );
}

export default SavingsAndInvestmentsForm;

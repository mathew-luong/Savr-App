import InlineInputs from "./InlineInputs";
import MobileCardInput from "./MobileCardInput";
import classes from "./SavingsAndInvDepositsForm.module.css";
import GeneralContext from "../../../services/userContext";
import { useContext } from "react";
import { postInvestmentsDeposits, postSavingsDeposits } from "../../../services/savingsPage";

export default function SavingsAndInvDepositsForm(props) {

  let generalContext = useContext(GeneralContext)
  let userID = generalContext.userID;
  console.log(userID)

  async function handleSubmit(){
    let stateKeys = Object.keys(props.currentValues[0])
    let res;
    if(stateKeys.length === 1){
      res = await postSavingsDeposits(props.currentValues[0], userID)
      console.log(res)
      props.updateCurrentValues([{ savingsDeposit: "" }])
    }
    else{
      res = await postInvestmentsDeposits(props.currentValues[0], userID)
      console.log(res)
      props.updateCurrentValues([
        {
          prevValue: "",
          investmentsDeposit: "",
        },
      ])
    }
    props.buttonChange(previosVal => {
      return !previosVal
    })
  }

  console.log(props.currentValues);
  return (
    <div className={classes.baseContainer}>
      <h4>{props.title}</h4>
      {props.labels.map((formLabel, i) => {
        return (
          <>
            <div className={classes.lineContainer} key={i}>
              <InlineInputs
                label={formLabel}
                inputType={props.inputTypes[i]}
                currentValues={props.currentValues}
                updateCurrentValues={props.updateCurrentValues}
                objectIndex={0}
                inputIndex={i}
              />
            </div>
            <div className={classes.mobileInput}>
              <MobileCardInput
                entryTitle={formLabel}
                entryType={props.inputTypes[i]}
                currentValues={props.currentValues}
                updateCurrentValues={props.updateCurrentValues}
                objectIndex={0}
                inputIndex={i}
              />
            </div>
          </>
        );
      })}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className={classes.formButton} onClick = {handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

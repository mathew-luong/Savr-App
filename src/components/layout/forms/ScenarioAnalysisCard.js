import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import InlineInputs from "./InlineInputs";
import MobileCardInput from "./MobileCardInput.js";
import classes from "./ScenarioAnalysisCard.module.css";


function ScenarioAnalysisCard() {
  let [analysisState, setAnalysisState] = useState([
    {
      savingsDeposits: "",
      investmentsDeposits: "",
    },
  ]);

  console.log(analysisState)

  return (
    <div className={classes.baseContainer}>
      <Row>
        <Col lg={7} style={{ position: "relative", height: "15rem" }}>
          <div className={classes.formWrapper}>
            <h4>Scenario Analysis</h4>
            <div className={classes.desktopInput}>
              <InlineInputs
                label="Amounts to deposit on savings per month"
                inputType="number"
                currentValues = {analysisState}
                updateCurrentValues = {setAnalysisState}
                objectIndex = {0}
                inputIndex = {0}
              />
              <InlineInputs
                label="Amounts to add on investments per month"
                inputType="number"
                currentValues = {analysisState}
                updateCurrentValues = {setAnalysisState}
                objectIndex = {0}
                inputIndex ={1}
              />
            </div>
            <div className={classes.mobileInput}>
              <MobileCardInput
                entryTitle="Amounts to deposit on savings per month"
                entryType="number"
                currentValues = {analysisState}
                updateCurrentValues = {setAnalysisState}
                objectIndex = {0}
                inputIndex ={0}
              />
              <MobileCardInput
                entryTitle="Amounts to deposit on investments per month"
                entryType="number"
                currentValues = {analysisState}
                updateCurrentValues = {setAnalysisState}
                objectIndex = {0}
                inputIndex ={1}
              />
            </div>
            <div className={classes.buttonHolder}>
              <button className={classes.formButton}>Use Averages</button>
              <button className={classes.formButton}>Calculate Rate</button>
            </div>
          </div>
        </Col>
        <Col lg={5}>
          <div className={classes.flexWrapper}>
            <div className={classes.infoHolder}>
              <div className={classes.textHolder}>
                You will require a 5% annual, or 0.41% monthly return to achieve
                your savings goals. We deem this very likely
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ScenarioAnalysisCard;

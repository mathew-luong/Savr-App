import { useContext, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormCard from "../components/layout/forms/FormCard";
import MobileFormCard from "../components/layout/forms/MobileFormCard";
import SavingsAndInvestmentsForm from "../components/layout/forms/SavingsAndInvestmentsForm";
import SavingsGoalCard from "../components/layout/forms/SavingsGoalCard";
import GeneralContext from "../services/userContext"
import { generalEmptyChecker, 
  mapExpenseTargets, 
  submitExpenseTargets, 
  submitSavings, 
  submitInvestments,
  savingsGoalsSubmission } from "../services/startUpPage";
import {mapPrecisionExpenses, 
  mapIncomeEntries, 
  submitPrecisionExpenses, 
  submitIncomeEntries} from "../services/expensesPage.js";
import {useNavigate } from 'react-router-dom';

function StartPage() {

  let navigate = useNavigate();
  let titlesIncome = ["Income Amount", "Income Stream Name", "Date"];
  let incomeTypes = ["number", "text", "date"];
  let title = "Income Entry";

  let titlesExpenses = ["Date", "Expense Name", "Category", "Amount"];
  let expenseTypes = ["date", "text", "category", "number"];
  let expenseFormTitle = "Expense Entries";

  let targetTitles = ["Category", "Target %"];
  let targetTypes = ["category", "number"];

  let [incomeState, setIncomeState] = useState([
    { amount: "", streamName: "", date: "" },
  ]);

  let [expenseState, setExpenseState] = useState([
    {
      date: "",
      expenseName: "",
      category: "Enter a new category",
      amount: "",
    },
  ]);

  let [expenseTargetState, setExpenseTargetState] = useState([
    {
      category: "Enter a new category",
      target: "",
    },
  ]);

  let [savingsTarget, setSavingsTarget] = useState([
    {
      goal: "",
      goalDate: "",
    },
  ]);

  let [savingsState, setSavingsState] = useState([
    {
      portfolio:"",
      savings:""
    }
  ])

  console.log(incomeState);
  console.log(expenseState);
  console.log(expenseTargetState);
  console.log(savingsTarget)
  console.log(savingsState)
  let generalContext = useContext(GeneralContext);
  let currentUserId = generalContext.userID;
  console.log(generalContext.userID)


  async function handleBatchSubmission(e){
    e.preventDefault();

    let emptyChecks = []
    let submissionStrings = []

    let precisionSubmission = mapPrecisionExpenses(expenseState, currentUserId)
    emptyChecks.push(precisionSubmission)
    let incomeSubmission = mapIncomeEntries(incomeState, currentUserId)
    emptyChecks.push(incomeSubmission)
    let expenseTargetEmptyCheck = mapExpenseTargets(expenseTargetState, currentUserId)
    emptyChecks.push(expenseTargetEmptyCheck)
    let savingsTargetEmptyCheck = generalEmptyChecker(savingsTarget[0])
    emptyChecks.push(savingsTargetEmptyCheck)
    let savingsStateEmptyCheck = generalEmptyChecker(savingsState[0])
    emptyChecks.push(savingsStateEmptyCheck)
    
    let expenseString = "expenses"
    submissionStrings.push(expenseString)
    let incomeString = "income"
    submissionStrings.push(incomeString)
    let expenseTargetString = "expense targets"
    submissionStrings.push(expenseTargetString)
    let savingsTargetString = "savings goal"
    submissionStrings.push(savingsTargetString)
    let savingsStateTargetString = "investment and savings value"
    submissionStrings.push(savingsStateTargetString)
  
    let templateAlertString = (submissString) => {return `The ${submissString} submission form has an empty field(s). Thus, we could not submit it`}

    let submissionObjects = submissionStrings.map((submissionName, i)=>{
      return {
        emptyCheck: emptyChecks[i],
        submissionString: submissionName, 
        alertString: emptyChecks[i] === false ? templateAlertString(submissionName) : "",
      }
    })

    if(submissionObjects[0]["emptyCheck"] !== false){
      let expenseSubmissionRes = await submitPrecisionExpenses(submissionObjects[0]["emptyCheck"])
      console.log(expenseSubmissionRes)
    }
    if(submissionObjects[1]["emptyCheck"] !== false){
      let incomeSubmissionRes = await submitIncomeEntries(submissionObjects[1]["emptyCheck"])
      console.log(incomeSubmissionRes)
    }
    if(submissionObjects[2]["emptyCheck"] !== false){
      let expenseTargetSubmissionRes = await submitExpenseTargets(submissionObjects[2]["emptyCheck"])
      console.log(expenseTargetSubmissionRes)
    }
    if(submissionObjects[3]["emptyCheck"] !== false){
      let savingsTargetSubmissionRes = await savingsGoalsSubmission(savingsTarget[0], currentUserId)
      console.log(savingsTargetSubmissionRes)
    }
    if(submissionObjects[4]["emptyCheck"] !== false){
      let savingsSubmissionRes = await submitSavings(savingsState[0]["savings"], currentUserId)
      console.log(savingsSubmissionRes)

      let investmentSubmissionRes = await submitInvestments(savingsState[0]["portfolio"], currentUserId)
      console.log(investmentSubmissionRes)
    }

    let alertStrings = submissionObjects.map((subObject) =>{
      return subObject["alertString"]
    })

    let jointAlertString = alertStrings.join("\n")
    alert(jointAlertString)
    navigate('/dashboard')
  }
  

  return (
    <div className="startContainer">
      <Container style={{ marginTop: "2rem" }}>
        <Row>
          <Col>
            <h2 className="SavrHeader">Savr</h2>
            <h2 style={{ marginTop: "2rem" }}>
              Let's get started! Please enter the following information to set
              up your dashboard...
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="inputDesktopCard">
              <FormCard
                titles={titlesIncome}
                title={title}
                inputTypes={incomeTypes}
                currentValues={incomeState}
                updateCurrentValues={setIncomeState}
                baseNewObject={{
                  amount: "",
                  streamName: "",
                  date: "",
                }}
              />
            </div>
            <div className="inputMobileCard">
              <MobileFormCard
                title={title}
                formTitles={titlesIncome}
                entryTypes={incomeTypes}
                currentValues={incomeState}
                updateCurrentValues={setIncomeState}
                baseNewObject={{
                  amount: "",
                  streamName: "",
                  date: "",
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="inputDesktopCard">
              <FormCard
                titles={titlesExpenses}
                title={expenseFormTitle}
                inputTypes={expenseTypes}
                currentValues={expenseState}
                updateCurrentValues={setExpenseState}
                baseNewObject={{
                  date: "",
                  expenseName: "",
                  category: "Enter a new category",
                  amount: "",
                }}
              />
            </div>
            <div className="inputMobileCard">
              <MobileFormCard
                title={expenseFormTitle}
                formTitles={titlesExpenses}
                entryTypes={expenseTypes}
                currentValues={expenseState}
                updateCurrentValues={setExpenseState}
                baseNewObject={{
                  date: "",
                  expenseName: "",
                  category: "Enter a new category",
                  amount: "",
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <MobileFormCard
              title="Expense Target"
              formTitles={targetTitles}
              entryTypes={targetTypes}
              currentValues={expenseTargetState}
              updateCurrentValues={setExpenseTargetState}
              baseNewObject={{
                category: "Enter a new category",
                target: "",
              }}
            />
          </Col>
          <Col lg={6}>
            <SavingsGoalCard
              currentValues={savingsTarget}
              updateCurrentValues={setSavingsTarget}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SavingsAndInvestmentsForm
              currentValues = {savingsState}
              updateCurrentValues = {setSavingsState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/dashboard">
              <button style={{ marginTop: "1rem" }} 
              className="expManageBtn"
              onClick={handleBatchSubmission}>
                Submit
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default StartPage;

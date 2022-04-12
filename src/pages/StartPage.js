import { useContext, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormCard from "../components/layout/forms/FormCard";
import MobileFormCard from "../components/layout/forms/MobileFormCard";
import SavingsAndInvestmentsForm from "../components/layout/forms/SavingsAndInvestmentsForm";
import SavingsGoalCard from "../components/layout/forms/SavingsGoalCard";
import GeneralContext from "../services/userContext"

function StartPage() {
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
  console.log(generalContext.userID)


  

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
              <button style={{ marginTop: "1rem" }} className="expManageBtn">
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

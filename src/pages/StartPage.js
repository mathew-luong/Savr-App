import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import FormCard from "../components/layout/forms/FormCard";
import MobileFormCard from "../components/layout/forms/MobileFormCard";
import SavingsAndInvestmentsForm from "../components/layout/forms/SavingsAndInvestmentsForm";
import SavingsGoalCard from "../components/layout/forms/SavingsGoalCard";

function StartPage() {
  let titlesIncome = ["Income Amount", "Income Stream Name", "Date"];
  let incomeTypes = ["number", "text", "date"]
  let title = "Income Entry";

  let titlesExpenses = ["Date", "Expense Name", "Category", "Amount"];
  let expenseTypes = ["date", "text", "category", "number"]
  let expenseFormTitle = "Expense Entries";

  let targetTitles = ["Category", "Target %"];
  let targetTypes = ["category", "number"]

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
            <FormCard titles={titlesIncome} title={title} inputTypes = {incomeTypes}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormCard titles={titlesExpenses} title={expenseFormTitle} inputTypes ={expenseTypes} />
          </Col>
        </Row>
        <Row>
          <Col lg = {6}>
            <MobileFormCard title="Expense Target" formTitles={targetTitles} entryTypes = {targetTypes}/>
          </Col>
          <Col lg={6}>
              <SavingsGoalCard />
          </Col>
        </Row>
        <Row>
          <Col>
          <SavingsAndInvestmentsForm />
          </Col>
        </Row>
        <Row>
          <Col>
              <Link to = "/dashboard">
                <button style = {{marginTop:"1rem"}} className="expManageBtn">Submit</button>
              </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default StartPage;

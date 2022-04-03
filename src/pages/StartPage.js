import { Container, Row } from "react-bootstrap";
import FormCard from "../components/layout/forms/FormCard";
import MobileFormCard from "../components/layout/forms/MobileFormCard";
import SavingsAndInvestmentsForm from "../components/layout/forms/SavingsAndInvestmentsForm";
import SavingsGoalCard from "../components/layout/forms/SavingsGoalCard";

function StartPage() {

    let titlesIncome = ['Income Amount', 'Income Stream Name', 'Month']
    let title = 'Income Entry'

    let titlesExpenses = ['Date', 'Expense Name', 'Category', 'Amount']
    let expenseFormTitle = 'Expense Entries'

    let targetTitles = ['Category', 'Target %']

  return (
    <div className="startContainer">
      <h2 style={{ marginLeft: "2rem", marginTop: "1rem" }}>Savr</h2>
      <Container style={{ marginTop: "5rem" }}>
        <Row>
          <h2>
            Let's get started! Please enter the following information to set up
            your dashboard...
          </h2>
        </Row>
        <Row>
            <FormCard titles = {titlesIncome} title = {title}/>
        </Row>
        <Row>
            <FormCard titles ={titlesExpenses} title = {expenseFormTitle}/>
        </Row>
        <Row>
            <MobileFormCard title = "Expense Target" formTitles = {targetTitles}/>
        </Row>
        <Row>
            <SavingsAndInvestmentsForm />
        </Row>
        <Row>
          <SavingsGoalCard />
        </Row>
      </Container>
    </div>
  );
}
export default StartPage;

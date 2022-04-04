import { Container, Row, Col} from "react-bootstrap";
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
      
      <Container style ={{marginTop:"2rem"}}>
        <Row>
        <h2 className = "SavrHeader" >Savr</h2>
          <h2 style={{marginTop:"2rem"}}>
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
          <Col md = {5}>
            <SavingsGoalCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default StartPage;

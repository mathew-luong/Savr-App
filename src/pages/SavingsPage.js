import NavBar from "../components/layout/NavBar.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SavingsGoalDisplayCard from "../components/layout/SavingsGoalDisplayCard.js";
import SavingsInsightCard from "../components/layout/SavingsInsightCard.js";
import ScenarioAnalysisCard from "../components/layout/forms/ScenarioAnalysisCard.js";
import SavingsAndInvDepositsForm from "../components/layout/forms/SavingsAndInvDepositsForm.js";

function SavingsPage() {
  return (
    <div className="contentContainer">
      <NavBar />
      <Container fluid className="pageContainerSavings">
        <Row>
          <Col xl={8}>
            <h2>Your Savigns and Investments</h2>
            <br></br>
            <h4>
              Last month, you spent 10% less in entertainment than expected.
              Save it, or invest it!
            </h4>
          </Col>
          <Col className="destroyed">
            <SavingsGoalDisplayCard />
          </Col>
        </Row>
        <Row className="destroyed">
          <Col xl={2}>
            <SavingsInsightCard
              firstLine="Total Funds:"
              insightFigure="$242K"
            />
          </Col>
          <Col xl={2}>
            <SavingsInsightCard
              firstLine="You are"
              insightFigure="60.5%"
              lastLine="of your way there!"
            />
          </Col>
          <Col xl={4}>
            <SavingsInsightCard
              firstLine="On average, you have deposited"
              insightFigure="$1000"
              lastLine="in your savings account per month"
            />
          </Col>
          <Col xl={4}>
            <SavingsInsightCard
              firstLine="On average, you have deposited"
              insightFigure="$3000"
              lastLine="in your investments account per month"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ScenarioAnalysisCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <SavingsAndInvDepositsForm
              title="Savings Deposit"
              labels={["Amount to deposit on savings this month"]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
          <SavingsAndInvDepositsForm
              title="Investments Deposit"
              labels={["What is the value of your investment portfolio now? (Before deposit)",
               "Amount to deposit to your investments account right now"]}
            />
          </Col>
          
        </Row>
      </Container>
    </div>
  );
}
export default SavingsPage;

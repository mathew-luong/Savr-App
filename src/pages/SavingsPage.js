import NavBar from "../components/layout/NavBar.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SavingsGoalDisplayCard from "../components/layout/SavingsGoalDisplayCard.js";
import SavingsInsightCard from "../components/layout/SavingsInsightCard.js";
import ScenarioAnalysisCard from "../components/layout/forms/ScenarioAnalysisCard.js";
import SavingsAndInvDepositsForm from "../components/layout/forms/SavingsAndInvDepositsForm.js";
import Card from "../components/layout/Card.js";
import { Line } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { aggregateSameMonthData, getSavingsTimeSeries } from "../services/savingsPage.js";
import { labels, options } from "../components/Charts.js";
import GeneralContext from "../services/userContext.js";

// Charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

//Labels and LineChartDatas will change and will be direct pulls from the DB

var lineChartData = new Array(12);
lineChartData = [
  10000, 140000, 30000, 40000, 50000, 60000, 160000, 80000, 100000, 100000,
  110000, 100020,
];



export const lineDataSavings = {
  labels,
  datasets: [
    {
      data: lineChartData,
      backgroundColor: "#AD35E5", //"#E5355F"
      borderColor: "#AD35E5",
      borderRadius: 10,
      hoverBackgroundColor: "#AD35E5",
    },
  ],
};

function SavingsPage() {

  const lineData = (labels, data, color) => {
    return {
      labels,
      datasets: [
        {
          data: data ,
          backgroundColor: color,
          borderColor: color, 
          borderRadius: 10,
          hoverBackgroundColor: color,
        },
      ],
    };
    
  }

  let generalContext = useContext(GeneralContext);
  let userID = generalContext.userID;

  let [savingsState, setSavingsState] = useState([{ savingsDeposit: "" }]);
  let [investmentsState, setInvestmentsState] = useState([
    {
      prevValue: "",
      investmentsDeposit: "",
    },
  ]);

  let [savingsButtonSubmit, setSavingsButtonSubmit] = useState(true);
  let [investmentsButtonSubmit, setInvestmentsButtonSubmit] = useState(true);
  let [savingsMonths, setSavingsMonths] = useState();
  let [savingsTimeSeries, setSavingsSeries] = useState();


  useEffect(()=> {
    async function callSavingsTimeSeries(){
      let res = await getSavingsTimeSeries(userID, 6)
      console.log(res)
      return res
    }
    let response = callSavingsTimeSeries();
    response.then(res =>{

      let months = []
      let dataPoints = []

      res.data.map((obj)=>{
        months.push(obj['month'])
        dataPoints.push(obj['amount'])
      })

      setSavingsMonths(months);
      setSavingsSeries(dataPoints)

      console.log(res.data)
    })

  }, [savingsButtonSubmit])

  return (
    <div className="contentContainer">
      <NavBar />
      <Container fluid className="pageContainerSavings">
        <Row>
          <Col xl={8}>
            <h3>Your Savings and Investments</h3>
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
            <Card>
              <Row>
                <Col>
                  <h4>Investment Fund</h4>
                </Col>
                {/* <Col>
                  <div className="dbGoalTrack">
                    <span>YTD Return:</span>
                    <br />
                    <span className="dbGoalPercent">80%</span>
                  </div>
                </Col> */}
              </Row>
              {/* <Row> */}
              <div className="dbBarChartContainer">
                <Line
                  className="dbBarChart"
                  options={options}
                  data={lineDataSavings}
                />
              </div>
              {/* </Row> */}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Row>
                <Col>
                  <h4>Total Savings</h4>
                </Col>
                {/* <Col>
                  <div className="dbGoalTrack">
                    <span>Savings:</span>
                    <br />
                    <span className="dbGoalPercent">$110K</span>
                  </div>
                </Col> */}
              </Row>
              {/* <Row> */}
              <div className="dbBarChartContainer">
                <Line
                  className="dbBarChart"
                  options={options}
                  data={lineData(savingsMonths, savingsTimeSeries, "#AD35E5")}
                />
              </div>
              {/* </Row> */}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <SavingsAndInvDepositsForm
              title="Savings Deposit"
              labels={["Amount to deposit on savings this month"]}
              inputTypes={["number"]}
              currentValues={savingsState}
              updateCurrentValues={setSavingsState}
              buttonSubmit = {savingsButtonSubmit}
              buttonChange = {setSavingsButtonSubmit}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SavingsAndInvDepositsForm
              title="Investments Deposit"
              labels={[
                "What is the value of your investment portfolio now? (Before deposit)",
                "Amount to deposit to your investments account right now",
              ]}
              inputTypes = {["number", "number"]}
              currentValues={investmentsState}
              updateCurrentValues={setInvestmentsState}
              buttonSubmit = {investmentsButtonSubmit}
              buttonChange = {setInvestmentsButtonSubmit}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default SavingsPage;

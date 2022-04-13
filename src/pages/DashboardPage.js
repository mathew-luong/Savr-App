import NavBar from '../components/layout/NavBar.js';
import DBCardSm from '../components/layout/DashboardCardSm.js';
import Card from '../components/layout/Card.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GeneralContext from '../services/userContext.js';
import {getTopDashboardInsights, getIncomes, aggregateFunds } from "../services/dashboardPage";
import { useState } from 'react';
import { getInvestmentsTimeSeries, getSavingsTimeSeries } from "../services/savingsPage.js";

// https://react-chartjs-2.netlify.app/components/bar
import { Bar } from 'react-chartjs-2';
// https://react-chartjs-2.netlify.app/examples/line-chart
import { Line } from 'react-chartjs-2';

// Import configuration options and functions for barchart/linechart
import { updateBarChart, labels, options } from '../components/Charts.js';

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
}   from 'chart.js';
import { useContext, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend,  PointElement, LineElement);

// Array containing data for the balance barchart
var barChartData = new Array(12);
// Populate barchartdata (get data from db?)
barChartData = [10,200,30,40,50,60,700,80,900,100,110,120];

// Array containing data for the funds linechart
var lineChartData = new Array(12);
lineChartData = [10000,140000,30000,40000,50000,60000,160000,80000,100000,100000,110000,100020];

// Updates the data for the month June(6) by $200
updateBarChart(barChartData,6,200);





// Data for barchart
export const barData = {
    labels,
    datasets: [
      {
        data: barChartData,
        backgroundColor: '#FEE4FF',
        borderRadius: 10,
        hoverBackgroundColor: "#E5355F",
      },
    ]
};

// Data for linechart
export const lineData = {
    labels,
    datasets: [
      {
        data: lineChartData,
        backgroundColor: "#E5355F",
        borderColor: "#E5355F", //#AD35E5
        borderRadius: 10,
        hoverBackgroundColor: "#E5355F",
      },
    ],
};

function DashboardPage(){
    // Objects for props used for the small cards on the top of the dashboard page
    // Can be changed to props object later 

    const lineData = (labels, data) => {
        return {
          labels,
          datasets: [
            {
              data: data ,
              backgroundColor: "#E5355F",
              borderColor: "#E5355F", 
              borderRadius: 10,
              hoverBackgroundColor: "#E5355F",
            },
          ],
        }; 
      }
    
      const barData = (labels, data, color) => {
        return {
          labels,
          datasets: [
            {
              data: data ,
              backgroundColor: color,
              borderRadius: 10,
              hoverBackgroundColor: color,
            },
          ],
        }; 
      }

    

    let generalContext = useContext(GeneralContext)
    let currentUserId = generalContext.userID
    console.log(generalContext.userID)

    let [incomeDiff, setIncomeDiff] = useState([])
    let [expenseDiff, setExpensesDiff] = useState([])
    let [totalFundDiff, setFundsDiff] = useState([])
    let [incomeMonths, setIncomeMonths] = useState([])
    let [incomeDataPoints, setIncomeDataPoints] = useState([])
    let [investmentsData, setInvestmentsData] = useState([])
    let [savingsData, setSavingsData] = useState([])
    // let [aggFunds, setAggFunds] = useState([])
    // let [totalFundMonths, setMonths] = useState([])
    // let [totalFundData, setData] = useState([])  

    useEffect(() => {
        async function callInsights() {
            let res = await getTopDashboardInsights(currentUserId)
            console.log(res)
            return res;
        }
        let response = callInsights();
        response.then(res =>{
            if(res !== "error"){
                setIncomeDiff(res.data.income)
                setExpensesDiff(res.data.expenses)
                setFundsDiff(res.data.totalFunds)
                }
            }
        )

        async function getIncomeTimeSeries(){
            let res = await getIncomes(currentUserId, "6")
            console.log(res)
            return res;
        }
        
        let response2 = getIncomeTimeSeries();
        response2.then(res2=>{
            let months = []
            let dataPoints = []
      
            res2.data.map((obj)=>{
              months.push(obj['month'])
              dataPoints.push(obj['amount'])
            })

            setIncomeMonths(months);
            setIncomeDataPoints(dataPoints)
        })

        async function callInvestmentsTimeSeries(){
            let res = await getInvestmentsTimeSeries(currentUserId, 6)
            console.log(res)
            return res
          }
          let response3 = callInvestmentsTimeSeries();
          response3.then(res =>{
            setInvestmentsData(res.data)
            console.log(res.data)
        })

        async function callSavingsTimeSeries(){
            let res = await getSavingsTimeSeries(currentUserId, 6)
            console.log(res)
            return res
          }
          let response4 = callSavingsTimeSeries();
          response4.then(res =>{
            setSavingsData(res.data)
            console.log(res.data)
          })
        
    },[])

    let aggregatedFunds = aggregateFunds(investmentsData, savingsData)
    console.log(aggregatedFunds)
    let chartLabels = Object.keys(aggregatedFunds)
    let dataPoints = chartLabels.map((month)=>{
        return aggregatedFunds[month]
    })


    let percentDiff = (arrHolder) => {
        if(arrHolder[0] !== 0){
            return (((arrHolder[1]/arrHolder[0])-1)*100);
        }
        return 0
    } 

    let incomePercentDiff  = incomeDiff === [] ? 0 : percentDiff(incomeDiff)
    let expensePercentDiff = expenseDiff === [] ? 0 : percentDiff(expenseDiff)
    let totalFundPercentDiff = totalFundDiff === [] ? 0 : percentDiff(totalFundDiff)

    let totalFundsObj = {
        header: "",
        value: "No data",
        stat: "",
        time: "last month",
        color: "#706f6f",
        trendingUp: 2
    };
    totalFundsObj.header = "Total Funds"
    let incomeObj = {
        header: "",
        value: "No data",
        stat: "",
        time: "last month",
        color: "#706f6f",
        trendingUp: 2
    };
    incomeObj.header ="Income" 
    let expensesObj = {
        header: "",
        value: "No data",
        stat: "",
        time: "last month",
        color: "#706f6f",
        trendingUp: 2
    }
    expensesObj.header = "Expenses"

    if(incomeDiff !== []){
        incomeObj.value = incomeDiff[1];
        incomeObj.stat = incomePercentDiff.toFixed(0) + '%';
        incomeObj.color = incomePercentDiff !== 0 ? (incomePercentDiff > 0 ? "#D3FFE7" : "#FFA3CF") : "#706f6f"
        incomeObj.trendingUp = incomePercentDiff !== 0 ? (incomePercentDiff > 0 ? 1 : 0) : 2
    }
    
    if(expenseDiff !== []){
        expensesObj.value = expenseDiff[1];
        expensesObj.stat = expensePercentDiff.toFixed(0) + '%';
        expensesObj.color = expensePercentDiff !== 0 ? (expensePercentDiff > 0 ? "#FFA3CF" : "#D3FFE7" ) : "#706f6f"
        expensesObj.trendingUp = expensePercentDiff !== 0 ? (expensePercentDiff > 0 ? 1 : 0) : 2
    }

    
    if(totalFundDiff !== []){
        totalFundsObj.value = totalFundDiff[1];
        totalFundsObj.stat = totalFundPercentDiff.toFixed(0) + '%';
        totalFundsObj.color = totalFundPercentDiff !== 0 ? (totalFundPercentDiff > 0 ? "#D3FFE7" : "#FFA3CF") : "#706f6f"
        totalFundsObj.trendingUp = totalFundPercentDiff !== 0 ? (totalFundPercentDiff > 0 ? 1 : 0) : 2
    }


    return (
        <div className='contentContainer'>
            <NavBar/>
            <Container fluid className="pageContainer">
                <Row>
                    {/* Replace with name later */}
                    <h3 className='dashboardHeader'>Hello {generalContext.username}!</h3>
                </Row>
                <Row>
                    <Col lg={4}>
                        <DBCardSm {...totalFundsObj}/>
                    </Col>
                    <Col lg={4}>
                        <DBCardSm {...incomeObj}/>
                    </Col>
                    <Col lg ={4}>
                        <DBCardSm {...expensesObj}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <h3>Overview</h3>
                            <h6 className="cardSubHeader">Monthly Earning</h6>
                            <div className="dbBarChartContainer">
                                <Bar className="dbBarChart" options={options} data={barData(incomeMonths,incomeDataPoints,'#FEE4FF')} />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Row>
                                <Col>
                                    <h4>Total Funds (Investments and Savings)</h4>
                                </Col>
                                {/* <Col>
                                    <div className="dbGoalTrack">
                                        <span>Goal Track</span><br/>
                                        <span className="dbGoalPercent">60.5%</span>
                                    </div>
                                </Col> */}
                            </Row>
                            {/* <Row> */}
                            <div className="dbBarChartContainer">
                                <Line className="dbBarChart" options={options} data={lineData(chartLabels, dataPoints)} />
                            </div>
                            {/* </Row> */}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default DashboardPage;
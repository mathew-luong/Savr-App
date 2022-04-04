import NavBar from '../components/layout/NavBar.js';
import DBCardSm from '../components/layout/DashboardCardSm.js';
import Card from '../components/layout/Card.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

function DashboardPage(props){
    // Objects for props used for the small cards on the top of the dashboard page
    // Can be changed to props object later 
    let bal = {
        header: "Balance",
        value: "2.4k",
        stat: "Up 24% ",
        time: "this month",
        color: "#CAF1FF",
        trendingUp: true
    }

    let inc = {
        header: "Income",
        value: "1000",
        stat: "Up 3% ",
        time: "this week",
        color: "#D3FFE7",
        trendingUp: true
    }

    let exp = {
        header: "Expenses",
        value: "850",
        stat: "Down 56% ",
        time: "this month",
        color: "#FFA3CF",
        trendingUp: false
    }

    return (
        <div className='contentContainer'>
            <NavBar/>
            <Container fluid className="pageContainer">
                <Row>
                    {/* Replace with name later */}
                    <h3 className='dashboardHeader'>Hello User,</h3>
                </Row>
                <Row>
                    <Col>
                        <DBCardSm {...bal}/>
                    </Col>
                    <Col>
                        <DBCardSm {...inc}/>
                    </Col>
                    <Col>
                        <DBCardSm {...exp}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <h3>Overview</h3>
                            <h6 className="cardSubHeader">Monthly Earning</h6>
                            <div className="dbBarChartContainer">
                                <Bar className="dbBarChart" options={options} data={barData} />
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
                                <Col>
                                    <div className="dbGoalTrack">
                                        <span>Goal Track</span><br/>
                                        <span className="dbGoalPercent">60.5%</span>
                                    </div>
                                </Col>
                            </Row>
                            {/* <Row> */}
                            <div className="dbBarChartContainer">
                                <Line className="dbBarChart" options={options} data={lineData} />
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
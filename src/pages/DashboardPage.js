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

// Updates the corresponding month (index of array is month) with the value
// In future, just take current month index (rather than hardcode)
// Used as onClick handler for expenses page??
export function updateBarChart(monthInd, value) {
    // Adds value to month
    // e.g. If month is june and you made $200 -> updateBarChart(6,200)
    if(monthInd-1 >= 0 && monthInd-1 <= 12) {
        barChartData[monthInd-1] += value;
    }
}

updateBarChart(6,200);

// Tooltip - Calculates the % change from previous month and current month 
export function barGraphTooltip(data,monthInd) {
    if(monthInd > 0) {
        let prevMonth = barChartData[monthInd-1];
        let currMonth = barChartData[monthInd];
        let change;
        // Check if balance increased or decreased from last month
        (prevMonth > currMonth) ? change = "Down" : change = "Up"
        // Calculate percent change from previous month
        let percent = ((currMonth - prevMonth) / (prevMonth)) * 100;
        return "$" + data + " - " + change + " " + Math.abs(Math.round(percent)) + "%";
    }
    else {
        // Month is January so no previous month data
        return "$" + data;
    }
}

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    // remove grid lines
    scales: {
        x: {
            grid: {
                display: false
            },
        },
        y: {
            grid: {
                display: false  
            },
            display: true        // REMOVES Y-AXIS
        }
    },
    plugins: {
        // remove legend label
        legend: {
            display: false
        },
        // remove title
        title: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return barGraphTooltip(context.formattedValue,context.dataIndex);
                }
            },
            displayColors: false
        }
    },
    elements: {
        line: {
            tension: 0.25
        }
    }
};

// Barchart/linechart x axis
export const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


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
    ],
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
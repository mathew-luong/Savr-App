import NavBar from '../components/layout/NavBar.js';
import DBCardSm from '../components/layout/DashboardCardSm.js';
import DBCardLg from '../components/layout/DashboardCardLg.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DashboardPage(){
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
                        <DBCardLg/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DBCardLg/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default DashboardPage;
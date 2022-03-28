import NavBar from '../components/layout/NavBar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// TEMPORARY
import DBCardLg from '../components/layout/DashboardCardLg.js';


import React, { useState } from "react";


function ExpensesPage(props){
    const [mode, setMode] = useState('precision');

    // Handle when the user toggles between precision and estimation mode
    // Default mode is precision
    const handleModeChange = (event, newMode) => {
      setMode(newMode);
    };

    return (
        <div className='contentContainer'>
            <NavBar/>
            <Container fluid className="pageContainer">
                <Row className="expHeaderToggle">
                    <Col>
                        <h3 className="expHeader">Your Expenses</h3>
                    </Col>
                    <Col>
                        <ToggleButtonGroup
                            className="expToggleBtn"
                            value={mode}
                            exclusive
                            onChange={handleModeChange}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="precision" aria-label="left aligned" className="expToggle">
                                Precision
                            </ToggleButton>
                            <ToggleButton value="estimation" aria-label="right aligned" className="expToggle2">
                                Estimation
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Col>
                </Row>
                <Row className="expSubHeading">
                    {/* REPLACE WITH PROPS TEXT */}
                    <h5>Your monthly expenses have gone up 12%</h5>
                    <h5>You have overspent in entertainment the past 2 months</h5>
                </Row>
                <Row>
                    {/* TEMPORARY */}
                    <Col>
                        <DBCardLg/> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {/* TEMPORARY */}
                        <DBCardLg/> 
                    </Col>
                    <Col>
                    {/* TEMPORARY */}
                        <DBCardLg/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {/* TEMPORARY */}
                        <DBCardLg/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default ExpensesPage;
import NavBar from '../components/layout/NavBar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Card from '../components/layout/Card.js';
import { options, barData } from "./DashboardPage";


import { Bar } from 'react-chartjs-2';
// Charts 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
}   from 'chart.js';

import React, { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);



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
                    <Col>
                        <Card>
                            <h3>Expense Breakdown</h3>
                            <h6 className="cardSubHeader">Monthly Expenses</h6>
                            <div className="dbBarChartContainer">
                                <Bar className="dbBarChart" options={options} data={barData} />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {/* TEMPORARY */}
                        <Card>
                            Chart 1
                        </Card>
                    </Col>
                    <Col>
                    {/* TEMPORARY */}
                        <Card>
                            Chart 2
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {/* TEMPORARY */}
                        <Card>
                            Chart 3
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default ExpensesPage;
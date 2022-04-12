import NavBar from "../components/layout/NavBar.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "../components/layout/Card.js";
import FormCard from "../components/layout/forms/FormCard";
import GeneralContext from "../services/userContext.js";
// import {Modal} from "react-bootstrap";
import {mapPrecisionExpenses, 
  mapEstimationExpenses, 
  mapIncomeEntries, 
  submitPrecisionExpenses,
  submitEstimationExpenses, 
  submitIncomeEntries} from "../services/expensesPage.js";

// Import configuration options and functions for barchart/linechart
import { options, labels, pieOptions } from "../components/Charts.js";

import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

// Charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import React, { useState, useEffect, useContext} from "react";
import {useNavigate } from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import MobileFormCard from "../components/layout/forms/MobileFormCard.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
);

// Array containing data for the expenses barchart
export var expbarChartData = new Array(12);
// Populate barchartdata (get data from db?)
expbarChartData = [10, 200, 30, 40, 50, 60, 700, 80, 900, 100, 110, 120];

// Data for barchart
const barData = {
  labels,
  datasets: [
    {
      data: expbarChartData,
      backgroundColor: "#FEE4FF",
      borderRadius: 10,
      hoverBackgroundColor: "#E5355F",
    },
  ],
};

// Array containing data for last months expenses
export var expPieChartData = new Array(12);
// Populate barchartdata (get data from db?)
expPieChartData = [10, 8, 20, 30, 15, 21, 10, 12, 15, 10, 25, 11, 25, 10];

// Array containing the data for the target expenses
export const expPieTargetData = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

// Labels for expense charts
export const expPieChartLabels = [
  "Transportation",
  "Entertainment",
  "Food",
  "Rent",
  "Gas",
  "Travel",
  "Groceries",
  "Household",
  "Utilities",
  "Education",
  "Family",
  "Bills",
  "Personal",
  "Other",
];

const lastMthData = {
  labels: expPieChartLabels,
  datasets: [
    {
      data: expPieChartData,
      backgroundColor: [
        "#E5355F",
        "#1FFC91",
        "#7ef4ff",
        "#363537",
        "#f988db",
        "#E635DD",
        "#8135E6",
        "#3544E6",
        "#3590E6",
        "#6AE635",
        "#E0E635",
        "#E69035",
        "#E65B35",
        "#7a7a7a",
      ],
    },
  ],
};

const expTargetData = {
  labels: expPieChartLabels,
  datasets: [
    {
      data: expPieTargetData,
      backgroundColor: [
        "#E5355F",
        "#1FFC91",
        "#7ef4ff",
        "#363537",
        "#f988db",
        "#E635DD",
        "#8135E6",
        "#3544E6",
        "#3590E6",
        "#6AE635",
        "#E0E635",
        "#E69035",
        "#E65B35",
        "#7a7a7a",
      ],
    },
  ],
};

function ExpensesPage(props) {

  let generalContext = useContext(GeneralContext);
  let currentUserId = generalContext.userID;
  console.log(currentUserId);
  let navigate = useNavigate();

  let expenseFormSubtitles = ["Date", "Expense Name", "Category", "Amount"];
  let expenseFormSubtitlesEstimation = [
    "Date",
    "Category",
    "Expenses as a % of total income",
  ];

  let incomeSubtitles = ["Income Amount", "Income Stream Name", "Date"];

  // Handles precision and estimation mode states
  const [mode, setMode] = useState("precision");
  const [entryView, setEntryView] = useState("Expenses");

  let [expensesPrecisionState, setExpensesPrecision] = useState([{
    date:"",
    expenseName: "",
    category: "Enter a new category",
    amount:""
  }])

  let [expensesEstimationState, setExpensesEstimation] = useState([{
    date:"",
    category: "Enter a new category",
    percentExpense:""
  }])

  let [incomeState, setIncomeState] = useState([{
    amount:"",
    streamName:"",
    date:""
  }])


  let expenseForms = (
    <>
      <div className="desktopExpensesInput">
        <FormCard
          titles={
            entryView === "Expenses"
              ? mode === "precision"
                ? expenseFormSubtitles
                : expenseFormSubtitlesEstimation
              : incomeSubtitles
          }
          inputTypes={
            entryView === "Expenses"
              ? mode === "precision"
                ? ["date", "text", "category", "number"]
                : ["date", "category", "number"]
              : ["number", "text", "date"]
          }
          currentValues ={
            entryView === "Expenses"
            ? mode === "precision"
              ? expensesPrecisionState
              : expensesEstimationState
            : incomeState
          }
          updateCurrentValues ={
            entryView === "Expenses"
            ? mode === "precision"
              ? setExpensesPrecision
              : setExpensesEstimation
            : setIncomeState
          }
          
          baseNewObject = {
            entryView === "Expenses"
            ? mode === "precision"
              ? {
                date:"",
                expenseName: "",
                category: "Enter a new category",
                amount:""
              }
              : {
                date:"",
                category: "Enter a new category",
                percentExpense:""
              }
            : {
              amount:"",
              streamName:"",
              date:""
            }
          }

        />
      </div>
      <div className="mobileExpensesInput">
      <MobileFormCard
          formTitles={
            entryView === "Expenses"
              ? mode === "precision"
                ? expenseFormSubtitles
                : expenseFormSubtitlesEstimation
              : incomeSubtitles
          }
          entryTypes={
            entryView === "Expenses"
              ? mode === "precision"
                ? ["date", "text", "category", "number"]
                : ["date", "category", "number"]
              : ["number", "text", "date"]
          }
          currentValues ={
            entryView === "Expenses"
            ? mode === "precision"
              ? expensesPrecisionState
              : expensesEstimationState
            : incomeState
          }
          updateCurrentValues ={
            entryView === "Expenses"
            ? mode === "precision"
              ? setExpensesPrecision
              : setExpensesEstimation
            : setIncomeState
          }
          
          baseNewObject = {
            entryView === "Expenses"
            ? mode === "precision"
              ? {
                date:"",
                expenseName: "",
                category: "Enter a new category",
                amount:""
              }
              : {
                date:"",
                category: "Enter a new category",
                percentExpense:""
              }
            : {
              amount:"",
              streamName:"",
              date:""
            }
          }
        />
      </div>
    </>
  );

  // Handle when the user toggles between precision and estimation mode
  // Default mode is precision
  const handleModeChange = (event, newMode) => {
    setMode(newMode);
  };

  const handleViewChange = (event, newView) => {
    event.preventDefault();
    setEntryView(newView);
  };

  const [targetData, updateTargetData] = useState(expTargetData);

  useEffect(() => {
    console.log("STATE CHANGED");
    updateTargetData({
      labels: expPieChartLabels,
      datasets: [
        {
          data: expPieTargetData,
          backgroundColor: [
            "#E5355F",
            "#1FFC91",
            "#7ef4ff",
            "#363537",
            "#f988db",
            "#E635DD",
            "#8135E6",
            "#3544E6",
            "#3590E6",
            "#6AE635",
            "#E0E635",
            "#E69035",
            "#E65B35",
            "#7a7a7a",
          ],
        },
      ],
    });
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    let precisionSubmission = mapPrecisionExpenses(expensesPrecisionState,currentUserId)
    let estimationSubmission = mapEstimationExpenses(expensesEstimationState, currentUserId)
    let incomeSubmission = mapIncomeEntries(incomeState, currentUserId)

    let precisionAlertString = ""; 
    let estimationAlertString = ""; 
    let incomeAlertString = "";

    if(precisionSubmission === false){
      precisionAlertString = "There was an empty field(s) in precision expenses entries so they were not submitted"
    }
    else{
      console.log(precisionSubmission)
      let responsePrecision = await submitPrecisionExpenses(precisionSubmission)
      console.log(responsePrecision)
    }
    if(estimationSubmission === false){
      estimationAlertString = "There was an empty field(s) in estimation expenses entries so they were not submitted"
    }
    else{
      console.log(estimationSubmission)
      let responseEstimation = await submitEstimationExpenses(estimationSubmission)
      console.log(responseEstimation)
    }
    if(incomeSubmission === false){
      incomeAlertString = "There was an empty field(s) in estimation expenses entries so they were not submitted"
    }
    else{
      console.log(incomeSubmission)
      let responseIncomes = await submitIncomeEntries(incomeSubmission)
      console.log(responseIncomes)
    }
    
    alert(`${precisionAlertString}\n${estimationAlertString}\n${incomeAlertString}`)

    navigate("/dashboard")
  }

  return (
    <div className="contentContainer">
      <NavBar />
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
              <ToggleButton
                value="precision"
                aria-label="left aligned"
                className="expToggle"
              >
                Precision
              </ToggleButton>
              <ToggleButton
                value="estimation"
                aria-label="right aligned"
                className="expToggle2"
              >
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
            <Card>
              <h4>Last Months Expenses</h4>
              <h6 className="cardSubHeader">What you bought last month</h6>
              <div className="expPieChartContainer">
                <Doughnut
                  className="expPieChart"
                  data={lastMthData}
                  options={pieOptions}
                  redraw={true}
                />
              </div>
            </Card>
          </Col>
          <Col>
            <Card>
              <Row>
                <Col>
                  <h4>Target Expenses</h4>
                </Col>
              </Row>
              <h6 className="cardSubHeader">
                How much you want to spend, and in what
              </h6>
              <div className="expPieChartContainer">
                <Doughnut
                  className="expPieChart"
                  data={targetData}
                  options={pieOptions}
                  redraw={true}
                />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card height="90%">
              <Row>
                <Col>
                  <h4>
                    {entryView === "Expenses"
                      ? "Expense Entry"
                      : "Income Entry"}
                  </h4>
                </Col>
                <Col>
                  <Dropdown className="viewDropdown">
                    <Dropdown.Toggle className="viewDropdownToggle">
                      {entryView}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item
                        onClick={(e) => handleViewChange(e, "Expenses")}
                      >
                        Expenses
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => handleViewChange(e, "Income")}
                      >
                        Income
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="formHolderCol">
                <Col>{expenseForms}</Col>
              </Row>
              <Row>
                <Col>
                  <div className="expensesFormBtnContainer">
                    <button className="expManageBtn" onClick={handleSubmit}>Submit</button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default ExpensesPage;

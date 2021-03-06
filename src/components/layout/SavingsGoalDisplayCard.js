import { Container, Row, Col } from "react-bootstrap";
import classes from "./SavingsGoalDisplayCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";


function SavingsGoalDisplayCard(props) {

  
  let goalDate = "By: " + (props.goal.savingsGoalDate)
  let goalAmount = "$" + props.goal.savingsGoalsAmount


  return (
    <Container className={classes.baseCardContainer} >
      <Row>
        <Col xs={6}>
          <FontAwesomeIcon
            icon={faHandHoldingDollar}
            className={classes.cardIcon}
          />
        </Col>
        <Col xs={6}>
          <p style={{ fontsize: "14", color: "#ACACAC" }}>Savings Goals:</p>
          <h4>{goalDate}</h4>
          <p style={{ fontsize: "14", color: "#ACACAC" }}>{goalAmount}</p>
        </Col>
      </Row>
    </Container>
  );
}
export default SavingsGoalDisplayCard;

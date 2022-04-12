import NavBar from "../components/layout/NavBar.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/layout/Card.js";
import SupportChatBox from "../components/layout/SupportChatBox.js";
import GeneralContext from "../services/userContext.js";
import { useContext, useState, useRef} from "react";
import {submitMessageAsNormalUser} from "../services/supportPage"

function SupportPage() {
  let generalContext = useContext(GeneralContext);
  let userID = generalContext.userID;
  console.log(userID);

  let subjectRef = useRef();
  let messageRef = useRef();

  let [inboxMessages, addInboxMessages] = useState([
    {
      subject: "RE: Personal Info Update",
      text: "This is a message regarding your personal info...",
    },
    {
      subject: "RE: Bugs",
      text: "This is a message regarding some bugs you've encountered",
    },
    {
      subject: "New features",
      text: "Look at these newly included features in update 1.0!!",
    },
  ]);

  async function handleMessageSubmit(){
      let requestObject = {
          fromUserID: userID, 
          toUserID: 0,
          subject: subjectRef.current.value,
          body: messageRef.current.value
      }

      let res = await submitMessageAsNormalUser(requestObject)
      console.log(res)

      addInboxMessages((previousMessages)=>{
          return [...previousMessages, {subject:subjectRef.current.value, text: messageRef.current.value}]
      })

      subjectRef.current.value = ""
      messageRef.current.value = ""
  }

  console.log(inboxMessages)
  return (
    <div className="contentContainer">
      <NavBar />
      <Container fluid className="pageContainer">
        <Row>
          <h3 className="dashboardHeader">How can we help you?</h3>
        </Row>
        <Row>
          <Col>
            <Card height="40vh">
              <h4 className="supportFormHeader">Inbox</h4>
              <ul className="supportInboxContainer">
                {inboxMessages.map((msg, i) => {
                  return (
                    <li className="supportInboxLi" key={i}>
                      <h5>{msg.subject}</h5>
                      <span>{msg.text}</span>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card height="45vh">
              <Row>
                <h4 className="supportFormHeader">Send an Inquiry</h4>
              </Row>
              <form className="supportForm">
                <label
                  htmlFor="supportSubject"
                  className="supportFormSubHeader"
                >
                  Subject
                </label>
                <input
                  id="supportSubject"
                  required
                  type="text"
                  ref = {subjectRef}
                  className="supportInput"
                  placeholder="Enter a subject"
                ></input>
                <label
                  htmlFor="supportMessage"
                  className="supportFormSubHeader"
                >
                  Body
                </label>
                <textarea
                  id="supportMessage"
                  required
                  ref = {messageRef}
                  type="text"
                  placeholder="Compose a message"
                  className="supportTxtArea"
                ></textarea>
                <button className="supportSendBtn" type="button" onClick={handleMessageSubmit} >
                  Send
                </button>
              </form>
            </Card>
          </Col>
        </Row>
        <SupportChatBox />
      </Container>
    </div>
  );
}
export default SupportPage;

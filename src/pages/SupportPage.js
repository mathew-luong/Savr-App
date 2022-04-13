import NavBar from "../components/layout/NavBar.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../components/layout/Card.js";
import SupportChatBox from "../components/layout/SupportChatBox.js";
import GeneralContext from "../services/userContext.js";
import { useContext, useState, useRef, useEffect} from "react";
import {submitMessageAsNormalUser, getMessages} from "../services/supportPage"

function SupportPage() {
  let generalContext = useContext(GeneralContext);
  let userID = generalContext.userID;
  let userType = generalContext.userType;
  console.log(userType)
  console.log(userID);

  let subjectRef = useRef();
  let messageRef = useRef();

  let [inboxMessages, addInboxMessages] = useState([]);
  let [submitted, changeSubmitted] = useState(true)
  let [toSendId, changeSendId] = useState(0);

  useEffect(()=>{

    async function getMyMessages(){
      let res = await getMessages(userID)
      console.log(res) 
      return res
    }
    let messages = getMyMessages();
    messages.then(res =>{
      if(res !== "error"){
        addInboxMessages(res.data)
      }
    })

  },[submitted])

  const renderHeader = (userKind) => {
    if (userKind === true){
      return "Hey there! How can we help you?"
    }
    else{
      return "Hello! Lets help some people out today"
    }
  }

  const renderNav = (userKind) => {
    if(userKind === true) {
      return <NavBar />
    }
  }

  const checkIfMine = (msgID) =>{
    if (msgID === userID){
      return "Sent by me"
    }
    return "Received"
  }

  async function handleMessageSubmit(){

    let sendId
    let allowance = true
    if(toSendId === 0 && userType === true){
      sendId = 0
    }
    else if(toSendId !== 0 && userType === true){
      sendId = toSendId
    }
    else if(toSendId !== 0 && userType !== true){
      sendId = toSendId
    }else{
      alert("As a support user, you must reply to a specific message")
      allowance = false;
    }

    if(allowance){
      let requestObject = {
        fromUserID: userID, 
        toUserID: sendId,
        subject: subjectRef.current.value,
        body: messageRef.current.value
      }

      let res = await submitMessageAsNormalUser(requestObject)
      console.log(res)
      subjectRef.current.value = ""
      messageRef.current.value = ""
      changeSubmitted(!submitted)
      changeSendId(0)
    }

  }

  function replyHandler(e, i){
    let handleObject = inboxMessages[i]
    subjectRef.current.value = handleObject['subject']
    changeSendId(handleObject['fromUserId'])

  }

  console.log(inboxMessages)
  return (
    <div className="contentContainer">
      {renderNav(userType)}
      <Container fluid className="pageContainer">
        <Row>
          <h3 className="dashboardHeader">{renderHeader(userType)}</h3>
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
                      <p>{msg.content}</p>
                      <button className="replyBtn" onClick={(e) => replyHandler(e,i)}>reply</button>
                      <h7 className="msgSender">{checkIfMine(msg.fromUserId)}</h7>
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

import NavBar from '../components/layout/NavBar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '../components/layout/Card.js';
import SupportChatBox from '../components/layout/SupportChatBox.js';

function SupportPage(){

    let inboxMsgs = [
        {subject: "RE: Personal Info Update", text: "This is a message regarding your personal info..."},
        {subject: "RE: Bugs", text: "This is a message regarding some bugs you've encountered"},
        {subject: "New features", text: "Look at these newly included features in update 1.0!!"},
        {subject: "RE: Personal Info Update", text: "This is a message regarding your personal info..."},
        {subject: "RE: Bugs", text: "This is a message regarding some bugs you've encountered"},
        {subject: "New features", text: "Look at these newly included features in update 1.0!!"},
        {subject: "RE: Personal Info Update", text: "This is a message regarding your personal info..."},
        {subject: "RE: Bugs", text: "This is a message regarding some bugs you've encountered"},
        {subject: "New features", text: "Look at these newly included features in update 1.0!!"}
    ]


    return (
        <div className='contentContainer'>
            <NavBar/>
            <Container fluid className="pageContainer">
                <Row>
                    <h3 className='dashboardHeader'>How can we help you?</h3>
                </Row>
                <Row>
                    <Col>
                        <Card height="40vh">
                            <h4 className='supportFormHeader'>Inbox</h4>
                            <ul className="supportInboxContainer">
                                {
                                    inboxMsgs.map((msg,i) => {
                                        return (
                                        <li className="supportInboxLi" key={i}>
                                            <h5>
                                                {msg.subject}
                                            </h5>
                                            <span>
                                                {msg.text}
                                            </span>
                                        </li>
                                        );
                                    })
                                }
                            </ul>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card height="45vh">
                            <Row>
                                <h4 className='supportFormHeader'>Send an Inquiry</h4>
                            </Row>
                            <form className='supportForm'>
                                <label htmlFor="supportSubject" className="supportFormSubHeader">Subject</label>
                                <input id="supportSubject" type="text" className="supportInput" placeholder="Enter a subject"></input>
                                <label htmlFor="supportMessage" className="supportFormSubHeader">Body</label>
                                <textarea id="supportMessage" type="text" placeholder="Compose a message" className='supportTxtArea'></textarea>
                                <button className="supportSendBtn" type="button">Send</button>
                            </form>
                        </Card>
                    </Col>
                </Row>
                <SupportChatBox/>
            </Container>
        </div>
    );
}
export default SupportPage;
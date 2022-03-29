import NavBar from '../components/layout/NavBar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function SupportPage(){
    return (
        <div className='contentContainer'>
            <NavBar/>
            <Container fluid>
                <Row></Row>
                Support Page
                <Col></Col>
            </Container>
        </div>
    );
}
export default SupportPage;
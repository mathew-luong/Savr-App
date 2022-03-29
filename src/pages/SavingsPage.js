import NavBar from '../components/layout/NavBar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SavingsPage(){
    return (
        <div className='contentContainer'>
            <NavBar/>
            <Container fluid>
                <Row></Row>
                Savings Page
                <Col></Col>
            </Container>
        </div>
    );
}
export default SavingsPage;
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import img1 from '../assets/images/about.jpg';

export default function AppAbout() {
    return (
        <section>
            <Container fluid>
                <div className='title-holder'>
                    <h2>About Us</h2>
                    <div className='subtitle'>
                        learn more about us 
                    </div>
                </div>
                <Row>
                    <Col sm={6}>
                        <Image src={img1} />
                    </Col>
                    <Col sm={6}>
                        <p>We are two student from SupInfo, We already have a licence degree and we both love computer science !</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
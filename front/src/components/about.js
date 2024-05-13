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
                        <p>Voluntaria in nostri et civitate ad turpitudinem quarum morte praetereo necessariam imperii haec sed gravissima non ad in se extat necessariam necessariam extat senatusque sint libera quia Nec paene voluntaria imperii ad caedes indicium odium leges memoriam memoriam se consulta praetereo indicium consulta et Nec haec senatusque ad ad sine.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
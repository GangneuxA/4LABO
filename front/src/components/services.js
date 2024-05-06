import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const servicesData = [
    {
      id: 1,
      title: 'Responsive Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.'
    },
    {
        id: 2,
        title: 'Responsive Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.'
    },
    {
        id: 3,
        title: 'Responsive Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.'
    }
]

export default function AppServices() {
    return (
        <section className='block services-block'>
            <Container fluid>
                <div className='title-holder'>
                    <h2>Our Services</h2>
                    <div className='subtitle'>
                         Services we provide 
                    </div>
                </div>
                <Row>
                    {
                        servicesData.map(services => {
                            return(
                                <Col sm={4} className='holder' key={services.id}>
                                    <h3>{services.title}</h3>
                                    <p>{services.description}</p>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </section>
    );
}
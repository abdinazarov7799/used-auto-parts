import {Col, Container, Row} from "reactstrap";
import FooterBuyer from "../Layouts/Footer/FooterBuyer";

function HomeSeller() {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <p className='text-center mt-5 pt-5'>You will see offers here</p>
                    </Col>
                </Row>
            </Container>
            <FooterBuyer />
        </>
    );
}

export default HomeSeller;

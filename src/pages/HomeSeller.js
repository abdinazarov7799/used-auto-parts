import {Col, Container, Row} from "reactstrap";
import FooterSeller from "../Layouts/Footer/FooterSeller";

function HomeSeller() {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <p className='text-center mt-5 pt-5'>You will see new orders here!</p>
                    </Col>
                </Row>
            </Container>
            <FooterSeller />
        </>
    );
}

export default HomeSeller;

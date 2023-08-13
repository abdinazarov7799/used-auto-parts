import {Col, Container, Row} from "reactstrap";
import FooterSeller from "../Layouts/Footer/FooterSeller";
import FooterBuyer from "../Layouts/Footer/FooterBuyer";

function HomeBuyer() {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <p className='text-center mt-5 pt-5'>You will see new orders here!</p>
                    </Col>
                </Row>
            </Container>
            <FooterBuyer />
        </>
    );
}

export default HomeBuyer;

import {Col, Container, Row} from "reactstrap";
import {Button} from "antd";
import Login from "../components/Login/Login";
import {Link} from "react-router-dom";


const LoginPage = () => {
    return(
        <>
            <Login />
            <Container>
                <Row>
                    <Col xs={12} style={{position:"absolute", bottom: '15px'}}>
                        <Link to='/register'>
                            <Button type="text" className="w-100" style={{background: '#ECECEC', color: '#000'}}>
                                Register
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default LoginPage;

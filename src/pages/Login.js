import {Col, Container, Row} from "reactstrap";
import {Button} from "antd";
import Login from "../components/Login/Login";
import {Link} from "react-router-dom";

const LoginPage = () => {

    return(
        <>
            <Login />
            <div style={{position: "fixed",width: '100%', bottom: '15px'}}>
                <Container>
                    <Row>
                        <Col>
                            <Link to='/register'>
                                <Button className='w-100' type="text" style={{background: '#ECECEC', color: '#000'}}>
                                    Register
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default LoginPage;

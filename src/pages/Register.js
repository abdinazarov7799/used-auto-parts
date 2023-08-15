import Registration from "../components/Registration/Registration";
import {Col, Container, Row} from "reactstrap";
import {Button} from "antd";
import {Link} from "react-router-dom";


const RegisterPage = () => {
  return(
      <>
          <Registration />
          <div style={{position: "fixed",width: '100%', bottom: '15px'}}>
            <Container>
                  <Row>
                      <Col xs={12}>
                          <Link to='/login'>
                              <Button type="text" className="w-100" style={{background: '#ECECEC', color: '#000'}}>
                                  Login
                              </Button>
                          </Link>
                      </Col>
                  </Row>
            </Container>
          </div>
      </>
  )
}
export default RegisterPage;

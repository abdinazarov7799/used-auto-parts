import Registration from "../components/Registration/Registration";
import {Col, Container, Row} from "reactstrap";
import {Button} from "antd";
import {Link} from "react-router-dom";


const RegisterPage = () => {
  return(
      <>
          <Registration />
          <Container>
              <Row>
                  <Col xs={12} style={{position:"absolute", bottom: '15px'}}>
                      <Link to='/login'>
                          <Button type="text" className="w-100" style={{background: '#ECECEC', color: '#000'}}>
                              Login
                          </Button>
                      </Link>
                  </Col>
              </Row>
          </Container>
      </>
  )
}
export default RegisterPage;

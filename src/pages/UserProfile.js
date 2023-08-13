import {Col, Container, Row} from "reactstrap";
import React from "react";
import FooterBuyer from "../Layouts/Footer/FooterBuyer";
import FooterSeller from "../Layouts/Footer/FooterSeller";
import {useNavigate} from "react-router";

function UserProfile() {
    const userRole = localStorage.getItem('UserRole');
    const navigate = useNavigate();
    function logOut() {
        localStorage.clear();
        navigate('/');
    }
    return(
      <>
        <Container>
            <Row>
                <Col xs={12}>
                    <h3 className="mt-3">Profile</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <button className='btn btn-danger w-100 mt-2' onClick={logOut}>
                        Log Out
                    </button>
                </Col>
            </Row>
        </Container>
          {
              userRole === "Buyer" ? <FooterBuyer /> : <FooterSeller/>
          }
      </>
    );
}
export default UserProfile;

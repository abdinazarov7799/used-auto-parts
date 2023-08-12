import classes from './footer.module.css';
import {Col, Container, Row} from "reactstrap";
import HomeImg from '../../assets/icons/home.svg'
import FlagImg from '../../assets/icons/flag.svg'
import PlusImg from '../../assets/icons/Plus.svg'
import SmileImg from '../../assets/icons/smile.svg'
import MessageImg from '../../assets/icons/message.svg'
import {Link} from "react-router-dom";

function Footer() {
    return(
        <>
            <div className={classes.Footer}>
                <Container className={classes.FooterContainer}>
                    <Col sm={12} md={6} className="text-md-start">
                        <p className={classes.FooterText}>© 2023 Barterly LLC. All rights are reserved</p>
                    </Col>
                    <Col sm={12} md={6} className="text-md-end">
                        <p className={classes.FooterText}>This is demo version of Barterly v0.99</p>
                    </Col>
                </Container>
            </div>
            <div className={classes.FooterMobile}>
                <Container>
                    <Row >
                        <Col>
                            <Link to="/" className="d-flex flex-column align-items-center">
                                <img src={HomeImg} width={36} height={36}/>
                                <p className={classes.FooterMobileText}>Home</p>
                            </Link>
                        </Col>
                        <Col  className="d-flex flex-column align-items-center">
                            <img src={FlagImg} width={36} height={36}/>
                            <p className={classes.FooterMobileText}>Offers</p>
                        </Col>
                        <Col xs={3} >
                           <Link to='/addItems' className="d-flex flex-column align-items-center">
                               <div className="text-center pt-2"
                                    style={{
                                        position: "absolute",
                                        width: '60px',
                                        height: '60px',
                                        background: '#0A6FB7',
                                        borderRadius: '50%',
                                        top: '-25px',
                                    }}>
                                   <img src={PlusImg}
                                        width={42}
                                        height={42}
                                   />
                               </div>
                               <p className={classes.FooterMobileText} style={{marginTop: '36px'}}>Place your Ad</p>
                           </Link>
                        </Col>
                        <Col className="d-flex flex-column align-items-center">
                            <img src={MessageImg} width={36} height={36}/>
                            <p className={classes.FooterMobileText}>Chats</p>
                        </Col>
                        <Col className="d-flex flex-column align-items-center">
                            <img src={SmileImg} width={36} height={36}/>
                            <p className={classes.FooterMobileText}>Profile</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default Footer;
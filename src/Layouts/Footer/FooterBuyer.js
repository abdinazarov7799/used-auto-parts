import classes from './footer.module.css';
import {Col, Container, Row} from "reactstrap";
import HomeImg from '../../assets/icons/home.svg'
import FlagImg from '../../assets/icons/flag.svg'
import PlusImg from '../../assets/icons/Plus.svg'
import SmileImg from '../../assets/icons/smile.svg'
import MessageImg from '../../assets/icons/message.svg'
import {Link} from "react-router-dom";

function FooterBuyer() {
    return(
        <>
            <div className={classes.FooterMobile}>
                <Container>
                    <Row >
                        <Col>
                            <Link to="/" className="d-flex flex-column align-items-center">
                                <img src={HomeImg} width={36} height={36}/>
                                <p className={classes.FooterMobileText}>Home</p>
                            </Link>
                        </Col>
                        <Col className="d-flex flex-column align-items-center">
                            <img src={FlagImg} width={36} height={36}/>
                            <p className={classes.FooterMobileText} style={{width: '150%'}}>My Requests</p>
                        </Col>
                        <Col>
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
                               <p className={classes.FooterMobileText} style={{marginTop: '36px',width: '150%'}}>New Request</p>
                           </Link>
                        </Col>
                        <Col className="d-flex flex-column align-items-center">
                            <img src={MessageImg} width={36} height={36}/>
                            <p className={classes.FooterMobileText}>Chats</p>
                        </Col>
                        <Col>
                            <Link to={'/profile'} className="d-flex flex-column align-items-center">
                                <img src={SmileImg} width={36} height={36}/>
                                <p className={classes.FooterMobileText}>Profile</p>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default FooterBuyer;

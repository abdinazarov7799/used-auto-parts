import classes from './footer.module.css';
import {Col, Container, Row} from "reactstrap";
import HomeImg from '../../assets/icons/home.svg'
import FlagImg from '../../assets/icons/flag.svg'
import SmileImg from '../../assets/icons/smile.svg'
import MessageImg from '../../assets/icons/message.svg'
import {Link} from "react-router-dom";

function FooterSeller() {
    return(
        <>
            <div className={classes.FooterMobile}>
                <Container>
                    <Row >
                        <Col>
                            <Link to={'/'} className="d-flex flex-column align-items-center">
                                <img src={FlagImg} width={36} height={36}/>
                                <p className={classes.FooterMobileText}>Requests</p>
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
export default FooterSeller;

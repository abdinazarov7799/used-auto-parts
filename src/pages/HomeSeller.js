import {Col, Container, Row} from "reactstrap";
import FooterSeller from "../Layouts/Footer/FooterSeller";
import React,{useEffect, useState} from "react";
import Loading from "../components/Loading/Loading";
import classes from "../components/BuyerMyRequests/BuyerMyRequests.module.css";
import RequestsCard from "../components/RequestsCard/RequestsCard";
import logo from "../assets/logo/logo.svg";

function HomeSeller() {
    const [sellerRequests , setSellerRequests] = useState([]);
    const [loading , setLoading] = useState(true);
    const userID = localStorage.getItem('UserID');

    useEffect(() => {
        fetch(process.env.REACT_APP_SELLER_REQUESTS_API + userID)
            .then(response => response.json())
            .then(data => {
                setSellerRequests(data.data);
                setLoading(false)
            })
            .catch(err => console.log(err))
    },[])

    return (
        <>
            <Container>
                    {
                        sellerRequests === [] ?
                            <Row>
                                <Col xs={12}>
                                    <p className='text-center mt-5 pt-5'>You will see new orders here!</p>
                                </Col>
                            </Row>
                             :
                                <>
                                    <Row className='d-flex align-items-center mt-3'>
                                        <Col xs={6}>
                                            <h1>Requests</h1>
                                        </Col>
                                        <Col xs={6}>
                                            <img src={logo} alt="logo"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {
                                            loading ? <Loading /> :
                                                sellerRequests.slice().reverse().map((item) => {
                                                    return (
                                                        <Col xs={12} className={classes.slideIn}>
                                                            <RequestsCard
                                                                ImagePath={item.ImagePath}
                                                                PartDescription={item.PartDescription}
                                                                BrandName={item.BrandName}
                                                                VIN={item.VIN}
                                                                CarDescription={item.CarDescription}
                                                                RequestDate={item.RequestDate}
                                                                RequestID={item.RequestID}
                                                                BuyerName={item.BuyerName}
                                                                Role={'seller'}
                                                            />
                                                        </Col>
                                                    )
                                                })
                                        }
                                    </Row>
                                </>
                    }
            </Container>
            <FooterSeller />
        </>
    );
}

export default HomeSeller;

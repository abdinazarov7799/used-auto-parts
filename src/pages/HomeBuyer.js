import {Col, Container, Row} from "reactstrap";
import FooterBuyer from "../Layouts/Footer/FooterBuyer";
import React, {useEffect, useState} from "react";
import Loading from "../components/Loading/Loading";
import classes from "../components/BuyerMyRequests/BuyerMyRequests.module.css";
import RequestsCard from "../components/RequestsCard/RequestsCard";

function HomeBuyer() {
    const [buyerOffers , setBuyerOffers] = useState([]);
    const [loading , setLoading] = useState(true);
    const userID = localStorage.getItem('UserID');

    useEffect(() => {
        fetch(process.env.REACT_APP_BUYER_OFFER_API + userID)
            .then(response => response.json())
            .then(data => {
                setBuyerOffers(data.data);
                setLoading(false)
            })
            .catch(err => console.log(err))
    },[])
    return (
        <>
            <Container>
                {
                    buyerOffers === [] ?
                        <Row>
                            <Col xs={12}>
                                <p className='text-center mt-5 pt-5'>You will see offers here</p>
                            </Col>
                        </Row>
                        :
                        <>
                            <h1 className='mt-3'>Offers</h1>
                            <Row>
                                {
                                    loading ? <Loading /> :
                                        buyerOffers.slice().reverse().map((item) => {
                                            return (
                                                <Col xs={12} className={classes.slideIn}>
                                                    <RequestsCard
                                                        ImagePath={item.ImagePath}
                                                        PartDescription={item.PartDescription}
                                                        BrandName={item.BrandName}
                                                        VIN={item.VIN}
                                                        CarDescription={item.CarDescription}
                                                        RequestDate={item.OfferDate}
                                                        RequestID={item.RequestID}
                                                        BuyerName={item.BuyerName}
                                                        isBuyerOffer={true}
                                                        SellerName={item.SellerName}
                                                        PartAvailability={item.PartAvailability}
                                                        Price={item.Price}
                                                        ContactNumber={item.ContactNumber}
                                                        Latitude={item.Latitude}
                                                        Longitude={item.Longitude}
                                                    />
                                                </Col>
                                            )
                                        })
                                }
                            </Row>
                        </>
                }
            </Container>
            <FooterBuyer />
        </>
    );
}

export default HomeBuyer;

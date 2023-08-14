import {Col, Container, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import FooterBuyer from "../../Layouts/Footer/FooterBuyer";
import RequestsCard from "../RequestsCard/RequestsCard";
import Loading from "../Loading/Loading";
import classes from "./BuyerMyRequests.module.css";

function BuyerMyRequests() {
    const [loading,setLoading] = useState(true);
    const [requests,setRequests] = useState([]);
    const userID = localStorage.getItem('UserID')
    useEffect(() => {
        fetch(process.env.REACT_APP_BUYER_REQUEST_API + userID)
            .then(res => res.json())
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err))


    },[])
    return(
      <>
          <Container>
              <Row>
                  <Col>
                      <h1 className="mt-3 mb-2">
                          My Requests
                      </h1>
                  </Col>
              </Row>
              <Row className='pb-5'>
                  {
                      loading ? <Loading /> :
                          requests !== [] ? requests.map((item) => {
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
                                      />
                                  </Col>
                              )
                          }) : <h4>You have no request</h4>
                  }
              </Row>
          </Container>
          <FooterBuyer />
      </>
    );
}
export default BuyerMyRequests;

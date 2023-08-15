import {Col, Row} from "reactstrap";
import {timeSince} from "../TimeSince/TimeSince";
import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Select, Tooltip} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import {customMessage} from "../Message/Message";
import {openGoogleMapsApp} from "../openGoogleMapsApp/OpenGoogleMapsApp";
import {initiateCall} from "../initiateCall/initiateCall";

const initialOfferData = {
    "RequestID": '',
    "SellerID": '',
    "Price": '',
    "PartAvailability": ''
}
function RequestsCard(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [makeOffer, setMakeOffer] = useState(false);
    const [offerData, setOfferData] = useState(initialOfferData);
    const [availabilityColor, setAvailabilityColor] = useState();
    const [form] = Form.useForm();

    useEffect(() => {
        if (props.PartAvailability === 'In Stock'){
            setAvailabilityColor('#00BF36')
        }else {
            setAvailabilityColor('#DF7900')
        }
    })
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const makeAnOffer = () => {
        setMakeOffer(true);
        setOfferData((prevState) => ({
                ...prevState,
                ['SellerID']: localStorage.getItem('UserID'),
                ['RequestID']: `${props.RequestID}`
            }
        ));
    };
    const startChatWithSeller = () => {
        customMessage('error' , 'Unfortunately, chat is not available at the moment')
    };
    function onChange(e) {
        const {name, value} = e.target;
        setOfferData((prevState) => ({
                ...prevState,
                [name]: value
            }
        ));
    }

    function onFinish(e) {
        fetch(process.env.REACT_APP_OFFER_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(offerData) })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'error'){
                    customMessage(`${data.status}`, `Error`);
                } else {
                    customMessage(`${data.status}`, `${data.message}`);
                    setIsModalOpen(false);
                }
            })
            .catch(err => {
                console.log(err)
            });

    }
    function copyToClipboard(text) {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    return(
      <>
        <div className='d-flex mb-4 p-2'
             key={props.RequestID}
             style={{background: '#fff',
                 boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.10)',
                 borderRadius: 10,
                 cursor: "pointer"
             }}
             onClick={showModal}
        >
            <Col xs={4}>
                <div style={{
                    width: '100%',
                    height: '108px',
                    backgroundImage: `url('${props.ImagePath}')`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    borderRadius: '10px'
                }}>

                </div>
            </Col>
            <Col xs={8} className='ms-2'>
                <p className='mb-1'><span className='fw-bold'>Spare part:</span> {props.PartDescription}</p>
                {
                    props.isBuyerOffer ?
                        <p className='mb-1'><span className='fw-bold'>Seller:</span> {props.SellerName}</p> :
                        <p className='mb-1'><span className='fw-bold'>Brand:</span> {props.BrandName}</p>
                }
                {
                    props.isBuyerOffer ? (
                        <>
                            <p className='mb-1 fw-bold'>
                                <span>Availability:</span>
                                <span style={{color: availabilityColor}}> {props.PartAvailability}</span>
                            </p>
                            <p className='mb-1 fw-bold' >
                                <span>Price:</span>
                                <span style={{color: '#0A6FB7'}}> {props.Price}</span>
                            </p>
                        </>
                    ):
                    (props.Role !== 'seller' ?
                    <p className='mb-1'><span className='fw-bold'>VIN:</span> {props.VIN}</p>:
                    <p className='mb-1'><span className='fw-bold'>Buyer:</span> {props.BuyerName}</p>)
                }
                <p className='fw-medium mb-0' style={{color: '#BDBDBD'}}>{timeSince(props.RequestDate)}</p>
            </Col>
        </div>
          <Modal title={`${props.isBuyerOffer ? `New Offer from ${props.SellerName}` : props.Role !== 'seller' ? 'My Request' : `New Request from ${props.BuyerName}`}`}
                 open={isModalOpen}
                 onOk={handleOk}
                 onCancel={handleCancel}
                 footer={[
                     <Button key="close" onClick={handleCancel}>
                         Close
                     </Button>,
                     !makeOffer && props.Role === 'seller' ?
                         <Button key="makeAnOffer" type={"primary"} onClick={makeAnOffer}>
                            Make an offer
                         </Button> :
                         <>
                             {
                                 props.isBuyerOffer ?
                                     <Button key="makeAnOffer" type={"primary"} onClick={startChatWithSeller}>
                                         Start chat with seller
                                     </Button> :
                                     null
                             }
                         </>
                 ]}
                 style={{
                     top: '20px'
                 }}
          >
              <div style={{
                  width: '100%',
                  height: '360px',
                  backgroundImage: `url('${props.ImagePath}')`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
              }}
                   className='mt-3 mb-3'
              ></div>
              <p className='mb-1'><span className='fw-bold'>Spare part:</span> {props.PartDescription}</p>
              <p className='mb-1'><span className='fw-bold'>Brand:</span> {props.BrandName}</p>
              <p className='mb-1'><span className='fw-bold'>Car Description:</span> {props.CarDescription}</p>
              {
                  props.isBuyerOffer ?
                      <p className='mb-1 fw-bold'>
                          <span>Availability:</span>
                          <span style={{color: availabilityColor}}> {props.PartAvailability}</span>
                      </p>: null
              }
              <p className='d-flex align-items-center my-0 mb-1'><span className='fw-bold'>VIN: </span>
                  {props.VIN}
                  <Tooltip title="Copied" className='p-0'>
                      <Button
                          type="link"
                          icon={<CopyOutlined />}
                          onClick={() => copyToClipboard(props.VIN)}
                          className='d-flex align-items-center ms-1 p-0'
                          style={{height: '16px'}}
                      />
                  </Tooltip>
              </p>
              {
                  props.isBuyerOffer ?
                      <>
                          <p className='mb-1 fw-bold' >
                              <span>Price:</span>
                              <span style={{color: '#0A6FB7'}}> {props.Price}</span>
                          </p>
                          <Row className='my-3'>
                              <Col xs={6}>
                                  <Button className='w-100'
                                          type={"primary"}
                                          style={{background: '#000', color: '#fff'}}
                                          onClick={() => openGoogleMapsApp(props.Latitude,props.Longitude)}
                                  >
                                      Map
                                  </Button>
                              </Col>
                              <Col xs={6}>
                                  <Button className='w-100'
                                          type={"primary"}
                                          style={{background: '#00BF36', color: '#fff'}}
                                          onClick={() => initiateCall(props.ContactNumber)}
                                  >Call</Button>
                              </Col>
                          </Row>
                      </> : null
              }
              {
                  makeOffer ?
                      <>
                        <Form form={form} layout={"vertical"} onFinish={onFinish}>
                            <Form.Item
                                label="Offer your price:"
                                name="Price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input offer your price:!',
                                    },
                                ]}
                            >
                                <Input name="Price" type={'number'} onChange={onChange} />
                            </Form.Item>
                            <Form.Item
                                name="PartAvailability"
                                label="Select In Stock or On Order:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select In Stock or On Order'
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select In Stock or On Order:"
                                    name="PartAvailability"
                                    onChange={(e) =>
                                        setOfferData((prevState) => ({
                                            ...prevState,
                                            ['PartAvailability']: e
                                        }))}
                                    allowClear
                                >
                                    <Option value="In Stock">In Stock</Option>
                                    <Option value="On Order">On Order</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary"
                                        htmlType="submit"
                                        className="w-100 mt-2"
                                        style={{height: '32px', background: '#10C900'}}
                                >
                                    Confirm offer
                                </Button>
                            </Form.Item>
                        </Form>
                      </> : null
              }
          </Modal>
      </>
    );
}
export default RequestsCard

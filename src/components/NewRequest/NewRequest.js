import {Col, Container, Row} from "reactstrap";
import FooterBuyer from "../../Layouts/Footer/FooterBuyer";
import {Button, Form, Input, message, Upload} from "antd";
import React, {useState} from "react";
import resizeFile from "../ImageResizer/ImageResizer";
import {LoadingOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {customMessage} from "../Message/Message";

const initialRequest = {
    BuyerID: '',
    VIN: '',
    PartDescription: '',
    CarDescription: '',
    BrandName: '',
    ImagePath: ''
}

function NewRequest() {
    const [requestData, setRequestData] = useState(initialRequest);
    const [nextStep, setNextStep] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    function onChange(e) {
        const {name, value} = e.target;
        setRequestData((prevState) => ({
                ...prevState,
                [name]: value
            }
        ));
    }
    const beforeUpload = async (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return;
        }

        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Image must smaller than 10MB!');
            return;
        }

        const uri = await resizeFile(file);
        const resizedImage = await fetch(uri).then(res => res.blob());
        return new Blob([resizedImage], { type: 'image/jpeg' });
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);

            const formData = new FormData();
            formData.append('image', info.file.originFileObj);

            fetch(process.env.REACT_APP_IMAGE_UPLOAD_API, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'failed'){
                        customMessage('error','Image failed to load');
                    }else {
                        setRequestData((prevState) => ({
                            ...prevState,
                            ImagePath: data.imagePath,
                        }));
                        setImageUrl(data.imagePath);
                    }
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        }
    };

    function onFinish() {
        setNextStep(true)
    }

    return (
        <>
            <Container>
                {!nextStep ? <h1 className='text-center mt-5 pt-5 mb-5'>Enter your car’s VIN</h1> : null}
                <Form
                    onFinish={onFinish}
                    layout={"vertical"}
                >
                    {!nextStep ?
                        <Form.Item
                            label="Enter VIN code:"
                            name="VIN"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your car VIN code!',
                                },
                            ]}
                        >
                            <Input name="VIN" onChange={onChange} style={{height: '40px'}}/>
                        </Form.Item> :
                        <>
                            <Row className='justify-content-center mt-5 pt-5'>
                                <Col xs={10}>
                                    <p className='text-center'>Your car is Chevrolet Malibu 2019 2.0 MPI
                                        9-speed Automatic transmission</p>
                                </Col>
                            </Row>
                            <Form.Item
                                label="Enter what kind of part you need:"
                                name="PartDescription"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input what kind of part you need!',
                                    },
                                ]}
                            >
                                <Input name="PartDescription" onChange={onChange} style={{height: '40px'}}/>
                            </Form.Item>
                            <Form.Item
                                name="image"
                                label='Upload image of spare part (optional):'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload image'
                                    },
                                ]}
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture"
                                    className="avatar-uploader w-50"
                                    action={process.env.REACT_APP_IMAGE_UPLOAD_API}
                                    withCredentials={true}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    maxCount={1}
                                >
                                    <Button className='d-flex align-items-center'
                                            icon={<UploadOutlined style={{fontSize: '16px'}}/>}>
                                        Click to Upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </>
                    }
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                className="w-100 mt-2"
                                style={{height: '40px'}}
                        >
                            {nextStep ? 'Submit' : 'Next'}
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
            <FooterBuyer/>
        </>
    );
}

export default NewRequest;

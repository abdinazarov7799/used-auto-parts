import {Button, Form, Input, Select,message} from "antd";
import {Option} from "antd/es/mentions";
import {Container} from "reactstrap";
import React, {useState} from "react";
import EnterLoaction from "../EnterLocation/EnterLoaction";
import SelectCarBrands from "../SelectCarBrands/SelectCarBrands";
import {customMessage} from "../Message/Message";

const initialForm = {
    FullName: '',
    MobileNumber: '',
    Role: '',
    Brands: [],
    Latitude: 0,
    Longitude: 0,
}

function Registration() {
    const [role, setRole] = useState(true);
    const [next, setNext] = useState(false);
    const [secondNext, setSecondNext] = useState(false);
    const [registrationUserData, setRegistrationUserData] = useState(initialForm);
    const [success, setSuccess] = useState();
    const [form] = Form.useForm();
    function onRoleChange(e) {
        setRegistrationUserData((prevState) => ({
            ...prevState,
            ['Role']: e
        }))
        if (e === 'Buyer'){
            setRole(true)
        }else {
            setRole(false)
        }
    }
    function onChange(e) {
        const {name, value} = e.target;
        setRegistrationUserData((prevState) => ({
                ...prevState,
                [name]: value
            }
        ));
    }

    function onFinish() {
        if (role && !next || !role && secondNext){
            fetch(process.env.REACT_APP_REGISTER_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify(registrationUserData) })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'error'){
                        customMessage(`${data.status}`, `Already registered with this number`);
                    } else {
                        customMessage(`${data.status}`, `${data.message}`);
                        setSuccess(data.success);
                        localStorage.setItem('authUserMobileNumber', `${registrationUserData.MobileNumber}`);
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    return (
        <Container>
                {
                    !next ? <h1 className="text-center mt-5 py-4">
                        Registration
                    </h1> : null
                }
                <Form
                    name="registration"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    {
                        !next ?
                            <>
                            <Form.Item
                                label="Enter your Full Name:"
                                name="FullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input name="FullName" onChange={onChange} />
                            </Form.Item>

                            <Form.Item
                                name="role"
                                label="Select your role:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select your role'
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select your role"
                                    name="role"
                                    onChange={onRoleChange}
                                    allowClear
                                >
                                    <Option value="Buyer">Buyer</Option>
                                    <Option value="Seller">Seller</Option>
                                </Select>
                            </Form.Item>

                        <Form.Item
                        label="Enter your phone number:"
                        name="MobileNumber"
                        rules={[
                    {
                        required: true,
                        message: 'Please input your phone!',
                    },
                            {
                                pattern: /^[0-5]{5,15}$/,
                                message: 'Phone number must be between 5 to 15 digits!',
                            }
                        ]}
                        >
                        <Input name="MobileNumber" type={'number'} onChange={onChange}/>
                        </Form.Item>
                            </>
                        :
                            !secondNext ?
                                <EnterLoaction setRegistrationUserData={setRegistrationUserData}/> :
                                <SelectCarBrands setRegistrationUserData={setRegistrationUserData}/>
                    }

                    <Form.Item>
                        {
                            role ?
                                <Button type="primary"
                                        htmlType="submit"
                                        className="w-100">
                                    Submit
                                </Button>
                                :
                                !secondNext ?
                                    <Button type="primary"
                                            htmlType="submit"
                                            className="w-100"
                                            onClick={() => {
                                                if (next) setSecondNext(true);
                                                setNext(true);

                                            }}
                                    >
                                        Next
                                    </Button>
                                    :
                                    <Button type="primary"
                                            htmlType="submit"
                                            className="w-100"
                                            onClick={() => setSecondNext(true)}
                                    >
                                        Submit
                                    </Button>
                        }
                    </Form.Item>
                </Form>
        </Container>
    );
}
export default Registration;

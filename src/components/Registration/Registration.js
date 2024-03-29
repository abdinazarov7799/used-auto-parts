import {Button, Form, Input, Select,message} from "antd";
import {Option} from "antd/es/mentions";
import {Container} from "reactstrap";
import React, {useState} from "react";
import EnterLoaction from "../EnterLocation/EnterLoaction";
import SelectCarBrands from "../SelectCarBrands/SelectCarBrands";
import {customMessage} from "../Message/Message";
import {useNavigate} from "react-router";
import InputMask from 'react-input-mask';


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
    const [form] = Form.useForm();
    const navigate = useNavigate()
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
        const {name} = e.target;
        let value = e.target.value;
        if (name === 'MobileNumber'){
            value = e.target.value.replace(/\s+/g, '');
        }
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
                        localStorage.setItem('authUserMobileNumber', `${registrationUserData.MobileNumber}`);
                        navigate('/')
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
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                    layout={"vertical"}
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
                                            pattern: /^\+\d{3} \d{2} \d{3} \d{4}$/,
                                            message: 'Please enter a valid phone number!',
                                        },
                                    ]}
                                >
                                    <InputMask
                                        mask="+\9\7\1 99 999 9999"
                                        placeholder="+971 __ ___ ____"
                                        value={registrationUserData.MobileNumber}
                                        onChange={onChange}
                                    >
                                        {(inputProps) => <Input {...inputProps} name="MobileNumber" />}
                                    </InputMask>
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

import {Button, Form, Input, Select} from "antd";
import {Option} from "antd/es/mentions";
import {Container} from "reactstrap";
import React, {useState} from "react";
import EnterLoaction from "../EnterLocation/EnterLoaction";

function Registration() {
    const [role, setRole] = useState(true);
    const [next, setNext] = useState(false);
    function onRoleChange(e) {
        if (e === 'buyer'){
            setRole(true)
        }else {
            setRole(false)
        }
    }
    function onFinish(e) {
        console.log(e)
    }
    return (
        <>
            <Container>
                {
                    !next ? <h1 className="text-center mt-5 py-4">
                        Registration
                    </h1> : null
                }
                <Form
                    name="registration"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {
                        !next ?
                            <>
                            <Form.Item
                                label="Enter your name:"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input />
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
                                    onChange={onRoleChange}
                                    allowClear
                                >
                                    <Option value="buyer">Buyer</Option>
                                    <Option value="seller">Seller</Option>
                                </Select>
                            </Form.Item>

                        <Form.Item
                        label="Enter your phone number:"
                        name="phone"
                        rules={[
                    {
                        required: true,
                        message: 'Please input your phone!',
                    },
                        ]}
                        >
                        <Input />
                        </Form.Item>
                            </>
                        :
                        <EnterLoaction />
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
                                <Button type="primary"
                                        htmlType="submit"
                                        className="w-100"
                                        onClick={() => setNext(true)}
                                >
                                    {!next ? 'Next' : 'Submit'}
                                </Button>
                        }
                    </Form.Item>
                </Form>
            </Container>
        </>
    );
}
export default Registration;

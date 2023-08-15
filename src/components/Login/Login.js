import {Button, Form, Input} from "antd";
import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "reactstrap";
import {useNavigate} from "react-router";
import {customMessage} from "../Message/Message";
import InputMask from "react-input-mask";

function Login() {
    const navigate = useNavigate()
    const [mobileNumber, setMobileNumber] = useState({MobileNumber: ""})
    const [success, setSuccess] = useState()

    function onChange(e) {
        const {name,value} = e.target;
        setMobileNumber((prevState) => ({
                ...prevState,
                [name]: value
            }
        ));
    }
    function onFinish() {
        fetch(process.env.REACT_APP_LOGIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(mobileNumber) })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'error'){
                    customMessage(`${data.status}`, `This number is not registered`);
                } else {
                    localStorage.setItem('authUserMobileNumber', `${mobileNumber.MobileNumber}`);
                    localStorage.setItem('UserID', `${data.user.UserID}`);
                    setSuccess(true);
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    if (success){
        navigate('/');
    }
    return (
      <>
          <Container>
              <h1 className="text-center mt-5 py-4">
                  Login
              </h1>
              <Form onFinish={onFinish}>
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
                          value={mobileNumber}
                          onChange={onChange}
                      >
                          {(inputProps) => <Input {...inputProps} name="MobileNumber" />}
                      </InputMask>
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary"
                              htmlType="submit"
                              className="w-100">
                          Submit
                      </Button>
                  </Form.Item>
              </Form>
          </Container>
      </>
    );
}
export default Login;

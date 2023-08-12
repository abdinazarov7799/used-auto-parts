import {Button, Form, Input} from "antd";
import React from "react";
import {Col, Container, Row} from "reactstrap";

function Login() {
    return (
      <>
          <Container>
              <h1 className="text-center mt-5 py-4">
                  Login
              </h1>
              <Form>
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

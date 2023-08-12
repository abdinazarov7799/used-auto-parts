import {Form, Input} from "antd";
import React from "react";

const SelectCarBrands = (props) => {
    return (
        <div className="mb-4">
            <h1 className="text-center mt-5 py-4">Select car brands <br/> that you sell</h1>
            <Form.Item
                label="Select car brands:"
                name="Brands"
                rules={[
                    {
                        required: true,
                        message: 'Please input your car brand!',
                    },
                ]}
            >
                <Input name="Brands" onChange={props.onchange}/>
            </Form.Item>
        </div>
    );
}
export default SelectCarBrands;

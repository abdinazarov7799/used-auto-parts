import {Form, Input, Select} from "antd";
import React, {useEffect, useState} from "react";
import {Option} from "antd/es/mentions";

const SelectCarBrands = (props) => {
    const [carBrands, setCarBrands] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_BRANDS_API)
            .then(response => response.json())
            .then(response => setCarBrands(response.brands))
            .catch((err) => {
                console.log(err)
            })
    },[])
    return (
        <div className="mb-4">
            <h1 className="text-center mt-5 py-4">Select car brands <br/> that you sell</h1>
            <Form.Item
                label="Select car brands:"
                name="Brands"
                rules={[
                    {
                        required: true,
                        message: 'Please select car brands that you sell!',
                        type: "array"
                    },
                ]}
            >
                <Select mode="multiple"
                        placeholder="Select car brands that you sell"
                        name="Brands"
                        onChange={(e) => {
                            props.setRegistrationUserData((prevState) => ({
                                    ...prevState,
                                    Brands: e
                                }
                            ));
                        }}
                >
                    {carBrands.map((el) => <Option key={el.BrandID} value={el.BrandID}>{el.BrandName}</Option>)}
                </Select>
            </Form.Item>
        </div>
    );
}
export default SelectCarBrands;

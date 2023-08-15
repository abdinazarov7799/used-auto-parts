import React from 'react';
import { Input } from 'antd';
import InputMask from 'react-input-mask';

const PhoneNumberInput = ({ onChange }) => {
    return (
        <InputMask
            mask="+971 99 999 9999"
            onChange={onChange}
        >
            {(inputProps) => <Input {...inputProps} type="text" />}
        </InputMask>
    );
};

export default PhoneNumberInput;

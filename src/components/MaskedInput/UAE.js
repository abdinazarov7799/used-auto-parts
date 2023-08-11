import React from 'react';
import { Input } from 'antd';
import InputMask from 'react-input-mask';

const UAEMaskedInput = (props) => {
    return (
        <InputMask mask="+971 99 999 9999" {...props}>
            {(inputProps) => <Input {...inputProps} />}
        </InputMask>
    );
};

export default UAEMaskedInput;

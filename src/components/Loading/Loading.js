import React from 'react';
import {Spin} from "antd";
import classes from "./Loading.module.css";

const Loading = () => {
    return (
        <Spin tip="Loading" size="large" className={classes.Load}>
            <div className="content" />
        </Spin>
    );
};

export default Loading;
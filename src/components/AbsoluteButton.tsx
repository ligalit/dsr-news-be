import React from 'react';
import {Button} from "antd";
import {IAbsoluteButton} from "../interfaces/interface";

const AbsoluteButton = ({
                            onClick,
                            icon,
                            right,
                            danger
                        }: IAbsoluteButton) => {
    return (
        <Button style={{
            position: "absolute",
            right: right,
            top: 0,
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "3px",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
        }} type="primary" danger={danger} onClick={onClick}
                icon={icon}/>
    );
};

export default AbsoluteButton;
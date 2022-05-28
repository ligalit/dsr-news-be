import React from 'react';
import {Avatar, Button, Select, Typography} from "antd";
import {IUserProps} from "../../interfaces/interface";
import {DeleteOutlined, UserOutlined} from '@ant-design/icons';

const User = ({u, handleChange, handleDelete, children}: IUserProps) => {
    return (
        <div className="user">
            <div>
                <Avatar shape="square" size="large"
                        icon={<UserOutlined/>}/>
            </div>
            <div className="user-text">
                <Typography>{u.firstName}</Typography>
                <Typography>{u.lastName}</Typography>
            </div>
            <Select
                style={{
                    width: "20%"
                }}
                defaultValue={u.role} onChange={(e) => handleChange(u.id, e)}
                placeholder="Select user role">{children}</Select>
            <Button style={{
                position: "absolute",
                right: 0,
                top: 0,
                borderTopLeftRadius:"0",
                borderTopRightRadius: "3px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius:"0",
            }} type="primary" danger
                    onClick={() => handleDelete(u.id)} icon={<DeleteOutlined/>}/>

        </div>
    );
};

export default User;
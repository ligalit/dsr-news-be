import React from 'react';
import {Avatar, Button, Select, Typography} from "antd";
import {IUserProps} from "../../interfaces/interface";
import {DeleteOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import AbsoluteButton from "../AbsoluteButton";

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
            <Button type="primary"><Link to={`user/${u.id}`}>User's News</Link></Button>
            <Select
                style={{
                    width: "20%"
                }}
                defaultValue={u.role} onChange={(e) => handleChange(u.id, e)}
                placeholder="Select user role">{children}
            </Select>
            <AbsoluteButton right={"0"} icon={<DeleteOutlined/>} danger={true} onClick={() => handleDelete(u.id)}/>
        </div>
    );
};

export default User;
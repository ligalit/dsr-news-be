import React from 'react';
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import UserForm from "../form_components/UserForm";

const DropDownUser = () => {

    return <div className="dropdown">
        <div>
            <Avatar shape="square" size="large"
                    icon={<UserOutlined/>}/>
        </div>
        <div className="dropdown-content">
            <UserForm/>
        </div>
    </div>
};

export default DropDownUser;
import React, {useEffect} from 'react';
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import UserForm from "../form_components/UserForm";
import {authStore} from "../../store/authStore";
import {observer} from "mobx-react";

const DropDownUser = observer(() => {
    useEffect(() => {},[authStore.isLogging])
    return localStorage.getItem("token") ? (
        <div className="dropdown">
            <div>
                <Avatar shape="square" size="large"
                        icon={<UserOutlined/>}/>
            </div>
            <div className="dropdown-content">
                <UserForm/>
            </div>
        </div>
    ) : null;
});

export default DropDownUser;
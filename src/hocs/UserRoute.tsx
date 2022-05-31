import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {observer} from "mobx-react";
import {ILoadingProps} from "../interfaces/interface";
import {Spin} from "antd";

const UserRoute = observer(({isLogging}: ILoadingProps) => {

    if (localStorage.getItem("token") === null) {
        return <Navigate to="/" replace/>
    }

    return isLogging ? <Spin size="large"/> : <Outlet/>;
});

export default UserRoute;
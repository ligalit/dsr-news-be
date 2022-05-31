import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {observer} from "mobx-react";
import {ILoadingProps} from "../interfaces/interface";

const AdminRoute = observer(({role}: ILoadingProps) => {

    if (localStorage.getItem("token") === null || role !== "admin") {
        return <Navigate to="*" replace/>
    }

    return <Outlet/>;
});

export default AdminRoute;
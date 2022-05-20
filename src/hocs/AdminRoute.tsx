import React, {useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {userStore} from "../store/userStore";
import {observer} from "mobx-react";
import {authStore} from "../store/authStore";

const AdminRoute = observer(() => {
    useEffect(()=>{},[authStore.isLogging])

    if(localStorage.getItem("token") === null || userStore.role !== "admin"){
        return <Navigate to="/" replace/>
    }

    return <Outlet/>;
});

export default AdminRoute;
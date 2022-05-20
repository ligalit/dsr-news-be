import React from 'react';
import {observer} from "mobx-react";
import { authStore } from '../store/authStore';
import {Spin} from "antd";
import Form from "./Form";

const Sidenav = observer(() => {
    return (
        <aside className="sidenav">
            {authStore.isLogging ? <Spin size="large"/> : <Form/>}
        </aside>
    );
});

export default Sidenav;
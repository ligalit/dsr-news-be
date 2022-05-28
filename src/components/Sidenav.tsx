import React, {useState} from 'react';
import {observer} from "mobx-react";
import {authStore} from '../store/authStore';
import {Spin} from "antd";
import Form from "./form_components/Form";
import {userStore} from '../store/userStore';
import NewsForm from "./form_components/NewsForm";

const Sidenav = observer(() => {

    return (
        <aside className="sidenav">
            {authStore.isLogging ? <Spin size="large"/> : <Form/>}
            {localStorage.getItem("token") !== null && userStore.getUserRole() !== "reader" &&
                <NewsForm/>
            }
        </aside>
    );
});

export default Sidenav;
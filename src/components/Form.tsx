import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import AuthorizationForm from "./AuthorizationForm";
import {authStore} from "../store/authStore";

const Form = observer(() => {
    useEffect(() => {},[authStore.isLogging])
    return localStorage.getItem("token") ? null : <AuthorizationForm/>;
});

export default Form;
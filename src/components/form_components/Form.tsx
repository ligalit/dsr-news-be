import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import {authStore} from "../../store/authStore";
import AuthorizationForm from './AuthorizationForm';

const Form = observer(() => {
    useEffect(() => {},[authStore.isLogging])
    return localStorage.getItem("token") ? null : <AuthorizationForm/>;
});

export default Form;
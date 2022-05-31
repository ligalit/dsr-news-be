import React from 'react';
import AuthorizationForm from './AuthorizationForm';

const Form = () => {
    return localStorage.getItem("token") ? null : <AuthorizationForm/>;
};

export default Form;
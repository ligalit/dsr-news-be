import React, {useState} from 'react';
import {Form, Input, Button, Typography} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import {authStore} from "../store/authStore";
import {observer} from "mobx-react";

const AuthorizationForm = observer(() => {
    const [isLogin,setIsLogin] = useState(true);
    const onFinish = async (values: any) => {
        isLogin ? await authStore.logIn(values) : await authStore.signUp(values);
    };

    return <Form
        name="authorization_form"
        onFinish={onFinish}
    >
        <Form.Item>
            <Typography.Title style={{textAlign:"center"}} level={3}>{isLogin ? "Log In":"Sign Up"}</Typography.Title>
        </Form.Item>
        <Form.Item
            name="login"
            rules={[{ required: true, message: 'Please input your Login!' }]}
        >
            <Input prefix={<UserOutlined/>} placeholder="Login" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input
                prefix={<LockOutlined/>}
                type="password"
                placeholder="Password"
            />
        </Form.Item>
        <Form.Item>
            <Button style={{width:"100%"}} type="primary" htmlType="submit">
                {isLogin ? "Log In":"Sign Up"}
            </Button>
        </Form.Item>
        <Form.Item style={{textAlign:"center"}}>
            Or <Link to={""} onClick={() => setIsLogin(prevState => !prevState)}>{isLogin ? "Sign Up":"Log In"}</Link>
        </Form.Item>
    </Form>
});

export default AuthorizationForm;
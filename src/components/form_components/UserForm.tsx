import React, {useEffect, useMemo} from 'react';
import {Avatar, Button, Form, Input, Select, Checkbox, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {userStore} from '../../store/userStore';
import {authStore} from '../../store/authStore';

const UserForm = observer(() => {

    const onFinish = async (values: any) => {
        await userStore.updateUserInfo(values);
    };

    useEffect(() => {
                userStore.getUserInfo();
        }
        , [])

    const formInputItems = useMemo(() => [
        {name: "firstName", placeholder: "First name"},
        {name: "lastName", placeholder: "Last Name"},
        {name: "nickname", placeholder: "Nickname"},
        {name: "phone", placeholder: "Phone"}
    ], [])

    const formCheckBoxItems = useMemo(() => [
        {name: "showFirstName", placeholder: "Show First Name"},
        {name: "showLastName", placeholder: "Show Last Name"},
        {name: "showPhone", placeholder: "Show Phone"},
    ], [])


    return (
        <Form
            name="user_form"
            onFinish={onFinish}
            initialValues={{
                firstName: userStore.firstName,
                lastName: userStore.lastName,
                nickname: userStore.nickname,
                phone: userStore.phone,
                showFirstName: userStore.showFirstName,
                showLastName: userStore.showLastName,
                showPhone: userStore.showPhone
            }}
        >
            <Form.Item style={{textAlign: "center",marginBottom:"10px"}}>
                <Avatar shape="square" size="large"
                        icon={<UserOutlined/>}/>
                <Typography.Title style={{textAlign: "center", margin: "10px 0px 0px"}}
                                  level={4}>{userStore.role}</Typography.Title>
            </Form.Item>
            {formInputItems.map((item) =>
                <Form.Item key={item.name} name={item.name}><Input placeholder={item.placeholder}/></Form.Item>)}
            <Form.Item>
                <Select disabled mode="multiple" placeholder="Tags" defaultValue={userStore.tags}>
                </Select>
            </Form.Item>
            {formCheckBoxItems.map((item) => <Form.Item key={item.name} name={item.name} valuePropName="checked">
                <Checkbox>{item.placeholder}</Checkbox>
            </Form.Item>)}
            <Form.Item>
                <Button style={{width: "100%"}} type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </Form.Item>
            <Form.Item>
                <Button style={{width: "100%"}} type="primary" danger onClick={() => authStore.logOut()}>
                    Log Out
                </Button>
            </Form.Item>
        </Form>
    );
});

export default UserForm;
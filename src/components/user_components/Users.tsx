import React, {useEffect, useMemo} from 'react';
import {adminStore} from "../../store/adminStore";
import {Select} from "antd";
import {observer} from "mobx-react";
import User from './User';

const {Option} = Select;

const Users = observer(() => {
    useEffect(() => {
        adminStore.getUsers();
    }, [])

    const children = useMemo(() => <>
        <Option value="reader">Reader</Option>
        <Option value="writer">Writer</Option>
        <Option value="admin">Admin</Option>
    </>, [])

    const handleChange = async (id: number, value: string) => {
        await adminStore.updateUserRole(id, value);
    };

    const handleDelete = async (id: number) => {
        await adminStore.deleteUser(id);
    };

    return (
        <div className="users">
            {adminStore.users.map((u) => <User key={u.id} u={u} children={children} handleChange={handleChange}
                                               handleDelete={handleDelete}/>)}
        </div>
    );
});

export default Users;
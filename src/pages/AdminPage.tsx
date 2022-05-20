import React, {useEffect} from 'react';
import {adminStore} from "../store/adminStore";

const AdminPage = () => {
    useEffect(() => {
        adminStore.getUserNews(1);
    },[])
    return (
        <div>
            Hello Admin
        </div>
    );
};

export default AdminPage;
import React from 'react';
import {Outlet} from 'react-router-dom';
import {observer} from "mobx-react";

const AdminPage = observer(() => {

    return (
        <div>
            <Outlet/>
        </div>
    );
});

export default AdminPage;
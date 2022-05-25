import React from 'react';
import Users from '../components/Users';

const AdminPage = () => {

    return (
        <div style={{
            margin: "10px",
            display: 'flex',
            flexDirection: "column",
            gap: "10px"
        }}>
            <Users/>
        </div>
    );
};

export default AdminPage;
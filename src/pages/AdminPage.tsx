import React from 'react';
import Tags from '../components/Tags';
import Users from '../components/user_components/Users';

const AdminPage = () => {

    return (
        <div style={{
            marginTop: "10px",
            display: 'flex',
            flexDirection: "column",
            gap: "10px"
        }}>
            <Tags/>
            <Users/>
        </div>
    );
};

export default AdminPage;
import React from 'react';
import {Button, Result} from 'antd';
import {Link, useParams} from "react-router-dom";

const NotExist = ({error}: { error: string }) => {
    const {id} = useParams();
    if (id) {
        return <Result
            status="warning"
            title={error}
            extra={<Button type="primary"><Link to="/admin">Back To Users</Link></Button>}
        />
    }

    return (
        <Result
            status="warning"
            title={error}
        />
    );
};

export default NotExist;
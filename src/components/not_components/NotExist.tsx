import React from 'react';
import { Result } from 'antd';

const NotExist = ({error}:{error:string}) => {
    return (
        <Result
            status="warning"
            title={error}
        />
    );
};

export default NotExist;
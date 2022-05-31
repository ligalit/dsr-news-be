import React, {useEffect} from 'react';
import {Link, Outlet, useParams} from 'react-router-dom';
import {adminStore} from "../../store/adminStore";
import {newsStore} from "../../store/newsStore";
import {Button} from "antd";

const AdminUsersNews = () => {

    let {id} = useParams();

    useEffect(() => {
        adminStore.getUserNews(Number(id));
    }, [id])

    return (
        <div>
            {newsStore.news.length > 0 && <Button><Link to="/admin">Back to users</Link></Button>}
            <Outlet context={newsStore.news}/>
        </div>
    );
};

export default AdminUsersNews;
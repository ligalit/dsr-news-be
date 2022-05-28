import React, {useEffect} from 'react';
import {newsStore} from '../store/newsStore';
import {Outlet} from "react-router-dom";
import {Spin} from 'antd';
import {observer} from "mobx-react";

const NewsPage = observer(() => {
    useEffect(() => {
        newsStore.getAllNews()
    }, [])

    useEffect(() => {
    }, [newsStore.isLogging])
    return (
        <>
            {newsStore.isLogging ? <Spin size="large"/> : <Outlet/>}
        </>
    );
});

export default NewsPage;
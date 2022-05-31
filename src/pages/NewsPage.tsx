import React, {useEffect} from 'react';
import {newsStore} from '../store/newsStore';
import {Outlet} from "react-router-dom";
import {observer} from "mobx-react";
import {ILoadingProps} from "../interfaces/interface";

const NewsPage = observer(({isLogging}: ILoadingProps) => {

    useEffect(() => {
        newsStore.getNewsTags();
    }, []);

    return (
        <Outlet/>
    );
});

export default NewsPage;
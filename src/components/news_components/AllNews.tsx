import React, {useEffect, useMemo} from 'react';
import {Outlet} from "react-router-dom";
import {newsStore} from "../../store/newsStore";
import {observer} from "mobx-react";

const AllNews = observer(() => {

    const memoNews = useMemo(() => newsStore.news.filter(n => n.state !== "draft"), [newsStore.news])

    useEffect(() => {
        newsStore.getAllNews()
    }, []);

    return (
        <Outlet context={memoNews}/>
    );
});

export default AllNews;
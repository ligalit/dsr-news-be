import React from 'react';
import NotExist from "../not_components/NotExist";
import NewsPost from './NewsPost';
import {INews} from "../../interfaces/interface";
import {adminStore} from '../../store/adminStore';
import {userStore} from "../../store/userStore";
import {newsStore} from "../../store/newsStore";
import {useOutletContext} from "react-router-dom";
import {observer} from "mobx-react";

const News = observer(() => {
    const news = useOutletContext<INews[]>();

    const handleDelete = async (id: number) => {
        if (userStore.role === "writer")
            await newsStore.deleteNews(id);
        else
            await adminStore.deleteNews(id);
    };

    const onVisible = (isVisible: boolean, id: number) => {
        if (isVisible) {
            newsStore.setReadNews(id);
        }
    };

    return (
        <div className="news">
            {news.length > 0 ? news.map((n, i) =>
                    <NewsPost
                        onVisible={onVisible}
                        handleDelete={handleDelete}
                        n={n}/>)
                :
                <NotExist error={"News not found"}/>}
        </div>
    );
});

export default News;
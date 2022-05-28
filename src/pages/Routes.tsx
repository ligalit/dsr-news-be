import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import NotFound from "../components/not_components/NotFound";
import AdminPage from "./AdminPage";
import AdminRoute from "../hocs/AdminRoute";
import UserRoute from "../hocs/UserRoute";
import NewsPage from "./NewsPage";
import NotAuthorized from "../components/not_components/NotAuthorized";
import {newsStore} from "../store/newsStore";
import News from "../components/news_components/News";
import {observer} from "mobx-react";


const RoutesComponent = observer(() => {
    return (
        <main className="main">
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/" element={<NotAuthorized/>}/>
                <Route element={<UserRoute/>}>
                    <Route element={<NewsPage/>}>
                        <Route path="/news" element={<News news={newsStore.news}/>}/>
                    </Route>
                </Route>
                <Route element={<AdminRoute/>}>
                    <Route path="/admin" element={<AdminPage/>}/>
                </Route>
            </Routes>
        </main>
    );
});

export default RoutesComponent;
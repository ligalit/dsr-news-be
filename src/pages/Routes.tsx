import React from 'react';
import {observer} from "mobx-react";
import {
    Routes,
    Route,
} from "react-router-dom";

import AdminUsersTags from "../components/admin_components/AdminUsersTags";
import AdminUsersNews from "../components/admin_components/AdminUsersNews";
import NotFound from "../components/not_components/NotFound";
import NotAuthorized from "../components/not_components/NotAuthorized";
import News from "../components/news_components/News";
import AllNews from "../components/news_components/AllNews";
import MyNews from "../components/news_components/MyNews";
import AdminPage from "./AdminPage";
import NewsPage from "./NewsPage";

import AdminRoute from "../hocs/AdminRoute";
import UserRoute from "../hocs/UserRoute";

import {authStore} from "../store/authStore";
import {userStore} from '../store/userStore';
import {newsStore} from "../store/newsStore";
import SubscriptionNews from "../components/news_components/SubscriptionNews";
import {Endpoints} from "../utils/endpoints";


const RoutesComponent = observer(() => {
    return (
        <main className="main">
            <Routes>
                <Route path={Endpoints.notFound} element={<NotFound/>}/>
                <Route path={Endpoints.notAuthorized} element={<NotAuthorized/>}/>
                <Route element={<UserRoute isLogging={authStore.isLogging}/>}>
                    <Route path={Endpoints.news} element={<NewsPage isLogging={newsStore.isLogging}/>}>
                        <Route element={<AllNews/>}>
                            <Route index element={<News/>}/>
                        </Route>
                        <Route element={<MyNews/>}>
                            <Route path={Endpoints.my} element={<News/>}/>
                        </Route>
                        <Route element={<SubscriptionNews/>}>
                            <Route path={Endpoints.subscriptions} element={<News/>}/>
                        </Route>
                    </Route>
                </Route>
                <Route element={<AdminRoute isLogging={authStore.isLogging} role={userStore.role}/>}>
                    <Route path={Endpoints.admin} element={<AdminPage/>}>
                        <Route index element={<AdminUsersTags/>}/>
                        <Route path={Endpoints.user} element={<AdminUsersNews/>}>
                            <Route index element={<News/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </main>
    );
});

export default RoutesComponent;
import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import AdminPage from "./AdminPage";
import AdminRoute from "../hocs/AdminRoute";

const RoutesComponent = () => {
    return (
        <main className="main">
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route element={<AdminRoute/>}>
                    <Route path="/admin" element={<AdminPage/>}/>
                </Route>
                <Route path="/" element={""}/>
            </Routes>
        </main>
    );
};

export default RoutesComponent;
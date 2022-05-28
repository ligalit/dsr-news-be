import { observer } from 'mobx-react';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {userStore} from "../../store/userStore";
import {authStore} from "../../store/authStore";

const Links = observer(() => {
    useEffect(() => {
    },[authStore.isLogging])
    return (
        <div className="links">
            {localStorage.getItem("token") && <Link to={"/news"}>News</Link>}
            {localStorage.getItem("token") && <Link to={"/subscriptions"}>Subscriptions</Link>}
            {userStore.role === "admin" && localStorage.getItem("token") && <Link to={"/admin"}>Admin</Link>}
        </div>
    );
});

export default Links;
import React from 'react';
import {Link} from "react-router-dom";
import {userStore} from "../../store/userStore";
import {observer} from "mobx-react";

const Links = observer(() => {
    return (
        <div className="links">
            {localStorage.getItem("token") && <Link to={"/news"}>News</Link>}
            {localStorage.getItem("token") &&
                <Link to={`/news/subscriptions?tags=${userStore.tags}`}>Subscriptions</Link>}
            {JSON.parse(localStorage.getItem('user') || '{}').role === "admin" && localStorage.getItem("token") &&
                <Link to={"/admin"}>Admin</Link>}
        </div>
    );
});

export default Links;
import { observer } from 'mobx-react';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {userStore} from "../store/userStore";
import {authStore} from "../store/authStore";

const Links = observer(() => {
    useEffect(() => {
    },[authStore.isLogging])
    return (
        <div className="links">
            <Link to={"/"}>News</Link>
            {userStore.role === "admin" && <Link to={"/admin"}>Admin</Link>}
        </div>
    );
});

export default Links;
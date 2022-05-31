import React from 'react';
import {observer} from "mobx-react";
import {Button, Spin} from "antd";
import Form from "./form_components/Form";
import {userStore} from '../store/userStore';
import NewsForm from "./form_components/NewsForm";
import {ILoadingProps} from "../interfaces/interface";
import {Link} from "react-router-dom";

const Sidenav = observer(({isLogging}: ILoadingProps) => {
    return (
        <aside className="sidenav">
            {isLogging ? <Spin size="large"/> : <Form/>}
            {localStorage.getItem("token") !== null && userStore.getUserRole() !== "reader" &&
                <div>
                    <NewsForm/>
                    <Button type="default"
                            style={{marginTop: "10px", width: "100%", height: "8vh", fontSize: "18px"}}><Link
                        to="news/my">Show My News</Link></Button>
                </div>
            }
        </aside>
    );
});

export default Sidenav;
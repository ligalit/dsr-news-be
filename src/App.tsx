import React from 'react';
import './App.css';
import Header from "./components/header_components/Header";
import Sidenav from "./components/Sidenav";
import Routes from './pages/Routes';
import {observer} from 'mobx-react';
import {authStore} from "./store/authStore";


function App() {
    return (
        <div className="App">
            <Header/>
            <div className="container">
                <Routes/>
                <Sidenav isLogging={authStore.isLogging}/>
            </div>
        </div>
    );
}

export default observer(App);

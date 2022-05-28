import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/header_components/Header";
import Sidenav from "./components/Sidenav";
import Routes from './pages/Routes';


function App() {
    return (
        <div className="App">
            <Header/>
            <div className="app__inner">
                <Routes/>
                <Sidenav/>
            </div>
        </div>
    );
}

export default App;

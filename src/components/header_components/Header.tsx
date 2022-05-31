import React from 'react';
import DropDownUser from "./DropDownUser";
import Links from './Links';


const Header = () => {
    return (
        <header className="header">
            {localStorage.getItem("token") ? <div className="container">
                <Links/>
                <DropDownUser/>
            </div> : null}
        </header>
    );
};

export default Header;
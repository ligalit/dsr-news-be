import React from 'react';
import DropDownUser from "./DropDownUser";
import Links from './Links';


const Header:React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <Links/>
                <DropDownUser/>
            </div>
        </header>
    );
};

export default Header;
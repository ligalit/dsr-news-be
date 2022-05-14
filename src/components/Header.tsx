import React from 'react';
import {Link} from "react-router-dom";

const Header:React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <Link to={"/"} >News</Link>
            </div>
        </header>
    );
};

export default Header;
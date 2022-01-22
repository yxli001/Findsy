import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
export const Navitem = (props) => {
    const { url, name } = props;

    return (
        <div className="nav-item-container">
            <Link to={url} className="nav-item">
                <h4 className="link">{name}</h4>
            </Link>
        </div>
    );
};

export default Navitem;

import React from "react";
import Navitem from "./Navitem";
import NavLogo from "./NavLogo";
import "./Navbar.css";
import navAnimationHandler from "./NavAnimationHandler";
import hideNavbar from "./HideNavbar";

export const Navbar = (props) => {
    return (
        <nav className="navbar">
            <div className="logo" onClick={hideNavbar}>
                <NavLogo url="/" name="Findsy" />{" "}
            </div>
            <ul className="nav-links">
                <li className="link" onClick={hideNavbar}>
                    <Navitem url="/" name="Home" />
                </li>
                <li className="link" onClick={hideNavbar}>
                    <Navitem url="/events" name="Upcoming Events" />
                </li>
                <li className="link" onClick={hideNavbar}>
                    <Navitem url="/events/new" name="Post Event" />
                </li>
                {props.token === "" ? (
                    <Navitem url="/login" name="Login" />
                ) : (
                    <Navitem url="/signup" name="Welcome" />
                )}
            </ul>
            <div className="burger" onClick={navAnimationHandler}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
};

export default Navbar;

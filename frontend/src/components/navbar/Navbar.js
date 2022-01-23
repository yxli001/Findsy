import React from "react";
import Navitem from "./Navitem";
import NavLogo from "./NavLogo";
import "./Navbar.css";
import navAnimationHandler from "./NavAnimationHandler";
import hideNavbar from "./HideNavbar";

export const Navbar = (props) => {
    const logoutFunction = () => {
        localStorage.removeItem("token");
        props.tokenGiver(null);
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={hideNavbar}>
                <NavLogo url="/" name="Findsy" />
            </div>
            <ul className="nav-links">
                <li className="link" onClick={hideNavbar}>
                    <Navitem url="/events" name="Find Events" />
                </li>

                {props.token !== null ? (
                    <>
                        <li className="link" onClick={hideNavbar}>
                            <Navitem
                                url="/events/my_events"
                                name="My Posted Events"
                            />
                        </li>
                        <li className="link" onClick={hideNavbar}>
                            <Navitem
                                url="/events/bookmarked"
                                name="Bookmarked Events"
                                token={props.token}
                            />
                        </li>
                    </>
                ) : (
                    <></>
                )}
                <li className="link" onClick={hideNavbar}>
                    {props.token === null ? (
                        <Navitem url="/signup" name="Sign Up/Log In" />
                    ) : (
                        <div className="nav-item-container">
                            <p
                                className="logout link nav-item"
                                onClick={logoutFunction}
                            >
                                Logout
                            </p>
                        </div>
                    )}
                </li>
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

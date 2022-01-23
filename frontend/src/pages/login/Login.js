import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import qs from "qs";

export const Login = (props) => {
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [feedbackState, setFeedbackState] = useState("");
    const loginSubmitHandler = (e) => {
        e.preventDefault();
        loginUser();
        setEmailState("");
        setPasswordState("");
    };

    const [redirect, setRedirect] = useState(false);

    const loginUser = async () => {
        let res = await axios({
            method: "post",
            url: "http://localhost:5000/api/auth/login",
            data: qs.stringify({
                username: emailState,
                password: passwordState,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        if (res.status === 200) {
            localStorage.setItem("token", res.data.data);
            // console.log(localStorage.getItem("token")); //Have the token
            props.tokenGiver(localStorage.getItem("token")); //Give the token and update the state
            setRedirect(true);
        }
    };

    return (
        <div className="login-wrapper">
            {redirect && (
                <Navigate
                    to={{
                        pathname: "/events",
                    }}
                />
            )}
            <div className="secondary-login-wrapper">
                <h1 className="login-form-header">Findsy</h1>
                <p>Connect with your community</p>
                <h4 className="redirect-link">
                    <a className="redirect-link" href="/signup">
                        Don't have an account? You can create one here
                    </a>
                </h4>
                <div className="login-form-wrapper">
                    <div className="forced-center">
                        <h3>Login</h3>
                        <p className="feedback">{feedbackState}</p>
                    </div>
                    <form onSubmit={loginSubmitHandler}>
                        <div className="login-form-section">
                            <p className="form-header-title">Email</p>
                            <input
                                type="email"
                                name="email"
                                id="email-login"
                                value={emailState}
                                onChange={(e) => setEmailState(e.target.value)}
                                className="form-input"
                                required={true}
                            />
                        </div>
                        <div className="login-form-section">
                            <p className="form-header-title">Password</p>
                            <input
                                type="password"
                                name="password"
                                id="password-login"
                                value={passwordState}
                                onChange={(e) =>
                                    setPasswordState(e.target.value)
                                }
                                className="form-input"
                                required={true}
                            />
                        </div>
                        <div className="form-section submit-section">
                            <input
                                className="post-event-submit"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

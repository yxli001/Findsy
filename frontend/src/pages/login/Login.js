import React, { useState } from "react";
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
        if (res.data.error) {
            setFeedbackState(res.data.error);
        } else {
            setFeedbackState("");
            const token = res.data.token;
            localStorage.setItem("jwtToken", token);

            //Save in local storage
            //Add some middleware to check if the token is there in local storage
            //Verify token

            // setAuthorizationToken(token);
        }
        console.log(res);
    };

    return (
        <div className="login-wrapper">
            <div className="secondary-login-wrapper">
                <h1 className="login-form-header">Findsy</h1>
                <p>Connect with your community</p>
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

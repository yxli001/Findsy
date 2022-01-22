import React, { useState } from "react";
import axios from "axios";
import qs from "qs";

export const Signup = (props) => {
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [nameState, setNameState] = useState("");
    const signUpSubmitHandler = (e) => {
        e.preventDefault();
        signUpUser();

        setEmailState("");
        setPasswordState("");
        setNameState("");
    };

    const signUpUser = async () => {
        let res = await axios({
            method: "post",
            url: "http://localhost:5000/api/auth/register",
            data: qs.stringify({
                name: nameState,
                username: emailState,
                password: passwordState,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        console.log(res);
        alert("Success");
    };

    return (
        <div className="login-wrapper">
            <div className="secondary-login-wrapper">
                <h1 className="login-form-header">Findsy</h1>
                <p>Connect with your community</p>
                <div className="login-form-wrapper">
                    <div className="forced-center">
                        <h3>Sign Up</h3>
                    </div>
                    <form onSubmit={signUpSubmitHandler}>
                        <div className="login-form-section">
                            <p className="form-header-title">Name</p>
                            <input
                                type="text"
                                name="name"
                                id="name-signup"
                                value={nameState}
                                onChange={(e) => setNameState(e.target.value)}
                                className="form-input"
                                required={true}
                            />
                        </div>
                        <div className="login-form-section">
                            <p className="form-header-title">Email</p>
                            <input
                                type="email"
                                name="email"
                                id="email-signup"
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
                                id="password-sigup"
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

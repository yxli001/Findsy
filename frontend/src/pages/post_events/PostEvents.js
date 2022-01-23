import React, { useState } from "react";
import "./PostEvents.css";
import axios from "axios";
import qs from "qs";

export const PostEvents = (props) => {
    const [titleState, setTitleState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const [dateState, setDateState] = useState("");
    const [locationState, setLocationState] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        setTitleState("");
        setDescriptionState("");
        setDateState("");
        setLocationState("");

        await axios({
            method: "post",
            url: "http://localhost:5000/api/events",
            data: qs.stringify({
                title: titleState,
                description: descriptionState,
                time: dateState,
                location: locationState,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                authorization: props.token,
            },
        });
    };

    return (
        <div className="post-events-page">
            <div className="post-events-container">
                <div className="post-events-title">
                    <h1 className="post-event-header">New Event</h1>
                </div>
                <div className="post-events-form">
                    <form onSubmit={submitHandler}>
                        <div className="form-section">
                            <p className="form-header-title">Title</p>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={titleState}
                                onChange={(e) => setTitleState(e.target.value)}
                                className="form-input"
                                required={true}
                            />
                        </div>
                        <div className="form-section">
                            <p className="form-header-title">Description</p>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={descriptionState}
                                onChange={(e) =>
                                    setDescriptionState(e.target.value)
                                }
                                className="form-input"
                                required={true}
                            />
                        </div>
                        <div className="form-section">
                            <p className="form-header-title">Date</p>
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                value={dateState}
                                onChange={(e) => setDateState(e.target.value)}
                                className="form-input"
                                required={true}
                            />
                        </div>
                        <div className="form-section">
                            <p className="form-header-title">Location</p>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={locationState}
                                onChange={(e) =>
                                    setLocationState(e.target.value)
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

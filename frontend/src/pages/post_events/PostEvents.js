import React, { useState } from "react";
import "./PostEvents.css";

export const PostEvents = () => {
    const [titleState, setTitleState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const [dateState, setDateState] = useState("");
    const [locationState, setLocationState] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
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
                                type="date"
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

import React, { useState } from "react";
import "./PostEvents.css";

export const PostEvents = () => {
    const [titleState, setTitleState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const [dateState, setDateState] = useState("");

    return (
        <div className="post-events-page">
            <div className="post-events-container">
                <div className="post-events-title">
                    <h1 className="post-event-header">Post Event</h1>
                </div>
                <div className="post-events-form">
                    <form>
                        <div className="form-section">
                            <p className="form-header-title">Title</p>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={titleState}
                                onChange={(e) => setTitleState(e.target.value)}
                                className="form-input"
                                required="true"
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
                                required="true"
                            />
                        </div>
                        <div className="form-section">
                            <p className="form-header-title">Date</p>
                            <input
                                type="date"
                                id="description"
                                name="description"
                                value={dateState}
                                onChange={(e) => setDateState(e.target.value)}
                                className="form-input"
                                required="true"
                            />
                        </div>
                        <div className="form-section submit-section">
                            {/* Submit button post request should be here */}
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

import React from "react";
import "./Event.css";

export default Event = (props) => {
    const { title, author, time, address, description } = props;
    return (
        <div className="event-bookmark-container">
            <h2>{title}</h2>
            <h4>Posted By: {author}</h4>
            <div className="force-inline">
                <h5>{address}</h5>
                <h5>{time}</h5>
            </div>
            <p>{description}</p>
        </div>
    );
};

import React from "react";
import "./Event.css";
export default Event = (props) => {
    const { title, address, time, description } = props;
    return (
        <div className="my-events-event">
            <h2>{title}</h2>
            <p>{address}</p>
            <p>{time}</p>
            <p>{description}</p>
        </div>
    );
};

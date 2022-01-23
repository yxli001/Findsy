import React, { useEffect, useState } from "react";
import "./PostedEvents.css";
import Event from "./Event.js";
import axios from "axios";
import { NoEvents } from "./NoEvents";
import { Link } from "react-router-dom";

export const PostedEvents = (props) => {
    const [myEvents, setMyEvents] = useState([]);
    const getMyEvents = async () => {
        await axios
            .get("http://localhost:5000/api/events/my_events", {
                headers: { authorization: props.token },
            })
            .then((response) => {
                setMyEvents(response.data.myEvents);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getMyEvents();
    }, []);

    return (
        <div>
            {props.token ? (
                <div className="center">
                    <div className="posted-events-container">
                        {myEvents.length === 0 ? <NoEvents /> : <></>}
                        {myEvents.map((event) => {
                            return (
                                <Event
                                    key={event._id}
                                    title={event.title}
                                    address={event.address}
                                    time={new Date(event.time).toLocaleString()}
                                    description={event.description}
                                />
                            );
                        })}
                    </div>
                    <Link to="/events/new" className="new-event">
                        Add new event
                    </Link>
                </div>
            ) : (
                <h2>Please log in</h2>
            )}
        </div>
    );
};

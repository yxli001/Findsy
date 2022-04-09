import React, { useEffect, useState } from "react";
import "./PostedEvents.css";
import Event from "./Event.js";
import axios from "axios";
import { NoEvents } from "./NoEvents";
import { Link } from "react-router-dom";

export const PostedEvents = (props) => {
    const [myEvents, setMyEvents] = useState([]);
    const getMyEvents = async () => {
        axios
            .get("http://localhost:5000/api/events/my_events", {
                headers: { authorization: props.token },
            })
            .then((response) => {
                const events = response.data.myEvents;

                // for (let event of events) {
                //     axios
                //         .get(
                //             `http://localhost:5000/api/events/get_participants/${event._id}`,
                //             {
                //                 headers: { authorization: props.token },
                //             }
                //         )
                //         .then((response) => {
                //             event.participants = response.data.participants;
                //             console.log(event.participants);
                //             setMyEvents(events);
                //         })
                //         .catch((error) => console.log(error));
                // }
                setMyEvents(events);
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
                    <button className="new-event">
                        <Link to="/events/new" className="link-add">
                            Add new event
                        </Link>
                    </button>

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
                                    participants={event.participants}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <h2>Please log in</h2>
            )}
        </div>
    );
};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookmarkedEvents.css";
import axios from "axios";
import Event from "./Event";
import qs from "qs";

export const BookmarkedEvents = (props) => {
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const [username, setUsernameState] = useState("");
    //To get all bookmarked events from user in the get route
    const getAllBookmarkedEvents = async () => {
        await axios
            .get("http://localhost:5000/api/events/bookmarked", {
                headers: { authorization: props.token },
            })
            .then((response) => {
                setBookmarkedEvents(response.data.bookmarkedItems);
            })
            .catch((error) => console.log(error));
    };

    const getName = async (_id) => {
        let res = await axios({
            method: "post",
            url: "http://localhost:5000/api/auth/get_name",
            data: qs.stringify({
                id: _id,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });

        setUsernameState(res.data.name);
    };

    useEffect(() => {
        getAllBookmarkedEvents();
    }, []);

    const noEvents = (
        <div className="no-events">
            <h1 class="no-events-title">
                Go explore events on the Find Events page!
            </h1>
            <Link to="/events" className="find-events">
                Find Events
            </Link>
        </div>
    );

    const events = (
        <div className="grid-bookmark-events">
            {bookmarkedEvents.map((event) => {
                getName(event.author);
                // {
                //     console.log(event.title);
                // }
                return (
                    <Event
                        key={event._id}
                        title={event.title}
                        author={username}
                        time={new Date(event.time).toLocaleString()}
                        address={event.address}
                        description={event.description}
                    />
                );
            })}
        </div>
    );

    //Link to that using axios here and put it in an array
    //Map each item in an array to a component on the screen.
    return <div>{bookmarkedEvents.length === 0 ? noEvents : events}</div>;
};

import React, { useEffect, useState } from "react";
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

    //Link to that using axios here and put it in an array
    //Map each item in an array to a component on the screen.
    return (
        <div className="grid-bookmark-events">
            {/* Add Mapping function */}
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
};

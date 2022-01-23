import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import axios from "axios";
import qs from "qs";

const Events = React.memo((props) => {
    // const [userLocation, setUserLocation] = useState({
    //     lat: 0,
    //     lng: 0,
    // });

    const [events, setEvents] = useState([]);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const [joined, setJoined] = useState(false);

    // let options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0,
    // };

    // const success = (pos) => {
    //     let coord = pos.coords;

    //     setUserLocation({ lat: coord.latitude, lng: coord.longitude });
    // };

    // const errors = (err) => {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    // };

    const getEvents = async () => {
        const res = await axios.get("http://localhost:5000/api/events");

        setEvents(res.data.events);
    };

    const joinEvent = async () => {
        setJoined(true);

        console.log(joined);

        await axios({
            method: "put",
            url: "http://localhost:5000/api/events/join",
            data: qs.stringify({
                eventID: selectedEvent._id,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                authorization: props.token,
            },
        });
    };

    // get the user's location
    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.permissions
    //             .query({ name: "geolocation" })
    //             .then(function (result) {
    //                 if (result.state === "granted") {
    //                     console.log(result.state);
    //                     //If granted then you can directly call your function here
    //                     navigator.geolocation.getCurrentPosition(success);
    //                 } else if (result.state === "prompt") {
    //                     navigator.geolocation.getCurrentPosition(
    //                         success,
    //                         errors,
    //                         options
    //                     );
    //                 } else if (result.state === "denied") {
    //                     //If denied then you have to show instructions to enable location
    //                 }
    //                 result.onchange = function () {
    //                     console.log(result.state);
    //                 };
    //             });
    //     } else {
    //         alert("Please allow Findsy to access your current location.");
    //     }
    // }, []);

    // get events
    useEffect(getEvents, []);

    const Map = () => {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 32.69244, lng: -96.8558 }}
            >
                {events.map((event) => {
                    return (
                        <Marker
                            key={event._id}
                            position={{
                                lat: event.location[0],
                                lng: event.location[1],
                            }}
                            onClick={() => {
                                setSelectedEvent(event);
                            }}
                        />
                    );
                })}

                {selectedEvent && (
                    <InfoWindow
                        position={{
                            lat: selectedEvent.location[0],
                            lng: selectedEvent.location[1],
                        }}
                        onCloseClick={() => {
                            setSelectedEvent(null);
                        }}
                    >
                        <div className="event-details">
                            <h3>{selectedEvent.title}</h3>
                            <p>
                                {new Date(selectedEvent.time).toLocaleString()}
                            </p>
                            <p>{selectedEvent.address}</p>
                            <p>{selectedEvent.description}</p>
                            {props.token && !joined && (
                                <button onClick={joinEvent}>Join</button>
                            )}
                            {!props.token && (
                                <b>Please login before you can join event</b>
                            )}
                            {joined && <b>Joined!</b>}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    };

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <div style={{ width: "100vw", height: "100%" }}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_KEY}`}
                loadingElement={<div style={{ height: "100%" }}></div>}
                containerElement={<div style={{ height: "100%" }}></div>}
                mapElement={<div style={{ height: "100%" }}></div>}
            />
        </div>
    );
});

export default React.memo(Events);

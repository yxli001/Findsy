import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { PostEvents } from "./pages/post_events/PostEvents";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import Events from "./pages/events/Events";
import { BookmarkedEvents } from "./pages/bookmarked_events/BookmarkedEvents";
import { ProtectedRoutes } from "./components/navbar/ProtectedRoutes";
import { Home } from "./pages/home/Home";
import { PostedEvents } from "./pages/posted_events/PostedEvents.js";

const App = () => {
    const [user, setUserState] = useState(null);
    const gimmeJWTToken = (token) => {
        setUserState(token); //Decode the token
    };

    return (
        <Router>
            <div className="navbar">
                <Navbar token={user} tokenGiver={gimmeJWTToken} />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events token={user} />} />
                <Route element={<ProtectedRoutes token={user} />}>
                    <Route
                        path="/events/new"
                        element={<PostEvents token={user} />}
                    />
                    <Route
                        path="/events/bookmarked"
                        element={<BookmarkedEvents token={user} />}
                    />
                </Route>
                <Route
                    path="/login"
                    element={<Login tokenGiver={gimmeJWTToken} />}
                />
                <Route
                    path="/signup"
                    element={<Signup tokenGiver={gimmeJWTToken} />}
                />
                <Route
                    path="/events/my_events"
                    element={<PostedEvents token={user} />}
                />
            </Routes>
        </Router>
    );
};

export default App;

import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { PostEvents } from "./pages/post_events/PostEvents";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import Events from "./pages/events/Events";
const App = () => {
    const [jwtToken, setJwtToken] = useState("");
    const gimmeJWTToken = (token) => {
        setJwtToken(token);
    };
    return (
        <Router>
            <div className="navbar">
                <Navbar token={jwtToken} />
            </div>
            <Routes>
                <Route path="/events" element={<Events />} />
                <Route path="/events/new" element={<PostEvents />} />
                <Route
                    path="/login"
                    element={<Login tokenGiver={gimmeJWTToken} />}
                />
                <Route
                    path="/signup"
                    element={<Signup tokenGiver={gimmeJWTToken} />}
                />
            </Routes>
        </Router>
    );
};

export default App;

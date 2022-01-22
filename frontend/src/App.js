import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { PostEvents } from "./pages/post_events/PostEvents";
const App = () => {
    return (
        <Router>
            <div className="navbar">
                <Navbar />
            </div>
            <Routes>
                <Route path="/post_events" element={<PostEvents />} />
            </Routes>
        </Router>
    );
};

export default App;

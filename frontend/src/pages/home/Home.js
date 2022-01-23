import React from "react";
import "./Home.css";

export const Home = () => {
    return (
        <div className="meme-container">
            <h1>
                This isn't our actual website please continue checking stuff
                out... But enjoy
            </h1>
            <div className="meme-grid">
                <img
                    src="https://www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Jokes-Coding-Error-1024x860.jpg?x34900"
                    alt="WHY DOESN'T IT LOAD"
                    className="meme-image"
                />
                <img
                    src="https://tinyurl.com/yur88n6m"
                    alt="WHY DOESN'T IT LOAD"
                    className="meme-image"
                />
                <img
                    src="https://tinyurl.com/2p8bna8s"
                    alt="WHY DOESN'T IT LOAD"
                    className="meme-image"
                />
                <img
                    src="https://tinyurl.com/2p9v25u5"
                    alt="WHY DOESN'T IT LOAD"
                    className="meme-image"
                />
            </div>
        </div>
    );
};

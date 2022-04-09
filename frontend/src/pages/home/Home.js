import React from "react";
import styles from "./Home.module.css";
import "animate.css";
import { useNavigate } from "react-router-dom";
export const Home = () => {
    let navigate = useNavigate();
    const navigateHandler = () => {
        navigate("/events");
    };
    return (
        <div className={styles.container}>
            {/* Background of some good environmental image maybe*/}
            <div className={styles.imageContainer}>
                <div className={styles.intro}>
                    {/* The findsy part should fizzle in */}
                    <h1
                        className={`${styles.header} animate__animated animate__bounceInLeft`}
                    >
                        Welcome to{" "}
                        <span className={`${styles.title}`}>Findsy</span>
                    </h1>
                    {/* Below should slide in */}
                    <p
                        className={`${styles.description} animate__animated animate__fadeIn animate__slower`}
                    >
                        The only community driven event sharing platform
                    </p>
                    {/* Button should be beating */}
                    <button
                        className={`${styles.joinButton} animate__animated animate__pulse animate__repeat-3	3 animate__delay-1s`}
                        onClick={navigateHandler}
                    >
                        Join an event today!
                    </button>
                </div>
                {/* <div
                    className={`${styles.downwardsArrow} animate__animated animate__shakeY animate__slower 3s animate__infinite	infinite`}
                ></div> */}
            </div>
            <div className={styles.about}></div>
        </div>
    );
};

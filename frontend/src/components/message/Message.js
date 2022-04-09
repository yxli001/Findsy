import React from "react";
import styles from "./message.module.css";
export const Message = (props) => {
    const { type, message } = props;
    return (
        <div
            className={`${styles.container} ${
                type === "warning"
                    ? styles.warning
                    : type === "success"
                    ? styles.success
                    : styles.error
            }`}
        >
            <h4>{message}</h4>
        </div>
    );
};

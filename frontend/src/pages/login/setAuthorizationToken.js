import axios from "axios";

const setAuthorizationToken = (token) => {
    if (token) {
        axios.defaults.header.common["Authorization"] = `Bearer${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
    console.log("Authorization is SET");
};

export default setAuthorizationToken;

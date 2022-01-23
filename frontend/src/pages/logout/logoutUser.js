const logoutFunction = (tokenState) => {
    localStorage.removeItem("token");
};
export default logoutFunction;

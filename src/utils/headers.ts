const getHeaders = () => ({
    headers: {
        "token": `${localStorage.getItem("token")}`
    }
});

export {getHeaders};
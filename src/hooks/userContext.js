
let userID = null;

export const setUserID = (id) => {
    userID = id;
}

export const getUserID = () =>{ return userID}

export const dbServerUrl = "http://localhost:8081"
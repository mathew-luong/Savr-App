import {createContext, useState} from 'react';

const GeneralContext = createContext({
    userID: "",
    username: "",
    userType: true,
    dbServerUrl: "http://localhost:8080",
    setUserIdentification: (id) => {},
    setUsername: (name) => {},
    setType: (type) => {}
})

export const dbServerUrl = "http://localhost:8080"

export function GeneralContextProvider(props){
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [type, setType] = useState();
    
    function setId(newId){
        setUserId(newId);
    }

    function setName(newName){
        setUsername(newName);
    }

    function setUserType(newType){
        setType(newType)
    }

    const context = {
        userID: userId,
        username: username,
        userType: type,
        dbServerUrl: "http://localhost:8080",
        setUserIdentification: setId,
        setUsername: setName,
        setType: setUserType
    }

    return(
        <GeneralContext.Provider value= {context}>
            {props.children}
        </GeneralContext.Provider>
    );
}

export default GeneralContext;
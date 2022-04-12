import {createContext, useState} from 'react';

const GeneralContext = createContext({
    userID: "",
    dbServerUrl: "http://localhost:8080",
    setUserIdentification: (id) => {},
})

export const dbServerUrl = "http://localhost:8080"

export function GeneralContextProvider(props){
    const [userId, setUserId] = useState();
    
    function setId(newId){
        setUserId(newId);
    }

    const context = {
        userID: userId,
        dbServerUrl: "http://localhost:8080",
        setUserIdentification: setId,
    }

    return(
        <GeneralContext.Provider value= {context}>
            {props.children}
        </GeneralContext.Provider>
    );
}

export default GeneralContext;
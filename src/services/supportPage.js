import axios from "axios";
import {dbServerUrl} from "./userContext"

export async function submitMessageAsNormalUser(sendObject){
    let res
    try{
        res = await axios.post(`${dbServerUrl}/api/support/inbox/`, sendObject)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }

}

export async function getMessages(userID){
    let res
    try{
        res = await axios.get(`${dbServerUrl}/api/support/inbox/${userID}`)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}
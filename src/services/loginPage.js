import {dbServerUrl} from "./userContext"
import axios from 'axios'

export async function checkUser(userData){
    let res;
    try{
        res =await axios.post(`${dbServerUrl}/api/login?`, userData);
        return res; 
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

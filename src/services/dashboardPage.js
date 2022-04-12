import axios from 'axios'
import {dbServerUrl} from "./userContext"


export async function getTopDashboardInsights(userID){
    let res;
    console.log(userID)
    try{
        res = await axios.get(`${dbServerUrl}/api/dashboard/topInsights/${userID}`)
        return res;
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function getIncomes(userID, numMonths){
    let res;
    try{
        res = await axios.get(`${dbServerUrl}/api/dashboard/income/${userID}/${numMonths}`)
        return res;
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}
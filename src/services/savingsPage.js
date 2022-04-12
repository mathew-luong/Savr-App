import axios from 'axios'
import {dbServerUrl} from "./userContext"

function getTodaysDate(){
    let today = new Date();
    let todayDate = (today.getMonth()+1)+ '/' + today.getDate()+ '/'+ today.getFullYear()
    return todayDate;
}

export async function postSavingsDeposits(depositObject, userId){

    const savingsDeposit = depositObject["savingsDeposit"]
    let depositBody = {
        userID: userId,
        date : getTodaysDate(),
        amount: savingsDeposit
    }
    console.log(depositBody)
    let res; 
    try{
        res = await axios.post(`${dbServerUrl}/api/savings/deposit`, depositBody)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }

}

export async function postInvestmentsDeposits(depositObject, userId){

    const prevValue = depositObject["prevValue"] 
    const invDeposit = depositObject["investmentsDeposit"]

    let depositBody = {
        userID: userId,
        portfolioValueAtEndOfMonth: prevValue,
        amount: invDeposit,
        date: getTodaysDate()
    }
    console.log(depositBody)
    let res; 
    try{
        res = await axios.post(`${dbServerUrl}/api/investments/deposit`, depositBody)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }

}

export async function getSavingsTimeSeries(userID, numMonths){
    let res;
    try{
        res = await axios.get(`${dbServerUrl}/api/savings/${userID}/${numMonths}`)
        return res;
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}
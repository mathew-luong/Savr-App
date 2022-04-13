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

/**
 * [{month:x, amount: y}]
 *
 */

export function aggregateFunds(investmentsObject, savingsObject){

    let dict = {}
    investmentsObject.forEach(function(entry,index){
        var month = entry.month
        if (!dict[month]){
            dict[month] = entry.amount
        }
        else{
            dict[month]+=entry.amount
        }
    });

    savingsObject.forEach(function(entry,index){
        var month = entry.month
        if (!dict[month]){
            dict[month] = entry.amount
        }
        else{
            dict[month]+=entry.amount
        }
    });

    // let investmentsMonths = investmentsObject.map((obj) =>{

    //     return obj['month']
    // })

    // let savingsMonths = savingsObject.map((obj) =>{
    //     return obj['month']
    // })

    // let intersection = investmentsMonths.filter(value => savingsMonths.includes(value))
    // let union = [...new Set([...investmentsMonths, savingsMonths])]
    
    // for(let i =0; i< union.length; i++){
    // }    

    return dict

}
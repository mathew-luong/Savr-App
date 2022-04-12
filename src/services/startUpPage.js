import axios from "axios";
import {dbServerUrl} from "./userContext"

function checkEmpties(object){
    let decisionBool = true;
    let objectKeys = Object.keys(object)
    objectKeys.forEach((key) =>{
        if(object[key] === "" || object[key] === "Enter a new category"){
            decisionBool = false;
        }
    })
    return decisionBool;
}

function getTodaysDate(){
    let today = new Date();
    let todayDate = (today.getMonth()+1)+ '/' + today.getDate()+ '/'+ today.getFullYear()
    return todayDate;
}

export function generalEmptyChecker(object){
    let decisionBool = true;
    decisionBool = checkEmpties(object);
    return decisionBool;
}


export function mapExpenseTargets(expenseTargetObject, userID){
    let decisionBool = true
    let mappedExpenses = expenseTargetObject.map((expenseObject) => {

        decisionBool  = checkEmpties(expenseObject);     
        return {
            userID: userID, 
            category: expenseObject["category"],
            percentageOfTotalIncome: expenseObject["target"]
        }
    })

    return decisionBool === true ? mappedExpenses : decisionBool;
}

export async function submitExpenseTargets(expensesObjArray){
    let res;
    try{
        res = await axios.post(`${dbServerUrl}/api/expensesTargets/`, expensesObjArray)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

// export async function submitSavings(savingsAmount){
//     let savingsSubmissionObject = {

//     }

//     let res;
//     try{
//         res = await axios.post(`${dbServerUrl}/api/expensesTargets/`, expensesObjArray)
//         return res
//     }
//     catch(err){
//         let errString = err.response.data.message
//         alert(errString)
//         return "error"
//     }
// }

export async function savingsGoals(goalObject, userId){

    let dateArray = goalObject["goalDate"].split("-")
    let newDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`   

    let submissionGoalObject = {
        userID: userId,
        date: newDate,  
        amount: goalObject["goal"]
    }
    let res;
    try{
        res = await axios.post(`${dbServerUrl}/api/savingsGoals/`, submissionGoalObject)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}
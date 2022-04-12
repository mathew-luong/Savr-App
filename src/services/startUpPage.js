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
        res = await axios.post(`${dbServerUrl}/api/expenseTargets/`, expensesObjArray)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function submitSavings(savingsAmount, userId){

    let savingsSubmissionObject = {
        userID: userId,
        date: getTodaysDate(),
        amount: savingsAmount
    }

    let res;
    try{
        res = await axios.post(`${dbServerUrl}/api/savings/deposit`, savingsSubmissionObject)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}


export async function submitInvestments(investmentsAmount, userId){

    let investmentsObject = {
        userID: userId,
        portfolioValueAtEndOfMonth: "0",
        amount: investmentsAmount
    }

    console.log(investmentsObject)
    let res;
    try{
        res = await axios.post(`${dbServerUrl}/api/investments/`, investmentsObject)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function savingsGoalsSubmission(goalObject, userId){

    let dateArray = goalObject["goalDate"].split("-")
    let newDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`   

    let submissionGoalObject = {
        userID: userId,
        date: newDate,  
        amount: goalObject["goal"]
    }

    console.log(submissionGoalObject)
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
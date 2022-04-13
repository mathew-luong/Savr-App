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


export function mapPrecisionExpenses(precisionExpensesObject, userID){
    let decisionBool = true
    let mappedExpenses = precisionExpensesObject.map((expenseObject) => {

        decisionBool  = checkEmpties(expenseObject);
        let dateArray = expenseObject["date"].split("-")
        let newDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`         

        return {
            userID: userID, 
            name: expenseObject["expenseName"],
            date: newDate,
            category: expenseObject["category"],
            amount: expenseObject["amount"]
        }
    })

    return decisionBool === true ? mappedExpenses : decisionBool;
}

export function mapEstimationExpenses(estimationExpensesObject, userID){
    let decisionBool = true
    let mappedExpenses = estimationExpensesObject.map((expenseObject) => {

        decisionBool  = checkEmpties(expenseObject);
        let dateArray = expenseObject["date"].split("-")
        let newDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`         

        return {
            userID: userID, 
            date: newDate,
            category: expenseObject["category"],
            percentageOfTotalIncome: expenseObject["percentExpense"]
        }
    })

    return decisionBool === true ? mappedExpenses : decisionBool;
}

export function mapIncomeEntries(incomeEntriesObject, userID){
    let decisionBool = true
    console.log(incomeEntriesObject)
    let mappedExpenses = incomeEntriesObject.map((incomeObject) => {

        decisionBool  = checkEmpties(incomeObject);
        let dateArray = incomeObject["date"].split("-")
        let newDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`         

        return {
            userID: userID, 
            date: newDate,
            amount: incomeObject["amount"],
            stream: incomeObject["streamName"]
        }
    })

    return decisionBool === true ? mappedExpenses : decisionBool;
}

export async function submitPrecisionExpenses(expensesObjArray){
    let res;
    try{
        res = await axios.post(`${dbServerUrl}/api/expenses/precision`, expensesObjArray)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function submitEstimationExpenses(expensesObjArray){
    let res;
    try{
        res = await axios.post(`${dbServerUrl}/api/expenses/estimation`, expensesObjArray)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function submitIncomeEntries(incomeEntriesObjArray){
    let res;
    try{
        res = await axios.post(`${dbServerUrl}/api/incomes/`, incomeEntriesObjArray)
        return res
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function getExpensesTimeSeries(userID, numMonths){
    let res;
    try{
        res = await axios.get(`${dbServerUrl}/api/totalExpenses/${userID}/${numMonths}`)
        return res;
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function getExpensesBreakdown(userID){
    let res;
    try{
        res = await axios.get(`${dbServerUrl}/api/expensesBreakdown/${userID}?`)
        return res;
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function getExpensesTargets(userID){
    let res;
    try{
        res = await axios.get(`${dbServerUrl}/api/expenseTargets/${userID}`)
        return res;
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}

export async function getExpensesInsightsChange(userID){
    let res;
    try{
        res = await axios.get(`${dbServerUrl}/api/expenses/${userID}/expenseInsightsChange`)
        return res;
    }
    catch(err){
        let errString = err.response.data.message
        alert(errString)
        return "error"
    }
}
import { dbServerUrl } from "./userContext";
import axios from "axios";

export async function addNewUser(userData) {
  let res;
  try{
    res =  await axios.post(`${dbServerUrl}/api/signup?`, userData);
    return res
  }
  catch(err){
    let errString = err.response.data.message
    alert(errString)
    return "error"
  }
}

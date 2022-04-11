import { useMutation } from 'react-query'
import {dbServerUrl} from "./userContext"
import axios from 'axios'

const addNewUser = (userData) => {
    return axios.post(`${dbServerUrl}/api/signup`,userData)
}

export const useSignNewUserUp = () =>{
    return useMutation(addNewUser)
}


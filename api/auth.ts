import { LoginDto, RegisterDto } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

const prodURL = 'https://nest-auth-alg9.onrender.com'
const localURL = 'http://192.168.0.211:3000'

const URL = __DEV__ ? localURL : prodURL

export const loginRequest = async (formData: LoginDto) => {
    try {
        const res = await axios.post(`${URL}/auth/login`, formData, 
            { withCredentials: true, headers: { 'Content-Type': 'application/json' }})
        
        if (res.data.user && res.data.token) {
            const token = res.data.token
            await AsyncStorage.setItem('token', token)
        }

        return res
    } catch (err: any) {
        return err.response.data
    }
} 

export const registerRequest = async (newUser: RegisterDto) => {
    try {
        const res = await axios.post(`${URL}/auth/register`, newUser, 
            { withCredentials: true, headers: { 'Content-Type': 'application/json' }})

        return res
    } catch (err: any) {
        return err.response.data
    }
} 

export const verifyAccount = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        return true
    } 
    return false
}

export const profileRequest = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        const res = await axios.get(`${URL}/auth/profile`, { headers: { Authorization: `Bearer ${token}` }})
        return res
    } catch (err: any) {
        console.log(err)
        return err.response.data.error
    }
}
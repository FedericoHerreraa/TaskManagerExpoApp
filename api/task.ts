import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { profileRequest } from './auth'
import { TaskDto, TaskUpdatedDto } from '@/types/types'

const prodURL = 'https://nest-auth-alg9.onrender.com'
const localURL = 'http://192.168.0.211:3000'

const URL = __DEV__ ? localURL : prodURL

export const getTasksRequest = async () => {
    try {
        const response = await profileRequest()
        const id = response.data._id

        const token = await AsyncStorage.getItem('token')

        if (!token) {
            return console.log('token invalido o expirado')
        }
        
        const res = await axios.get(`${URL}/tasks/allTasks?userId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createTaskRequest = async (task: TaskDto) => {
    try {
        const token = await AsyncStorage.getItem('token')

        const response = await profileRequest()
        const userId = response.data._id

        const { title, description, priority } = task

        const finalTask = {
            userId,
            title,
            description,
            priority
        }

        const res = await axios.post(`${URL}/tasks/createTask`, finalTask, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteTaskRequest = async (taskId: string) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const res = await axios.delete(`${URL}/tasks/deleteTask?taskId=${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }

}

export const updateTaskRequest = async (taskUpdated: TaskUpdatedDto) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const res = await axios.put(`${URL}/tasks/updateTask`, taskUpdated, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
    
}

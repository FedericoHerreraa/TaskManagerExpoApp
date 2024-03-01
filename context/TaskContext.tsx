import { createContext, useContext, useState } from "react";
import { TaskFunctionProps, ChildrenProps, defaultTaskValue, TaskDto, Task, TaskUpdatedDto } from "@/types/types";
import { createTaskRequest, deleteTaskRequest, getTasksRequest, updateTaskRequest } from "@/api/task";

const TaskContext = createContext<TaskFunctionProps>(defaultTaskValue);

export const TaskProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([])

    const createTask = async (task: TaskDto) => {
        const res = await createTaskRequest(task)
        console.log(res)
        return res
    }

    const getTasks = async () => {
        const res = await getTasksRequest()
        if (res) {
            setTasks(res)
            return
        }
        console.log(res)
        return res
    }

    const deleteTask = async (taskId: string) => {
        await deleteTaskRequest(taskId)

        const newTasks = tasks.filter(task => task._id !== taskId)
        setTasks(newTasks)
    }

    const updateTask = async (taskUpdated: TaskUpdatedDto) => {
        await updateTaskRequest(taskUpdated)
    }

    const taskProviderFunctions: TaskFunctionProps = {
        createTask,
        deleteTask,
        updateTask,
        getTasks,
        tasks
    }

    return (
        <TaskContext.Provider value={taskProviderFunctions}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    return useContext(TaskContext)
}
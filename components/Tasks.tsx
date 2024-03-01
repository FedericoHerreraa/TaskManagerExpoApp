import { useTask } from "@/context/TaskContext";
import { View, Text } from "./Themed";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from "react-native";

export default function Tasks({ priority } : { priority: string }) {
    const { tasks, deleteTask } = useTask()

    const handleDelete = (taskId: string) => {
        deleteTask(taskId)
    }

    return (
        <View style={styles.container}>
            {
                tasks.map((task) => (
                    priority === task.priority ? (
                        <Link href={{
                            pathname: '/updateTask',
                            params: { 
                                taskId: task._id, 
                                taskTitle: task.title,
                                taskDescription: task.description,
                                taskPriority: task.priority
                            }
                        }} key={task._id} asChild>
                            <Pressable>
                                <View style={styles.taskContainer}>
                                    <View style={styles.taskInfo}>
                                        <Text style={styles.taskTitle}>{task.title}</Text>
                                        <View style={styles.description}>
                                            <Text style={styles.taskDescription}>{task.description}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleDelete(task._id)}
                                        >
                                            <AntDesign name="delete" size={22} color='#b5574a' />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                        </Link>
                    ) : (
                        ''
                    )
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    taskContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#304361',
        marginTop: 10,
        width: 350,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,

    },
    taskInfo: {
        backgroundColor: '#304361',
        marginRight: 20
    },
    taskTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#e3e3e3',
    },
    taskDescription: {
        fontSize: 15,
        color: '#e3e3e3',
    },
    description: {
        backgroundColor: '#46618c',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 250
    }
})
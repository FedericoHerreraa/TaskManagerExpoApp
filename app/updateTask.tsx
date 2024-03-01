import { View, Text } from "@/components/Themed";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTask } from "@/context/TaskContext";
import RNPickerSelect from 'react-native-picker-select';


export default function updateTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const { updateTask } = useTask()
    
    const { taskId, taskTitle, taskDescription, taskPriority } = 
    useLocalSearchParams<{ taskId: string, taskTitle: string, taskDescription: string, taskPriority: string }>()
    
    const [priority, setPriority] = useState(taskPriority);
    
    const handleUpdate = async (taskId: string) => {
        const taskUpdated = {
            taskId,
            title: title || taskTitle,
            description: description || taskDescription,
            priority: priority 
        }
        console.log(taskUpdated)

        await updateTask(taskUpdated)
        setDescription('')
        setTitle('')
        router.navigate('/(tabs)/home')
    }
    
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Update your task</Text>
                <TextInput
                    style={styles.inputTitle}
                    placeholder='Title'
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => setTitle(text)}
                    defaultValue={taskTitle}
                    keyboardType='default'
                />
                <TextInput
                    style={styles.inputDesc}
                    placeholder='Description'
                    placeholderTextColor={'grey'}
                    multiline
                    numberOfLines={10}
                    defaultValue={taskDescription}
                    onChangeText={(text) => setDescription(text)}
                    keyboardType='default'
                />
                <View style={styles.select}>
                    <RNPickerSelect
                        onValueChange={(value) => setPriority(value)}
                        items={[
                            { label: 'High Priority', value: 'high' },
                            { label: 'Medium Priority', value: 'medium' },
                            { label: 'Low Priority', value: 'low' },
                        ]}
                        value={priority}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleUpdate(taskId)}
                >
                    <Text style={styles.buttonUpdate}>Update Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: 40,
        marginLeft: 20
    },
    inputTitle: {
        color: 'black',
        backgroundColor: 'white',
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        width: 350
    },
    inputDesc: {
        color: 'black',
        backgroundColor: 'white',
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        width: 350,
        height: 150,
        textAlignVertical: 'top'
    },
    button: {
        marginTop: 40,
        backgroundColor: '#212a5c',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        width: 150,
        borderRadius: 5,
    },
    buttonUpdate: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    select: {
        marginTop: 20,
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 5,
      }
})
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity,  } from 'react-native';
import { Text, View } from './Themed';
import { createTaskRequest } from '@/api/task';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import RNPickerSelect from 'react-native-picker-select';

export default function CreateTaskScreen() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Select Priority');

  const { isSignedIn } = useAuth()

  const validateFields = () => {
    if (!isSignedIn) {
      return
    }
    if (title.length === 0) {
      alert('Title is required')
      return false
    }
    if (description.length === 0) {
      alert('Description is required')
      return false
    }
    if (priority !== 'high' && priority !== 'medium' && priority !== 'low') {
      alert('Priority is required')
      return false
    }
    return true
  }

  const handleTask = async () => {
    const taskCreated = {
      title,
      description,
      priority
    }

    await createTaskRequest(taskCreated)
    setTitle('')
    setDescription('')
    setPriority('')
    router.replace('/(tabs)/home')
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Create your new task</Text>
        <TextInput
          style={styles.inputTitle}
          placeholder='Title'
          placeholderTextColor={'grey'}
          onChangeText={(text) => setTitle(text)}
          value={title}
          keyboardType='default'
        />
        <TextInput
          style={styles.inputDesc}
          placeholder='Description'
          placeholderTextColor={'grey'}
          multiline
          numberOfLines={10}
          onChangeText={(text) => setDescription(text)}
          value={description}
          keyboardType='default'
        />
        <Text style={styles.titlePriority}>Priority</Text>
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
          onPress={() => {
            if (!isSignedIn) {
              Alert.alert('You have to login first')
              setTitle('')
              setDescription('')
            }
            if (validateFields()) {
              handleTask()
            }
          }}
          >
            <Text style={styles.buttonLogin}>Submit task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginTop: 20,
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
  buttonLogin: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  select: {
    marginTop: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 5,
  },
  titlePriority: {
    fontSize: 20,
    marginTop: 20
  }
});

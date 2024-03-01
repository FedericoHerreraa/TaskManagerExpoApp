import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from './Themed';
import { useTask } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import Tasks from './Tasks';


export default function HomeScreenPage() {
  const { tasks, getTasks } = useTask()
  const { isSignedIn, user } = useAuth()

  if (isSignedIn) getTasks()

  const verifyPriority = (priority: string): boolean => {
    let exists = false
    tasks.forEach(task => {
      if (task.priority === priority) {
        exists = true
        return exists
      }
    })
    return exists
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
          <Text style={styles.titlePage}>Welcome {user?.username}</Text>
          {
            isSignedIn ? (
              tasks.length === 0 ? (
                  <View>
                    <Text style={styles.noTasks}>No tasks yet</Text>
                  </View>
                ) : (  
                  <>
                    <View>
                      {verifyPriority('high') ? (
                        <Text style={styles.titlePriority}>High priority:</Text>
                      ) : ('')}
                      <Tasks priority='high'/>
                    </View>
                    <View>
                      {verifyPriority('medium') ? (
                        <Text style={styles.titlePriority}>Medium priority:</Text>
                      ) : ('')}
                      <Tasks priority='medium'/>
                    </View>
                    <View>
                      {verifyPriority('low') ? (
                        <Text style={styles.titlePriority}>Low priority:</Text>
                      ) : ('')}
                      <Tasks priority='low'/>
                    </View>
                  </>
                )
            ) : (
              <View>
                <Text style={{ marginTop: 20 }}>You have to login first</Text>
              </View>
            )
          }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  titlePage: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noTasks: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey'
  },
  titlePriority: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  }
});

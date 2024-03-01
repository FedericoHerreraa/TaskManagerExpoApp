import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useAuth } from '@/context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';



export default function ProfileScreenPage() {
  const { user, signOut, isSignedIn } = useAuth()

  const colorScheme = useColorScheme()

  return (
    <View>
      <View style={styles.container}>
        {
          isSignedIn ? (
            <>
              <FontAwesome style={styles.img} name="user-circle-o" size={80} color={Colors[colorScheme ?? 'light'].tabIconDefault} />
              <Text style={styles.greeting}>Hi {user?.username}</Text>
              <Text>{user?.email}</Text>
              <TouchableOpacity
                style={styles.logout}
                onPress={signOut}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View>
              <Text>You are not Loged in yet</Text>
            </View>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 20,
  },
  logout: {
    marginTop: 40,
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  greeting: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 30,
  },
  img: {
    marginBottom: 20
  }
});

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from 'expo-router';

export default function LoginScreenPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(true)
  const [error, setError] = useState<string[]>([])

  const navigation = useNavigation()

  const validateFields = () => {
    setError([])
    if (username.length === 0 && showLogin === false) {
      setError(prevErrors => [...prevErrors, 'Username is required'])
      return false
    }
    if (email.length === 0) {
      setError(prevErrors => [...prevErrors, 'Email is required'])
      return false
    }
    if (password.length === 0) {
      setError(prevErrors => [...prevErrors, 'Password is required'])
      return false
    }
    return true
  }

  const changeForm = () => setShowLogin(!showLogin)

  const { signIn, signUp, isSignedIn, errors } = useAuth()

  const handleLogin = async () => {
    const user = {
      email,
      password
    }

    await signIn(user)
    if (error.length === 0 && errors.length === 0) {
      navigation.goBack()
    }
  }

  const handleRegister = async () => {
    const newUser = {
      username,
      email,
      password
    }

    await signUp(newUser)
    if (isSignedIn) {
      await handleLogin()
    }
  }

  if (error.length > 0) {
    setTimeout(() => {
      setError([])
    }, 7000)
  }

  return (
    <View>
      {
        showLogin ? (
          <>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  placeholder='Email'
                  autoCapitalize="none"
                  placeholderTextColor={'grey'}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  keyboardType='email-address'
                />
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  placeholderTextColor={'grey'}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  keyboardType='default'
                  secureTextEntry={true}
                />
                {error ? (
                  error.map((error, index) => (
                    <Text key={index} style={styles.error}>{error}</Text>
                  ))
                  ) : (
                    ''
                  )
                }
                {errors ? (
                    errors.map((error, index) => (
                      <Text key={index} style={styles.error}>{error}</Text>
                    ))
                    ) : (
                      ''
                  )
                }
                <TouchableOpacity onPress={changeForm}>
                  <Text style={styles.text}>Don't you have an account yet?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    if (validateFields()) {
                      handleLogin()
                    }
                  }}
                  >
                    <Text style={styles.buttonLogin}>Login</Text>
                </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder='Username'
                placeholderTextColor={'grey'}
                onChangeText={(text) => setUsername(text)}
                value={username}
                keyboardType='default'
              />
              <TextInput
                style={styles.input}
                placeholder='Email'
                autoCapitalize="none"
                placeholderTextColor={'grey'}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType='email-address'
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor={'grey'}
                onChangeText={(text) => setPassword(text)}
                value={password}
                keyboardType='default'
                secureTextEntry={true}
              />
              {error ? (
                error.map((error, index) => (
                  <Text key={index} style={styles.error}>{error}</Text>
                ))
                ) : (
                  ''
                )
              }
              {errors ? (
                  errors.map((error, index) => (
                    <Text key={index} style={styles.error}>{error}</Text>
                  ))
                  ) : (
                    ''
                )
              }
              <TouchableOpacity onPress={changeForm}>
                <Text style={styles.text}>Do you have an account?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (validateFields()) {
                    handleRegister()
                  }
                }}
              >
                <Text style={styles.buttonLogin}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 40
  },
  error: {
    color: 'red',
    marginTop: 20
  },
  input: {
    color: 'black',
    backgroundColor: 'white',
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    width: 250
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
  text: {
    marginTop: 40,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
  },
  buttonLogin: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

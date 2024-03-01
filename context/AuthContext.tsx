import { createContext, useContext, useState } from "react";
import { AuthContextProps, ChildrenProps, LoginDto, RegisterDto, User, defaultValue } from "@/types/types";
import { loginRequest, registerRequest } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


const AuthContext = createContext<AuthContextProps>(defaultValue);

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<string[]>([])

  const signIn = async (formUser: LoginDto) => {
    const res = await loginRequest(formUser);
    if (res.data) {
      setUser(res.data.user);
      setIsSignedIn(true);
      return 
    }
    setErrors(res.message)
    setTimeout(() => {
      setErrors([])
    }, 7000)  
  };

  const signOut = async () => {
    setIsSignedIn(false);
    setUser(null);
    await AsyncStorage.removeItem('token');
    Alert.alert('Session Closed')
  };

  const signUp = async (newUser: RegisterDto) => {
    const res = await registerRequest(newUser)
    if (res.data) {
      setIsSignedIn(true);
      return res
    }
    setErrors(res.message)
    setTimeout(() => {
      setErrors([])
    }, 7000)  
  };

  const authProviderFunction: AuthContextProps = {
    user,
    isSignedIn,
    signIn,
    signOut,
    signUp,
    errors
  };

  return (
    <AuthContext.Provider value={authProviderFunction}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};
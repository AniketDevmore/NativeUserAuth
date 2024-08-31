import { createContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext: any = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token: any) => { },
    logout: () => { }
})

const AuthContextProvider = ({ children }: any) => {
    const [authToken, setAuthToken] = useState<any>();

    const authenticate = (token: any) => {
        setAuthToken(token)
        AsyncStorage.setItem('token', token)
    }

    const logout = () => {
        setAuthToken(null)
        AsyncStorage.removeItem('token')
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;
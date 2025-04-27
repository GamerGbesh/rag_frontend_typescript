import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User{
    token: string
}

interface AuthTokens {
    access: string
    refresh: string
}

interface AuthContextType {
    user: User | null
    login: (data: AuthTokens) => void
    logout: () => void
    status: boolean
    setStatus: Dispatch<SetStateAction<boolean>>
    addLibrary: boolean
    setAddLibrary: Dispatch<SetStateAction<boolean>>
    content: boolean
    setContent: Dispatch<SetStateAction<boolean>>
    sidebarOpen: boolean
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
    personal: number
    setPersonal: Dispatch<SetStateAction<number>>
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within useAuthContext")
    }
    return context
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()
    const [status, setStatus] = useState<boolean>(true)
    const [addLibrary, setAddLibrary] = useState<boolean>(false)
    const [content, setContent] = useState<boolean>(true)
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
    const [personal, setPersonal] = useState<number>(0)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) {
            setUser({token})
        }
    }, [])

    const login = (data: AuthTokens) => {
        localStorage.setItem("access_token", data.access)
        localStorage.setItem("refresh_token", data.refresh)
        setUser({token: data.access})
        navigate("/")
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            status,
            setStatus,
            addLibrary,
            setAddLibrary,
            content,
            setContent,
            sidebarOpen,
            setSidebarOpen,
            personal,
            setPersonal }}>
            {children}
        </AuthContext.Provider>
    )
}
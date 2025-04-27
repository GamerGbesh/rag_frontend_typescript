import axios, {AxiosError, InternalAxiosRequestConfig} from "axios";

const API_URL = "http://localhost:8000"

const getAccessToken = (): string | null => localStorage.getItem("access_token")
const getRefreshToken = (): string | null => localStorage.getItem("refresh_token")

const api = axios.create({
    baseURL: API_URL,
    headers: {"Content-Type": "application/json"},
})

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig{
    _retry?: boolean
}

api.interceptors.request.use(
    (config:CustomAxiosRequestConfig) => {
        const token = getAccessToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)



api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token")
                if (!refreshToken){
                    throw new Error("Refresh token is missing")
                }
                const {data} = await axios.post(`${API_URL}/auth/api/token/refresh/`, {
                    refresh: getRefreshToken(),
                })
                localStorage.setItem("access_token", data.access)
                api.defaults.headers.Authorrization = `Bearer ${data.access}`
                return api(originalRequest)
            }
            catch (error) {
                console.error("Token refresh failed", error)
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default api
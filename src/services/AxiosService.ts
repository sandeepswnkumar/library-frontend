import axios from 'axios'
import { toast } from 'sonner'

const AxiosService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
    timeout: 10000,
    headers: { 'X-Custom-Header': 'foobar' },
})

// Add a request interceptor
AxiosService.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('_token')
        const language = localStorage.getItem('language') || 'en'
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        config.headers['Accept-Language'] = language
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
AxiosService.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log('success', response)
        toast.success(response.data.message)
        return response
    },
    async function (error) {
        const originalRequest = error.config
        // console.log("location.pathname", location.pathname)
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !['admin/login','/admin/login', '/login', 'login'].includes(location.pathname)
        ) {
            originalRequest._retry = true
            try {
                const { data } = await AxiosService.post('/auth/refresh-token')
                localStorage.setItem('_token', data.data.token)
                AxiosService.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${data.accessToken}`
                return AxiosService(originalRequest)
            } catch (refreshError) {
                originalRequest._retry = false
                const loginRoute =
                    localStorage.getItem('login-route') || '/login'
                window.location.replace(loginRoute)
            }
        } else {
            if (Array.isArray(error.response.data.message)) {
                error.response.data.message.map(
                    (message: { location: string; msg: string }) =>
                        toast.error(message.msg)
                )
            } else {
                toast.error(error.response.data.message)
            }
            console.log('error', error)
        }
        return error
    }
)

export default AxiosService

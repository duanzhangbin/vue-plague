import axios from 'axios'

const http = axios.create({
    //baseURL: 'http://localhost:8086/',
    //baseURL: 'http://192.168.101.69:93/dfapi/',
    baseURL: 'https://tools.chinadafeng.com:98/dfapi/',
    timeout: 1000 * 30,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

http.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

export default http

import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  // baseURL: 'http://192.168.1.8:8000/',
  // baseURL: 'https://apipabrik.bbmakmur.com/api/',
})

axiosIns.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    config.headers.Authorization = `${token.token_type} ${token.access_token}`
  }
  return config
})

export default axiosIns

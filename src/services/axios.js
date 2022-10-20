import axios from 'axios'

// export const axiosIns = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/',
// })
const axiosIns = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})

axiosIns.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    config.headers.Authorization = `${token.token_type} ${token.access_token}`
    config.headers['Content-Type'] = 'application/json'
  } else {
  }
  return config
})

export default axiosIns

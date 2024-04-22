import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:7000/api',
  withCredentials:true
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  let data = localStorage.getItem('persist:root')
  if (data && typeof data === 'string') {
    data = JSON.parse(data)
    let auth = JSON.parse(data.auth)
    const accessToken = auth.login?.accessToken
    config.headers = { authorization: `Bearer ${accessToken}` }
    return config;
  }
  return config;
}, function (error) {   
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return response.data;
}, async (error) => {
  const originalConfig = error.config;
  if (error.response && error.response.status === 403) {
    try {
      let data = localStorage.getItem('persist:root')
      if (data && typeof data === 'string') {
        data = JSON.parse(data)
        let auth = JSON.parse(data.auth)
        let login = auth.login
        let register = auth.register
        const response = await instance.post('/auth/refresh')
        const { accessToken } = response
        let updatedData = {
          login:{
            ...login,accessToken:accessToken
          },
          register
        }
        localStorage.setItem('persist:root', JSON.stringify({ auth: JSON.stringify(updatedData) }))
        originalConfig.headers['authorization'] = `Bearer ${accessToken}`;
        return instance(originalConfig);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        localStorage.removeItem('persist:root')
        window.location.href = '/login'
      }
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});

export default instance
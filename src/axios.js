import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:7000/api',
  });
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    let data = localStorage.getItem('persist:root') 
    if(data && typeof data === 'string') {
      data = JSON.parse(data)
      let auth = JSON.parse(data.auth)
      const accessToken = auth.login?.currentUser?.accessToken 
      config.headers = {authorization: `Bearer ${accessToken}`} 
      return config;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  })

  export default instance
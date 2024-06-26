import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:7000/api',
  withCredentials: true,
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  let data = localStorage.getItem('persist:root')
  if (data && typeof data === 'string') {
    data = JSON.parse(data)
    let auth = JSON.parse(data.auth)
    const accessToken = auth.login?.accessToken
    config.headers = { authorization: `Bearer ${accessToken}` }
    config.headers['Content-Type'] = 'application/json';
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
        let user = JSON.parse(data.user)
        let auth = JSON.parse(data.auth)
        let _persist = JSON.parse(data._persist)
        let login = auth.login
        let register = auth.register
        let isShowModal = auth.isShowModal
        let modalChildren = auth.modalChildren
        let userData = login.userData
        let isFetching = login.isFetching
        let isError = login.isError
        let isSuccess = login.isSuccess
        const response = await instance.post('/auth/refresh')
        const { accessToken } = response
        if (accessToken) {
          let updatedData = {
            login: {
              userData,
              accessToken: accessToken,
              isFetching,
              isSuccess,
              isError
            },
            register,
            isShowModal,
            modalChildren
          }
          let newData = {
            auth: JSON.stringify(updatedData),
            user: JSON.stringify(user),
            _persist: JSON.stringify(_persist)
          }
          localStorage.setItem('persist:root', JSON.stringify(newData))
          await new Promise(resolve => setTimeout(resolve, 500));
          originalConfig.headers['authorization'] = `Bearer ${accessToken}`;
          originalConfig.headers['Content-Type'] = 'application/json';
          const retryResponse = await instance(originalConfig);
          return retryResponse;
        }
        else {
          localStorage.removeItem('persist:root')
          window.location.href = '/login'
        }
      }
    } catch (err) {
      if (err.response && (err.response.status === 400 || err.response.status === 500)) {
        localStorage.removeItem('persist:root')
        window.location.href = '/login'
      }
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});

export default instance
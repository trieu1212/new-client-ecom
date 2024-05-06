// import axios from "axios";

// const instance = axios.create({
//   baseURL: 'http://localhost:7000/api',
//   withCredentials: true,
// });

// // Add a request interceptor
// instance.interceptors.request.use(function (config) {
//   let data = localStorage.getItem('persist:root')
//   if (data && typeof data === 'string') {
//     data = JSON.parse(data)
//     let auth = JSON.parse(data.auth)
//     const accessToken = auth.login?.accessToken
//     config.headers = { authorization: `Bearer ${accessToken}` }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   }
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//   return response.data;
// }, async (error) => {
//   const originalConfig = error.config;
//   if (error.response && error.response.status === 403) {
//     try {
//       let data = localStorage.getItem('persist:root')
//       if (data && typeof data === 'string') {
//         data = JSON.parse(data)
//         let user = JSON.parse(data.user)
//         let auth = JSON.parse(data.auth)
//         let _persist = JSON.parse(data._persist)
//         let login = auth.login
//         let register = auth.register
//         let isShowModal = auth.isShowModal
//         let modalChildren = auth.modalChildren
//         let userData = login.userData
//         let isFetching = login.isFetching
//         let isError = login.isError
//         let isSuccess = login.isSuccess
//         const response = await instance.post('/auth/refresh')
//         if (response.message === "Refresh token đã hết hạn") {
//           localStorage.removeItem('persist:root')
//           window.location.href = '/login'
//           return 
//         } else {
//           const { accessToken } = response
//             let updatedData = {
//               login: {
//                 userData,
//                 accessToken: accessToken,
//                 isFetching,
//                 isSuccess,
//                 isError
//               },
//               register,
//               isShowModal,
//               modalChildren
//             }
//             let newData = {
//               auth: JSON.stringify(updatedData),
//               user: JSON.stringify(user),
//               _persist: JSON.stringify(_persist)
//             }
//             localStorage.setItem('persist:root', JSON.stringify(newData))
//             originalConfig.headers['authorization'] = `Bearer ${accessToken}`;
//             originalConfig.headers['Content-Type'] = 'application/json';
//             const retryResponse = await instance(originalConfig);
//             return retryResponse;
//         }
//       }
//     } catch (err) {
//       if (err.response && (err.response.status === 400 || err.response.status === 500 || err.response.status === 401 || err.response.status === 403)) {
//         localStorage.removeItem('persist:root')
//         window.location.href = '/login'
//       }
//       return Promise.reject(err);
//     }
//   }
//   return Promise.reject(error);
// });

// export default instance





import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:7000/api',
  withCredentials: true,
});

let isRefreshing = false;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  let data = localStorage.getItem('persist:root');
  if (data && typeof data === 'string') {
    data = JSON.parse(data);
    let auth = JSON.parse(data.auth);
    const accessToken = auth.login?.accessToken;
    config.headers = { authorization: `Bearer ${accessToken}` };
    config.headers['Content-Type'] = 'application/json';
    // console.log('abc: ',localStorage.getItem('persist:root'))
    return config;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return response.data;
}, async (error) => {
  const originalConfig = error.config;
  if (error.response && error.response.status === 403) {
    
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const response = await instance.post('/auth/refresh');
          console.log(response)
          let localStorageData = JSON.parse(localStorage.getItem('persist:root'));
          localStorageData.auth = JSON.stringify({
            ...JSON.parse(localStorageData.auth),
            login: {
              ...JSON.parse(localStorageData.auth).login,
              accessToken: response.accessToken
            }
          });
          localStorage.setItem('persist:root', JSON.stringify(localStorageData));
          originalConfig.headers['authorization'] = `Bearer ${response.accessToken}`;
          originalConfig.headers['Content-Type'] = 'application/json';
          const retryResponse = await instance(originalConfig);
          isRefreshing = false;
          return retryResponse;
        } catch (refreshError) {
          localStorage.removeItem('persist:root');
          console.log('refreshError: ',refreshError)
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        return Promise.reject(error);
      }
  }
  return Promise.reject(error);
});

export default instance;

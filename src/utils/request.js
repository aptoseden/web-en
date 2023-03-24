import axios from 'axios'
import router from '@/router/index'
import store from "@/store";
import {getCookie} from "@/utils/cookieUtils";
import { MessageBox, Message } from "element-ui";
// 创建axios实例
const service = axios.create({
  baseURL: process.env.WEB_API, // api 的 base_url
  timeout: 10000 // 请求超时时间 10秒
})

// service.defaults.headers.common['Authorization'] = getCookie("token")

// request拦截器
service.interceptors.request.use(
  config => {
    // if (getCookie("token") != undefined) {
      //config.headers.Authorization = getCookie("token") // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers["token"] = getCookie("yueToken");
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)


// response 拦截器
service.interceptors.response.use(
  response => {
    // return response.data
    // const res = response.data
    // if (res.code === 'success' || res.code === 'error') {
    //   return res
    // } else if (res.code === 404 || res.code === 400) {
    //   console.log('返回错误内容', res)
    //   router.push('404')
    //   return res
    // } else if (res.code === 500) {
    //   router.push('500')
    //   return Promise.reject('error')
    // } else if (res.code === 502) {
    //   router.push('502')
    //   return Promise.reject('error')
    // } else {
    //   return Promise.reject('error')
    // }
    // console.log(response)
    if (response.data.errorCode == 20003){
      Message({
          message: 'Login failed, please login',
          type: "error",
          duration: 3 * 1000
      });
      store.commit('setLoginMessage',Math.random())
      return Promise.reject(new Error(errMessage));
    }
    if (response.data.errorCode){
      Message({
          message: response.data.msg,
          type: "error",
          duration: 3 * 1000
      });
    }
    if (response.status >= 400) {
        const errMessage = response.statusText || response.error || response.message || "Error";
        Message({
            message: errMessage,
            type: "error",
            duration: 3 * 1000
        });

        // to re-login
        
        if (response.status === 401) {
            MessageBox.confirm(
                "认证信息失效，抱歉，您需要登录",
                {
                    confirmButtonText: "登录",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            ).then(() => {
                // store.dispatch("user/resetToken").then(() => {
                //     location.reload();
                // });
                // console.log(this.$store)
                store.commit('setLoginMessage',Math.random())
            });
        }
        return Promise.reject(new Error(errMessage));
    } else {
        return response.data;
    }
  },
  error => {
    if (error.response.status === 401) {
      return MessageBox.confirm(
          "Login expired, please re-login",
          {
              confirmButtonText: "Submit",
              cancelButtonText: "Cancel",
              type: "warning"
          }
      ).then(() => {
          // store.dispatch("user/resetToken").then(() => {
          //     location.reload();
          // });
          store.commit('setLoginMessage',Math.random())
        });
    }
    // console.log(error.response) 
    // console.log("err" + error.response + process.env.VUE_APP_BASE_API); // for debug
    Message({
        message: error.response.data.msg,
        type: "error",
        duration: 3 * 1000
    });
    // 出现网络超时
    // router.push('500')
    return Promise.reject(error)
  }
)

export default service

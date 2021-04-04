/**
 * ajax请求配置
 */
import axios from 'axios'
import apiURL from './api.js'
import router from '@/router'
import Router from "vue-router";
import { Loading, Message, MessageBox } from 'element-ui'
// axios默认配置
axios.defaults.timeout = 60000; // 超时时间
axios.defaults.baseURL = apiURL; // 默认地址
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

//axios.defaults.withCredentials = true; //让ajax携带cookie
// 路由请求拦截
axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // config.headers['Content-Type'] = 'multipart/form-data';
        let token = localStorage.Authorization;
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['Authorization'] = `${token}`;
        }
        return config
    },
    error => {
        return Promise.reject(error.response);
    });

//http响应拦截
axios.interceptors.response.use(response => {
    switch (response.data.status) {
        case -99:
            window.localStorage.removeItem('Authorization')
            router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            })
    }
    return response;

});


// 路由守卫核心代码
// Router.beforeEach((to, from, next) => {

//     // 先判断浏览器中是否已经有token了，有则true，否则false
//     const isLogin = localStorage.token ? true : false
//     console.log(isLogin)
//         //然后判断要去往的页面，如果是去往login和register页面的，就直接放行
//         //如果不是去往login和register页面，则判断有没有token，如果有token就放行，否则就跳转login页面
//     if (to.path == '/login' || to.path == '/mobileView') {
//         next
//     } else {
//         isLogin ? next() : next('/login')
//     }
// })
export default axios;
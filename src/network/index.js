//封装 axios 请求
import axios from 'axios'

export default function request(config) {
    const instance1 = axios.create({
        timeout: 5000,
        "Content-Type": "application/json",
        transformRequest: [function (data) {
            // 对发送的 data 进行任意转换处理
            //待处理
            return data;
        }],
    });
    return instance1(config) // create 返回的是一个 Promise  于是，直接可以再调用后 用 .then 和 .catch
}
//请求拦截器
axios.interceptors.request.use((config) => {
    // console.log('这是拦截的数据！',config);
    // let userinfo = window.localStorage.getItem('userinfo') || '';
    // // 判断token存在再做配置
    // if (userinfo) {
        // config.headers.Authorization = JSON.parse(userinfo).token.toString();
    // }
    return config;
}, (error) => {
    console.log('请求拦截器发现错误！', error);
})
//封装 axios 请求
import axios from 'axios'

export default function request(config) {
    const instance1 = axios.create({
        timeout: 5000,
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
    console.log('这是拦截的数据！',config);
    let token = window.localStorage.getItem('token') || '';
    // 判断token存在再做配置
    if (token) {
        config.headers["token"] = JSON.parse(token);
    }
    console.log(config);
    return config;
}, (error) => {
    console.log('请求拦截器发现错误！', error);
})
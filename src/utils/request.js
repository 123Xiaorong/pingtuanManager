import axios from 'axios'


const request = axios.create({
    // 请求配置参考: https://github.com/axios/axios#request-config 
    // 根据不同环境设置 baseURL, 最终发送请求时的URL为: baseURL + 发送请求时写URL , 
    // 比如 get('/test'), 最终发送请求是: /dev-api/test 
    // baseURL: '/dev-api',
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 //请求超时,5000毫秒
})

//请求拦截器
request.interceptors.request.use(config => {
    //请求拦截
    return config
},error=>{
    //出现异常的时候
    return Promise.reject(error)
})


//响应拦截器
request.interceptors.response.use(response=>{
    //response.data
    return response
},error=>{
    return Promise.reject(error)
})
//传统方式
// request.get('/db.json').then(response=>{
//     const data = response.data
//     console.log(data)
// })

export default request //导出axios对象
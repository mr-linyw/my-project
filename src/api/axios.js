import axios from 'axios';
import { Message } from 'element-ui';


axios.defaults.withCredentials = true;// 跨域携带cookie
//创建axios实例
var service = axios.create({
    baseURL: '/index', //请求的后台域名
    timeout: 5000,
        headers: {
        'content-type': 'application/json',
        "token":'14a1347f412b319b0fef270489f'
    }
});


service.interceptors.request.use(config => {//请求之前(可以设置token)
  if (config.method === 'post' || config.method === 'put') {
    // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    config.data = JSON.stringify(config.data)
  }
    return config
},error =>{
    Message.error(error)
    return Promise.reject(error);
});


service.interceptors.response.use(response => {//数据拿到之后
    return response.data
},error => {
    Message.error('Http请求失败，请联系管理员');
    return Promise.reject(error.response);;
});


function successfun(res){//处理后台返回的非200错误
    if(res.code === 200){
        return res
    }else{
         Message.warning(res.message);
         return res;
    }
};


function errorfun(res){
    if(res.code != 200){
        Message.error(res.message);
        return res;
    }
}


export default{
    post(url,data){//post请求
      return new Promise((cback, reject) => {
        return service({
            method:'post',
            url,
            data: data,
            withCredentials: true,
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err);
        })

      })

    },
    get(url,data){//get请求
      return new Promise((cback, reject) => {
        return service({
            method:'get',
            url,
            data: data,
            withCredentials: true,

        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err);
        })

      })

    },

}

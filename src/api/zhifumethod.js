import request from '@/utils/request'

export default{
    //获取支付方式
    getList(){
        return request({
            url: '/groupmall/setting/paySet',
            method: 'get'
        })
    },
    //修改支付方式
    update(content){
        return request({
            url: '/groupmall/setting/paySet',
            method: 'post',
            data: content
        })
    }
}
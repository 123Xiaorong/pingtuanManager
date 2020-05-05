import request from '@/utils/request'

export default{
    add(pojo){
        return request({
            url: '/groupmall/setting/storeSet',
            method: 'post',
            data: pojo
        })
    }
}
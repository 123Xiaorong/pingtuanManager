import request from '@/utils/request'

export default{

    add(addshangdianForm){
        return request({
            url: '/groupmall/setting/physicalStoreSet',
            method: 'post',
            data: addshangdianForm
        })
    },
    updateById(pojo){
        return request({
            url: '/groupmall/setting/physicalStoreSet',
            method: 'get',
            data: pojo
        })
    }
}
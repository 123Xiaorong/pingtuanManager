import request from '@/utils/request'

export default{
    //获取列表
    getList(){
        return request({
            url: '/groupmall/setting/AreaOfDistributionSet?page=1&limit=10',
            method: 'get'

        })
    },
    //新增配送区域
    add(local){
        return request({
            url: '/groupmall/setting/AreaOfDistributionSet',
            method: "post",
            data: local
        })
    },
    //删除配送区域
    deleteById(id){
        return request({
            url: `/groupmall/setting/AreaOfDistributionSet?id=${id}`,
            method: "delete"
        })
    }
}
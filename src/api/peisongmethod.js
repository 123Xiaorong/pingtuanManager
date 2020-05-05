import request from '@/utils/request'

export default{
    //获取列表
    // getList(){
    //     return request({
    //         url: '/setting/modeOfDistributionse',
    //         method: 'post'
    //     })
    // },
    //新增配送区域
    add(peisong){
        return request({
            url: '/groupmall/setting/modeOfDistributionSet',
            method: 'post',
            data: peisong
        })
    }
}
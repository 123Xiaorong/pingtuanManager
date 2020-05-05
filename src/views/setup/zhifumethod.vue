<template>
   <el-form ref="zhifuForm" :rules="rules" :model="zhifuForm" label-width="120px" style="margin-top:25px;width:50%">
   <el-form-item label="支付方式名称" prop="main" >
      <el-input :disabled="true" v-model="zhifuForm.main" placeholder="支付宝支付" size="small"></el-input>
    </el-form-item>
    <el-form-item label="AppID" prop="payAppid" >
      <el-input v-model="zhifuForm.payAppid" placeholder="请输入AppID" size="small"></el-input>
    </el-form-item>
    <el-form-item label="appSecret" prop="payAppsecret" >
      <el-input v-model="zhifuForm.payAppsecret" placeholder="请输入appSecret" size="small"></el-input>
    </el-form-item>
    <el-form-item label="商户号" prop="payStoreid" >
      <el-input v-model="zhifuForm.payStoreid" placeholder="请输入商户号" size="small"></el-input>
    </el-form-item>
    <el-form-item label="初始密钥" prop="payInitsecret" >
      <el-input v-model="zhifuForm.payInitsecret" placeholder="请输入初始密钥" size="small"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('zhifuForm')">确定</el-button>
      <el-button @click="resetForm('zhifuForm')">重置</el-button>
    </el-form-item>
   </el-form>
</template>

<script>
import payMethod from '../../api/zhifumethod'
export default {
  data () {
    return {
      zhifuForm: {},
      rules: {
        payAppsecret: [
           {required: true, message: "appSecret不能为空", trigger: "blur" }
        ],
        payStoreid: [
          {required: true, message: "商户号不能为空", trigger: "blur" }
        ],
        payInitsecret: [
          {required: true, message: "初始密钥不能为空", trigger: "blur" }
        ]
        
      }
      
    }
  },

  components: {},

  created(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      payMethod.getList().then(response=>{
        console.log(response)
        this.zhifuForm = response.data
      })
    },
    onSubmit(formName) {
      
      this.$refs[formName].validate(valid=>{
        if(valid){
          //提交更新
          payMethod.update(this.zhifuForm).then(response=>{
            const resp = response.data
            console.log(resp)
            if(status){
              console.log("submit!");
              this.fetchData()
              this.$alert('更新提示信息','更新成功', {
                confirmButtonText:'确定'
                }
              )
            }
          })
        }else {
          return false
        }
      })

    },
    resetForm(formName){
        this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
</style>
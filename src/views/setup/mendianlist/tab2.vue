<template>
  <div style="margin-top: 10px">
    <el-form
      ref="addshangdianForm"
      :rules="rules"
      :model="addshangdianForm"
      label-width="120px"
      style="width:50%"
    >
      <el-form-item label="门店名称" prop="physicalstoreName">
        <el-input v-model="addshangdianForm.physicalstoreName" placeholder="请输入门店名称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="physicalstoreTel">
        <el-input v-model="addshangdianForm.physicalstoreTel" placeholder="请输入手机号码" size="small"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="physicalstoreAddress">
        <el-input v-model="addshangdianForm.physicalstoreAddress" placeholder="请输入详细地址" size="small"></el-input>
      </el-form-item>
      <el-form-item label="门店描述" prop="physicalstoreDescribe">
        <el-input type="textarea" v-model="addshangdianForm.physicalstoreDescribe" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('addshangdianForm')">确定</el-button>
        <el-button @click="resetForm('addshangdianForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mendianApi from '../../../api/mendianlist'
export default {
  data() {
    return {
        addshangdianForm: {
            physicalstoreName:'',
            physicalstoreTel:'',
            physicalstoreAddress:'',
            physicalstoreDescribe:''
        },
        rules: {
            physicalstoreName:[{required: true, message: "门店名称不能为空", trigger: "blur"}],
            physicalstoreTel:[{required: true, message: "手机号码不能为空", trigger: "blur"}],
            physicalstoreAddress:[{required: true, message: "详细地址不能为空", trigger: "blur"}]
        }
    };
  },

  components: {},

  methods: {
    onSubmit(formName) {
      // console.log("submit!");
      this.$refs[formName].validate(valid => { 
        if(valid){
          mendianApi.add(this.addshangdianForm).then(response=>{
            const resp = response.data
            if(resp){
              this.$alert('新增成功','新增提示信息', {
                confirmButtonText:'确定'
              })
              console.log('新增成功')
              this.$router.push({path:'/shezhi/peisonglocal'})
              // this.resetForm()
            }
          })
        }else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>
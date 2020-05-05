<template>
  <el-form
    :model="local"
    :rules="rules"
    ref="localForm"
    label-width="120px"
    style="width:50%;margin-top: 10px"
  >
    <el-form-item label="配送区域名称" prop="areaofdistributionsetAddress">
      <el-input v-model="local.areaofdistributionsetAddress" size="small"></el-input>
    </el-form-item>
    <el-form-item label="首重费用" prop="areaofdistributionsetFirstweicost">
      <el-input v-model="local.areaofdistributionsetFirstweicost" size="small"></el-input>
    </el-form-item>
    <el-form-item label="续重费用" prop="areaofdistributionsetLastweicost">
      <el-input v-model="local.areaofdistributionsetLastweicost" size="small"></el-input>
    </el-form-item>
    <el-form-item label="免费额度" prop="areaofdistributionsetFreecount">
      <el-input v-model="local.areaofdistributionsetFreecount" size="small"></el-input>
    </el-form-item>
    <el-form-item label="所辖地区" prop="areaofdistributionsetBelongarea">
      <el-input v-model="local.areaofdistributionsetBelongarea" size="small"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('localForm')">确定</el-button>
      <el-button @click="resetForm('localForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import localApi from '../../../api/local'
export default {
  data() {
    return {
      local: {
        areaofdistributionsetAddress: "",
        areaofdistributionsetFirstweicost: "",
        areaofdistributionsetLastweicost: "",
        areaofdistributionsetFreecount: "",
        areaofdistributionsetBelongarea: ""
      },
      rules: {
        areaofdistributionsetAddress: [
          { required: true, message: "请输入配送区域名称", trigger: "blur" }
        ],
        areaofdistributionsetBelongarea: [{ required: true, message: "请输入所辖地区", trigger: "blur" }]
      }
    };
  },

  components: {},

  methods: {
    onSubmit(formName) {
      // console.log("submit!");
      // this.$axios
      //   .post(
      //     "http://172.16.14.127:8080/groupmall/setting/AreaOfDistributionSet",
      //     JSON.stringify({
      //       areaofdistributionset: this.$data.local.name,
      //       areaofdistributionsetFirstweicost: this.$data.local.first,
      //       areaofdistributionsetLastweicost: this.$data.local.second,
      //       areaofdistributionsetFreecount: this.$data.local.free,
      //       areaofdistributionsetBelongarea: this.$data.local.local
      //     })
      //   )
      //   .then(response => {

      //   });
      this.$refs[formName].validate(valid => {
        if(valid){
          // console.log(valid)
          localApi.add(this.local).then(response=>{
            const resp = response.data
            // console.log(resp)
            if(resp){
              this.$alert('更新提示信息','更新成功', {
                confirmButtonText:'确定'
              })
              this.$router.push({path:'/shezhi/peisonglocal'})
            }
            // if(resp.status===true){
            //   this.$message({
            //     message: '新增成功',
            //     type: "success"
            //   });
            //   // console.log('新增成功')
            //   // this.$refs[formName].resetFields();
            //   this.$router.push({path:'/shezhi/peisonglocal'})
            // }
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
<template>
  <el-form
    ref="jiekouForm"
    :model="jiekouForm"
    label-width="120px"
    style="width:50%"
  >
    <el-form-item label="快递接口KEY" prop="kuaidiKEY">
      <el-input size="small" v-model="jiekouForm.kuaidiKEY" placeholder="申请接口KEY"></el-input>
    </el-form-item>
    <el-form-item label="短信接口KEY" prop="duanxinKEY">
      <el-input size="small" v-model="jiekouForm.duanxinKEY" placeholder="申请接口KEY"></el-input>
    </el-form-item>
    <el-form-item label="短信模板COD" prop="duanxinCOD">
      <el-input size="small" v-model="jiekouForm.duanxinCOD"></el-input>
    </el-form-item>
    <el-form-item label="短信签名" prop="qianming">
      <el-input size="small" v-model="jiekouForm.qianming"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm('jiekouForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      jiekouForm: {
        kuaidiKEY: "",
        duanxinKEY: "",
        duanxinCOD: "",
        qianming: ""
      }
    };
  },

  components: {},

  methods: {
      onSubmit() {
      console.log("submit!");
    },
    resetForm(formName){
        this.$refs[formName].resetFields()
    }
  }
};
</script>

<style scoped>
</style>
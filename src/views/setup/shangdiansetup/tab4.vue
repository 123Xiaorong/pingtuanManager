<template>
  <el-form
    ref="gouwuForm"
    :model="gouwuForm"
    label-width="140px"
    style="width:50%"
  >
    <el-form-item label="是否使用积分" prop="radio">
      <el-radio-group v-model="gouwuForm.radio">
        <el-radio v-model="radio" label="使用"></el-radio>
        <el-radio v-model="radio" label="不使用"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否使用优惠券" prop="youhuiquan">
      <el-radio-group v-model="gouwuForm.youhuiquan">
        <el-radio v-model="youhuiquan" label="使用"></el-radio>
        <el-radio v-model="youhuiquan" label="不使用"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否使用余额" prop="yue">
      <el-radio-group v-model="gouwuForm.yue">
        <el-radio v-model="yue" label="使用"></el-radio>
        <el-radio v-model="yue" label="不使用"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="操作订单时" prop="dingdan">
      <el-radio-group v-model="gouwuForm.dingdan">
        <el-radio v-model="dingdan" label="必须填写备注"></el-radio>
        <el-radio v-model="dingdan" label="无须填写备注"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="购物最小金额" prop="minMoney">
      <el-input size="small" v-model="gouwuForm.minMoney" placeholder="达到此购物金额，才能提交订单"></el-input>
    </el-form-item>
    <el-form-item label="减少库存时机" prop="shiji">
      <el-radio-group v-model="gouwuForm.shiji">
        <el-radio v-model="shiji" label="付款时"></el-radio>
        <el-radio v-model="shiji" label="成团时"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm('gouwuForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      radio: "使用",
      youhuiquan: "使用",
      yue: "使用",
      dingdan: "必须填写备注",
      shiji: "付款时",
      gouwuForm: {
        radio: "使用",
        youhuiquan: "使用",
        yue: "使用",
        dingdan: "必须填写备注",
        minMoney: "",
        shiji: "付款时"
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
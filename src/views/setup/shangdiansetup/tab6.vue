<template>
  <el-form
    ref="spxianshiForm"
    :model="spxianshiForm"
    label-width="140px"
    style="width:50%"
  >
    <el-form-item label="是否显示货号" prop="huohao">
      <el-radio-group v-model="spxianshiForm.huohao">
        <el-radio v-model="huohao" label="显示"></el-radio>
        <el-radio v-model="huohao" label="不显示"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否显示重量" prop="weight">
      <el-radio-group v-model="spxianshiForm.weight">
        <el-radio v-model="weight" label="显示"></el-radio>
        <el-radio v-model="weight" label="不显示"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否显示库存" prop="kucun">
      <el-radio-group v-model="spxianshiForm.kucun">
        <el-radio v-model="kucun" label="显示"></el-radio>
        <el-radio v-model="kucun" label="不显示"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否显示市场价格" prop="price">
      <el-radio-group v-model="spxianshiForm.price">
        <el-radio v-model="price" label="显示"></el-radio>
        <el-radio v-model="price" label="不显示"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm('spxianshiForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      huohao: "显示",
      weight: "显示",
      kucun: "显示",
      price: "显示",
      spxianshiForm: {
        huohao: "显示",
        weight: "显示",
        kucun: "显示",
        price: "显示"
      }
    };
  },

  components: {},

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>
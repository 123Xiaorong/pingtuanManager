<template>
  <el-form
    ref="fenxiangForm"
    :model="fenxiangForm"
    label-width="120px"
    style="width:50%"
  >
    <el-form-item label="首页标题" prop="title">
      <el-input size="small" v-model="fenxiangForm.title" placeholder="首页标题"></el-input>
    </el-form-item>
    <el-form-item label="首页简介" prop="jianjie">
      <el-input size="small" v-model="fenxiangForm.jianjie" placeholder="首页简介"></el-input>
    </el-form-item>
    <el-form-item label="秒杀简介" prop="miaosha">
      <el-input size="small" v-model="fenxiangForm.miaosha" placeholder="秒杀简介"></el-input>
    </el-form-item>
    <el-form-item label="抽奖标题" prop="choujiangTitle">
      <el-input size="small" v-model="fenxiangForm.choujiangTitle" placeholder="抽奖标题"></el-input>
    </el-form-item>
    <el-form-item label="抽奖简介" prop="choujiangJianjie">
      <el-input size="small" v-model="fenxiangForm.choujiangJianjie" placeholder="抽奖简介"></el-input>
    </el-form-item>
    <el-form-item label="阶梯团标题" prop="jietituanTitle">
      <el-input size="small" v-model="fenxiangForm.jietituanTitle" placeholder="阶梯团标题"></el-input>
    </el-form-item>
    <el-form-item label="阶梯团简介" prop="jietituanJianjie">
      <el-input size="small" v-model="fenxiangForm.jietituanJianjie" placeholder="阶梯团简介"></el-input>
    </el-form-item>
    <el-form-item label="特卖标题" prop="hotTitle">
      <el-input size="small" v-model="fenxiangForm.hotTitle" placeholder="特卖标题"></el-input>
    </el-form-item>
    <el-form-item label="特卖简介" prop="hotJianjie">
      <el-input size="small" v-model="fenxiangForm.hotJianjie" placeholder="特卖简介"></el-input>
    </el-form-item>
    <el-form-item label="签到标题" prop="qiandaoTitle">
      <el-input size="small" v-model="fenxiangForm.qiandaoTitle" placeholder="签到标题"></el-input>
    </el-form-item>
    <el-form-item label="签到简介" prop="qiandaoJianjie">
      <el-input size="small" v-model="fenxiangForm.qiandaoJianjie" placeholder="签到简介"></el-input>
    </el-form-item>
    <el-form-item label="助力免单标题" prop="zhuliTitle">
      <el-input size="small" v-model="fenxiangForm.zhuliTitle" placeholder="助里免单标题"></el-input>
    </el-form-item>
    <el-form-item label="助力免单简介" prop="zhuliJianjie">
      <el-input size="small" v-model="fenxiangForm.zhuliJianjie" placeholder="助里免单简介"></el-input>
    </el-form-item>
    <el-form-item label="热榜标题" prop="rebangTitle">
      <el-input size="small" v-model="fenxiangForm.rebangTitle" placeholder="热榜标题"></el-input>
    </el-form-item>
    <el-form-item label="热榜简介" prop="rebangJianjie">
      <el-input size="small" v-model="fenxiangForm.rebangJianjie" placeholder="热榜简介"></el-input>
    </el-form-item>
    <el-form-item label="积分商城标题" prop="jifenTitle">
      <el-input size="small" v-model="fenxiangForm.jifenTitle" placeholder="积分商城标题"></el-input>
    </el-form-item>
    <el-form-item label="积分商城简介" prop="jifenJianjie">
      <el-input size="small" v-model="fenxiangForm.jifenJianjie" placeholder="积分商城简介"></el-input>
    </el-form-item>
    <el-form-item label="领取优惠券标题" prop="youhuiTitle">
      <el-input size="small" v-model="fenxiangForm.youhuiTitle" placeholder="领取优惠券标题"></el-input>
    </el-form-item>
    <el-form-item label="领取优惠券简介" prop="youhuiJianjie">
      <el-input size="small" v-model="fenxiangForm.youhuiJianjie" placeholder="领取优惠券简介"></el-input>
    </el-form-item>
        <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm('fenxiangForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
        fenxiangForm:{
            title: '',
            jianjie: '',
            miaosha: '',
            choujiangTitle: '',
            choujiangJianjie: '',
            jietituanTitle: '',
            jietituanJianjie: '',
            hotTitle: '',
            hotJianjie: '',
            qiandaoTitle: '',
            qiandaoJianjie: '',
            zhuliTitle: '',
            zhuliJianjie: '',
            rebangTitle: '',
            rebangJianjie: '',
            jifenTitle: '',
            jifenJianjie: '',
            youhuiTitle: '',
            youhuiJianjie: ''

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
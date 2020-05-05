<template>
  <el-form
    ref="xianshiForm"
    :model="xianshiForm"
    label-width="120px"
    style="width:50%"
  >
    <el-form-item label="销量排行数量" prop="yuming">
      <el-input  v-model="xianshiForm.yuming" placeholder="请输入销量" size="small"></el-input>
    </el-form-item>
    <el-form-item label="评论数量" prop="mulu">
      <el-input size="small" v-model="xianshiForm.mulu" placeholder="显示在商品详情页的用户评论数量"></el-input>
    </el-form-item>
    <el-form-item label="商品名长度" prop="link">
      <el-input v-model="xianshiForm.link" placeholder="请输入商品名长度" size="small"></el-input>
    </el-form-item>
    <el-form-item label="商品分类页列表显示的数量" prop="kucun">
      <el-input size="small" v-model="xianshiForm.kucun" placeholder="请输入商品分类页列表显示的数量"></el-input>
    </el-form-item>
    <el-form-item label="助力免单规则" prop="miandan">
      <el-input :disabled="true" type="textarea" :autosize="{minRows:5,maxRows:8}" v-model="xianshiForm.miandan" placeholder="邀请好友助力，达到助力人数，即可享免单权利,若发现用户存在刷单、虚假用户助力等违规行为，平台有权判定助力失败
         邀请到足够好友帮您助力成功之后，可前往我的订单查看发货与物流详情,对物流、商品有疑问或者需要修改收货地址请联系商家客服处理">
        
      </el-input>
    </el-form-item>
        <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm('xianshiForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      xianshiForm: {
          yuming:'',
          mulu:'',
          link:'',
          kucun:'',
          miandan: ''
      },
      
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
el-form-item {
    text-align: center;
}
</style>

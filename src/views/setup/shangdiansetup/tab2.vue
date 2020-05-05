<template>
  <el-form ref="jibenForm" :rules="rules" :model="jibenForm" label-width="120px" style="width:50%">
    <el-form-item label="网站域名" prop="yuming" >
      <el-input v-model="jibenForm.yuming" placeholder="请输入网站域名" size="small"></el-input>
    </el-form-item>
    <el-form-item label="安装目录" prop="mulu">
      <el-input v-model="jibenForm.mulu" placeholder="请输入安装目录" size="small"></el-input>
    </el-form-item>
    <el-form-item label="引导关注链接" prop="link">
      <el-input v-model="jibenForm.link" placeholder="引导关注链接" size="small"></el-input>
    </el-form-item>
    <el-form-item label="启用库存" prop="kucun">
      <el-input v-model="jibenForm.kucun" placeholder="启用库存" size="small"></el-input>
    </el-form-item>
    <el-form-item label="消费积分名称" prop="jifenName">
      <el-input v-model="jibenForm.jifenName" placeholder="请输入消费积分名称" size="small"></el-input>
    </el-form-item>
    <el-form-item label="商品货号前缀" prop="huohao">
      <el-input v-model="jibenForm.huohao" placeholder="请输入商品货号前缀" size="small"></el-input>
    </el-form-item>
    <el-form-item label="评论审核" prop="radio">
      <el-radio-group v-model="jibenForm.radio">
        <el-radio v-model="radio" label="不需要审核"></el-radio>
        <el-radio v-model="radio" label="需要审核"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="缓存时间" prop="huancunTime">
      <el-input v-model="jibenForm.huancunTime" placeholder="前台页面缓存的存活时间，以秒为单位" size="small"></el-input>
    </el-form-item>
    <el-form-item label="是否启用Gzip模式" prop="Gzip">
      <el-radio-group v-model="jibenForm.Gzip">
        <el-radio v-model="Gzip" label="禁用"></el-radio>
        <el-radio v-model="Gzip" label="启用"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="统计代码" prop="daimaCount">
      <el-input type="textarea" v-model="jibenForm.daimaCount" size="small"></el-input>
    </el-form-item>
    <el-form-item label="排行统计" prop="paihangCount" style="width: 150%">
      <el-radio-group v-model="jibenForm.paihangCount">
        <el-radio v-model="paihangCount" label="所有"></el-radio>
        <el-radio v-model="paihangCount" label="一年"></el-radio>
        <el-radio v-model="paihangCount" label="半年"></el-radio>
        <el-radio v-model="paihangCount" label="三个月"></el-radio>
        <el-radio v-model="paihangCount" label="一个月"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="默认库存" prop="morenkucun">
      <el-input v-model="jibenForm.morenkucun" size="small"></el-input>
    </el-form-item>
    <el-form-item label="物流追踪" prop="wuliu">
      <el-radio-group v-model="jibenForm.wuliu">
        <el-radio v-model="wuliu" label="需要开启"></el-radio>
        <el-radio v-model="wuliu" label="不需要开启"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm('jibenForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
        radio: "不需要审核",
        paihangCount: "所有",
        wuliu: "需要开启",
        Gzip: "禁用",
      jibenForm: {
        yuming: '',
        mulu: '',
        link: '',
        kucun: '',
        jifenName: '',
        huohao: '',
        radio: "不需要审核",
        huancunTime: '',
        daimaCount:'',
        paihangCount: '所有',
        morenkucun: 1000,
        wuliu: '需要开启',
        Gzip: "禁用"
      },
      rules: {
        yuming: [{ required: true, message: "请输入网站域名", trigger: "blur" }],
        mulu: [{ required: true, message: "请输入安装目录", trigger: "blur" }],
        huohao: [{required: true, message: "请输入货号前缀", trigger: "blur" }]
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

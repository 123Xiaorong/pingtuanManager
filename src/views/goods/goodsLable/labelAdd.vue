<template>
  <div class="labelAdd">
    <!-- <el-tab-pane label="添加标签" name="second"> -->
    <div class="Row" style="padding-left: 10px">
      <div>
        <span style="font-size: 14px;color: #606266">新增标签名称：</span>
        <el-input
          placeholder="请输入内容"
          v-model="tagdata.tagName"
          clearable
          size="small"
          class="inputSize"
        >
        </el-input>
      </div>
      <div>
       <span style="font-size: 14px;color: #606266">新增标签简介：</span>
        <el-input
          placeholder="请输入内容"
          v-model="tagdata.tagDesc"
          clearable
          size="small"
          class="inputSize"
        >
        </el-input>
      </div>
      <el-button type="primary" style="margin-left: 20%" @click="addTag">提交</el-button>
      <el-button @click="Back">返回</el-button>
    </div>
    <!-- </el-tab-pane> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tagdata:{
        tagName:'',
        tagDesc:'',
      }
    };
  },
  methods:{
    Back(){
      this.$router.go(-1)
    },
    addTag(){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/tags/add',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:this.tagdata
      }).then((resp)=>{
        console.log(resp);
      });
     this.$message({
       message:'新增成功',
       type:'success'
     });
     this.$router.push({path:'/goodsLable'})
    }
  }
};
</script>
<style scoped>
.inputSize {
  width: 40%;
}
.Row > div {
  padding: 10px 0;
}
</style>

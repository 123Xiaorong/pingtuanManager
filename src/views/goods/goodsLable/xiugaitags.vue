<template>
    <div class="labelAdd">
        <div class="Row" style="padding-left: 10px">
            <div>
                <span style="font-size: 14px;color: #606266">标签名称：</span>
                <el-input
                        placeholder="请输入内容"
                        v-model="tagData.tagName"
                        clearable
                        size="small"
                        class="inputSize"
                >
                </el-input>
            </div>
            <div>
                <span style="font-size: 14px;color: #606266">标签简介：</span>
                <el-input
                        placeholder="请输入内容"
                        v-model="tagData.tagDesc"
                        clearable
                        size="small"
                        class="inputSize"
                >
                </el-input>
            </div>
            <div>
                <span style="font-size: 14px;color: #606266">是否启用：</span>
                <el-radio v-model="tagData.ifShow" label="true">是</el-radio>
                <el-radio v-model="tagData.ifShow" label="false">否</el-radio>
            </div>
            <el-button type="primary" style="margin-left: 20%" @click="updateTag">提交</el-button>
            <el-button @click="clearI">返回</el-button>
        </div>
        <!-- </el-tab-pane> -->
    </div>
</template>

<script>
  export default {
    name:'xiugaitags',
    components: {},
    data() {
      return {
        tagData:{
          tagName:'',
          tagDesc:'',
          ifShow:'',
        }
      };
    },
    methods:{
      updateTag(){
        this.$axios({
          method:'post',
          url: this.$host+'/groupmall/power/tags/update',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:this.tagData
        }).then((resp)=>{
          console.log(resp);
          if(resp.data.success==true){
            this.$message({
              message:'修改成功',
              type:'success'
            });
          }
        });
        this.$router.go(-1)
      },
      clearI(){
        this.$router.go(-1)
      }
    },
    created(){
      console.log(this.$route.query.row);
      this.tagData=this.$route.query.row;
    }
  }
</script>
<style scoped>
    .inputSize {
        width: 40%;
    }
    .Row > div {
        padding: 10px 0;
    }
</style>

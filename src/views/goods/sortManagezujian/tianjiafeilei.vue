<template>
        <div>
            <div class="Row">
                <div>
                    <div class="TitleB" style="font-size: 14px">分类名称：</div>
                    <el-input placeholder="请输入内容"
                              v-model="cateData.cateName"
                              size="small"
                              clearable class="inputSize">
                    </el-input>
                </div>
                <div>
                    <div class="TitleB">数量单位：</div>
                    <el-input placeholder="请输入内容"
                              v-model="cateData.unit"
                              size="small"
                              clearable class="inputSize">
                    </el-input>
                </div>
                <div>
                    <div class="TitleB"> 分类序号：</div>

                    <el-input placeholder="请输入内容"
                              v-model="cateData.sort"
                              size="small"
                              clearable class="inputSize">
                    </el-input>
                </div>
                <div>
                    <div class="TitleB">是否显示：</div>
                    <el-radio v-model="cateData.ifShow" label="true">是</el-radio>
                    <el-radio v-model="cateData.ifShow" label="false">否</el-radio>
                </div>
                <div>
                    <div class="TitleB">关键字：</div>
                    <el-input placeholder="请输入内容"
                              v-model="cateData.keyWord"
                              size="small"
                              clearable class="inputSize">
                    </el-input>
                </div>
                <div>
                    <div class="TitleB">分类描述：</div>
                    <el-input class="inputSize"
                              type="textarea"
                              size="small"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              v-model="cateData.desc">
                    </el-input>
                </div>
                <div>
                    <el-button type="primary" style="margin-left: 20%" @click="submitCate">提交</el-button>
                    <el-button @click="Back">返回</el-button>
                </div>
            </div>
        </div>
</template>

<script>
  export default {
    name: "tianjiafeilei",
    data(){
      return{
        cateData:{
          cateName:'',
          unit:'',
          sort:'',
          ifShow:'',
          keyWord:'',
          desc:'',
        }
      }
    },
    methods:{
      Back(){
        this.$router.go(-1);
      },
      submitCate(){
        console.log(this.cateData);
        this.$axios({
          method:'post',
          url: this.$host+'/groupmall/power/category/add',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:this.cateData
        }).then((resp)=>{
          console.log(resp);
        });
        this.$message({
          message:'新增成功',
          type:'success'
        });
        this.$router.push({path:'/sortManage'})
      }
    },
  };
</script>

<style scoped>
    #app{
        margin-left: 20px;
    }
    .inputSize{
        width: 40%;
    }
    .TitleB{
        float: left;
        width: 80px;
        font-size: 14px;
        color: #606266;
    }
    .Row>div{
        padding: 10px 0;
    }
</style>
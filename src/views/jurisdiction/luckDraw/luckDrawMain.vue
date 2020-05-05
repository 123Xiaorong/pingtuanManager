<template>
    <div>
        <!--幸运抽奖-->
        <div class="divFirst">
            <el-row>
                <router-link to="/luckDrawAdd" active-class="active" style="margin-right: 10px">
                    <el-button type="primary" style="margin-left: 10px" icon="el-icon-plus">添加抽奖</el-button>
                </router-link>
                <el-button
                        @click="deleteAll()"
                        type="danger"
                        icon="el-icon-delete">批量删除
                </el-button>
                <!--<el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>-->
                <!--<div style="float: right;margin-top: 2px">-->
                    <!--<router-link to="/luckyGroupManage" active-class="active" style="margin-right: 10px">-->
                    <!--<el-button type="primary" size="small">抽奖详情</el-button>-->
                    <!--</router-link>-->
                    <!--<router-link to="/winningUsers" active-class="active" style="margin-right: 10px">-->
                        <!--<el-button type="primary" size="small">查看中奖用户</el-button>-->
                    <!--</router-link>-->
                    <!--<el-button type="primary" size="small">随机抽奖</el-button>-->
                    <!--<router-link to="/InternalDeter" active-class="active" style="margin-left: 10px">-->
                        <!--<el-button type="primary" size="small">内定抽奖</el-button>-->
                    <!--</router-link>-->
                <!--</div>-->
            </el-row>
        </div>
        <luckDrawMainOne @luckClickEvent="luckClickEvent"/>
    </div>
</template>

<script>
  import luckDrawMainOne from './luckDrawMainOne'
  export default {
    name: "luckDrawMain",
    components: {
      luckDrawMainOne:luckDrawMainOne,
    },
    data() {
      return {
        totalNumber:'',
        currPage:'',
        pageSize:'',
      }
    },
    methods: {
      // 子组件穿过来的值
      luckClickEvent(data){
        // console.log("子"+data);
        this.$data.totalNumber=data[0];
        this.$data.currPage=data[1];
        this.$data.pageSize=data[2];
        // console.log(this.$data.totalNumber)
        // console.log(this.$data.pageSize)
      },
      // 取消选择
      toggleSelection(rows) {
        // console.log(rows)
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 批量删除
      deleteAll(){
        console.log(this.$data.totalNumber);
        if(this.$data.totalNumber.length>0){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              url:this.$host+"/groupmall/setting/LuckInfo/deleteLuckyActsBatch",
              method:'put',
              // headers:{"Content-Type":"application/x-www-form-urlendcoded"},
              access_token:this.token,
              data:{
                list:this.$data.totalNumber,
              }
            }).then(resp=>{
              console.log("测试批量删除");
              console.log(resp.data);
              if(resp.data=='"status":true'){
                this.$router.go(0);
              }

            });
          }).catch(() => {

          });

          // this.$axios.post("http://172.16.14.132:80/power/",JSON.stringify({
          //   dels:totalArr,
          // })).then(resp=>{
          //   console.log("测试批量删除");
          //   console.log(resp.data);
          // });
        }
      },
    }
  }
</script>

<style scoped>
    .divFirst{
        margin-top: 10px;
        margin-left: 10px;
    }
</style>

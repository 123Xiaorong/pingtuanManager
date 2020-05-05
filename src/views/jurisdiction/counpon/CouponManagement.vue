<template>
    <div>
      <div class="divFirst">
        <el-row>
          <router-link to="/couponAdd" active-class="active" style="margin-right: 10px">
            <el-button type="primary" icon="el-icon-plus">添加优惠券</el-button>
          </router-link>
          <el-button
                  @click="deleteAll()"
                  type="danger"
                  icon="el-icon-delete">批量删除
          </el-button>
          <!--<el-button @click="toggleSelection()" style="margin-right: 10px" icon="el-icon-close">取消选择</el-button>-->
        </el-row>
      </div>
      <!--加入组件-->
      <couponMaOne @clickEvent="clickMain"></couponMaOne>
    </div>
</template>

<script>
  import couponMaOne from './couponMaOne'
    export default {
        name: "CouponManagement",
      // provide(){
      //     return {
      //       reload:this.reload
      //     }
      // },
        components: {
          couponMaOne:couponMaOne,
                },
      data() {
        return {
          totalNumber:'',
          currPage:'',
          pageSize:'',
        }
      },
      methods: {
          // reload(){
          //
          // },
        // 子组件穿过来的值
        clickMain(data){
          // console.log("子"+data);
          this.$data.totalNumber=data[0];
          this.$data.currPage=data[1];
          this.$data.pageSize=data[2];
          // console.log(this.$data.totalNumber)
          // console.log(this.$data.pageSize)
        },
        // 批量删除
        deleteAll(){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              url:this.$host+"/groupmall/power/coupon/catchDeleteCoupon",
              method:'post',
              headers:{"Content-Type":"application/x-www-form-urlendcoded"},
              access_token:this.token,
              params:{
                dels:this.$data.totalNumber,
                currPage:this.$data.currPage,
                pageSize:this.$data.pageSize,
              }
            }).then(resp=>{
              console.log("测试批量删除");
              console.log(resp.data);
              this.$router.go(0);
              // that.reload()
              // this.$router.push({ path:'/CouponManagement'  })
              // this.route.go(0)
            });
          }).catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });
          });
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

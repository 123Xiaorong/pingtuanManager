<template>
    <div class="allGroup">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" ></el-table-column>
            <el-table-column prop="orderId" label="订单ID"> </el-table-column>
            <el-table-column prop="username" label="用户昵称"> </el-table-column>
            <el-table-column prop="callNum" label="手机号"> </el-table-column>
            <!--<el-table-column prop="address" label="操作">-->
                <!--<el-button type="primary">查看</el-button>-->
            <!--</el-table-column>-->
        </el-table>
        <!--分页-->
        <div class="block" style="text-align:center;margin-top:10px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3, 5, 8]"
                    :page-size="3"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  export default {
    name:'winningUsers',
    components: {},
    props: {},
    data() {
      return {
        // 初始化数据总条数：200
        total:200,
        // 初始化页码
        currentPage: 1,
        // 初始化每页大小
        pageSize:3,
        // form: {
        //   name: "",
        //   region: "",
        //   date1: "",
        //   date2: "",
        //   delivery: false,
        //   type: [],
        //   resource: "",
        //   desc: ""
        // },
        // tableData: [
        //   {
        //     id: "2011225010101",
        //     userID: "323232323",
        //     name: "张三",
        //     tel:'13131313131',
        //   },
        //   {
        //     id: "2011225010101",
        //     userID: "323232323",
        //     name: "张三",
        //     tel:'13131313131',
        //   },
        //   {
        //     id: "2011225010101",
        //     userID: "323232323",
        //     name: "张三",
        //     tel:'13131313131',
        //   },
        //   {
        //     id: "2011225010101",
        //     userID: "323232323",
        //     name: "张三",
        //     tel:'13131313131',
        //   }
        // ],
        tableData:[],
      };
    },
    created(){
      console.log(this.$route.query.id);
      this.$axios({
        url:this.$host+"/groupmall/setting/LuckInfo/LuckUsers",
        method:'get',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{
            luckId:this.$route.query.id,
            page:this.$data.currentPage,
          limit:this.$data.pageSize
        }
      })
        .then(resp=>{
          console.log(resp.data.data)
          this.$data.tableData=resp.data.data;
          this.$data.total=resp.data.count;
        });
    },
    methods: {
      onSubmit() {
        console.log("submit!");
      },
      // 改变每页显示的数据条数
      handleSizeChange(val) {
        this.$data.pageSize=val;
        this.$axios({
          url:this.$host+"/groupmall/setting/LuckInfo/LuckUsers",
          method:'get',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            luckId:this.$route.query.id,
            page:this.$data.currentPage,
            limit:this.$data.pageSize
          }
        })
          .then(resp=>{
            // console.log(resp.data)
            this.$data.tableData=resp.data.data;
            // this.$data.total=resp.data.count;
          });
      },
      // 当前显示的是哪一页的数据
      handleCurrentChange(val) {
        this.$data.currentPage=val;
        this.$axios({
          url:this.$host+"/groupmall/setting/LuckInfo/LuckUsers",
          method:'get',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            luckId:this.$route.query.id,
            page:this.$data.currentPage,
            limit:this.$data.pageSize
          }
        })
          .then(resp=>{
            // console.log(resp.data)
            this.$data.tableData=resp.data.data;
            // this.$data.total=resp.data.count;
          });
        // this.$axios({
        //   url:"http://172.16.14.127:8080/groupmall/setting/LuckInfo/getNewLuckActs",
        //   method:'get',
        //   headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        //   access_token:this.token,
        //   params:{
        //     page:this.$data.currentPage,
        //     limit:this.$data.pageSize,
        //   }
        // })
        //   .then(resp=>{
        //     // console.log(resp.data)
        //     this.$data.tableData=resp.data.data;
        //     // this.$data.total=resp.data.count;
        //   });
      },
    }
  };
</script>
<style scoped>
    .allGroup {
        padding: 10px;
    }
    .allGroupInput {
        float: left;
    }
</style>

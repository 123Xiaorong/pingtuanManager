<template>
    <div class="allGroup">
        <div>
            <el-button type="primary" icon="el-icon-circle-check" @click="allLuck()">批量中奖</el-button>
            <el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>
        </div>
        <el-table :data="tableData"  ref="multipleTable"
                  tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%;text-align: center">
        <el-table-column width="60" type="selection"></el-table-column>
            <el-table-column prop="userId" label="用户ID"></el-table-column>
            <el-table-column prop="orderId" label="订单ID" > </el-table-column>
            <el-table-column prop="username" label="用户昵称"></el-table-column>
            <el-table-column prop="callNum" label="手机号"></el-table-column>
            <!--<el-table-column  label="操作">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-row>-->
            <!--<el-button type="primary" size="small" icon="el-icon-circle-check" title="确定中奖"-->
            <!--@click="luckDraw(scope.row.userId)"-->
            <!--&gt;</el-button>-->
                    <!--</el-row>-->
                <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-row>
            <el-button type="primary" size="small" icon="el-icon-circle-check" title="确定中奖"
            @click="luckDraw(scope.row.userId)"
            ></el-button>
                    </el-row>
                </template>
            </el-table-column>

            <!--<el-table-column  label="操作">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-row>-->
            <!--&lt;!&ndash;<el-button type="primary" size="small" icon="el-icon-circle-check" title="确定中奖"&ndash;&gt;-->
            <!--&lt;!&ndash;@click="luckDraw(scope.row.userId)"&ndash;&gt;-->
            <!--&lt;!&ndash;&gt;</el-button>&ndash;&gt;-->
                    <!--</el-row>-->
                <!--</template>-->
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
    name:'InternalDeter',
    components: {},
    props: {},
    data() {
      return {
        tableData: [
          // {
          //   id: "2011225010101",
          //   userID: "323232323",
          //   name: "张三",
          //   tel:'13131313131',
          // }
        ],
        multipleSelection: [],
        // 初始化数据总条数：200
        total:200,
        // 初始化页码
        currentPage: 1,
        // 初始化每页大小
        pageSize:3,
        // 多选
        totalNumber:[],
      };
    },
    created(){
      // console.log(this.$route.query.id);
      this.$axios({
        url:this.$host+"/groupmall/setting/LuckInfo/getInnerLuckUsers",
        method:'get',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{
            luckId:this.$route.query.id,
            page:this.$data.currentPage,
            limit:this.$data.pageSize,
        }
      })
        .then(resp=>{
          // console.log(resp.data.data);
          this.$data.tableData=resp.data.data;
          this.$data.total=resp.data.count;
        });
    },
    methods: {
      // 单个中奖
      luckDraw(index){
        console.log(index)

      },
      // 批量中奖
      allLuck(){
        if (this.$data.totalNumber.length>0){
          this.$axios({
            url:this.$host+"/groupmall/setting/LuckInfo/BatchGetLucky",
            method:'put',
            // headers:{"Content-Type":"application/x-www-form-urlendcoded"},
            access_token:this.token,
            data:{
              arry:this.$data.totalNumber,
              luckId:this.$route.query.id,
            }
          })
            .then(resp=>{
              // console.log(resp.data);
              if(resp.data>0){
                // console.log(123)
                this.$alert('批量中奖处理成功！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // this.$message({
                    //   type: 'info',
                    //   message: `action: ${ action }`
                    // });
                  }
                });
              }
              // this.$data.tableData=resp.data.data;
              // this.$data.total=resp.data.count;
            });
        }
      },

      // 改变每页显示的数据条数
      handleSizeChange(val) {
        this.$data.pageSize=val;
        this.$axios({
          url:this.$host+"/groupmall/setting/LuckInfo/getInnerLuckUsers",
          method:'get',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            luckId:this.$route.query.id,
            page:this.$data.currentPage,
            limit:this.$data.pageSize,
          }
        })
          .then(resp=>{
            // console.log(resp.data);
            this.$data.tableData=resp.data.data;
            // this.$data.total=resp.data.count;
          });
      },
      // 当前显示的是哪一页的数据
      handleCurrentChange(val) {
        this.$data.currentPage=val;
        this.$axios({
          url:this.$host+"/groupmall/setting/LuckInfo/getInnerLuckUsers",
          method:'get',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            luckId:this.$route.query.id,
            page:this.$data.currentPage,
            limit:this.$data.pageSize,
          }
        })
          .then(resp=>{
            // console.log(resp.data)
            this.$data.tableData=resp.data.data;
            // this.$data.total=resp.data.count;
          });
      },
      // 多选
      handleSelectionChange(val) {
        this.$data.multipleSelection = val;
        this.$data.totalNumber=[];
        for(var i=0;i<this.multipleSelection.length;i++){
          this.$data.totalNumber.push(this.multipleSelection[i].userId)
        }
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

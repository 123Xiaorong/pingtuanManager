<template>
    <div class="couponTable" style="margin-top: 5px">
        <el-table :data="tableData"  ref="multipleTable"
                  tooltip-effect="dark" @selection-change="handleSelectionChange"
                  style="width: 100%;text-align: center">
            <!--多选框-->
            <el-table-column width="60" type="selection"></el-table-column>
            <!--表格内容-->
            <el-table-column label="优惠券ID" v-if="true" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{ scope.row.coupId}}</span>
                </template>
            </el-table-column>
            <el-table-column label="优惠券名称" width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.coupName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="类型" width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.coupType}}</span>
                </template>
            </el-table-column>
            <el-table-column label="优惠券金额" width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.coupAmount}}</span>
                    <!--<span>0.00</span>-->
                </template>
            </el-table-column>
            <el-table-column label="订单金额" width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.orderAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="发放数量" width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.coupUse}}</span>
                </template>
            </el-table-column>
            <el-table-column label="使用数量" width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.coupUseTotal}}</span>
                    <!--<span>0</span>-->
                </template>
            </el-table-column>
            <el-table-column label="有效日期" width="160">
                <template slot-scope="scope">
                    <span>{{scope.row.useBegin}}{{scope.row.userEnd}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right">
                <template slot-scope="scope">
                    <el-row>
                        <!--查看-->
                        <router-link :to="{path:'/couponLook',
                        query:{id:scope.row.coupId,myStyle:scope.row.coupType}}"
                                active-class="active">
                            <el-button size="small" type="success" style="margin-right: 10px"
                                       icon="el-icon-view" title="查看">
                            </el-button>
                        </router-link>
                        <!--修改-->
                        <router-link
                                :to="{path:'/couponEdit',
                                query:{id:scope.row.coupId,myStyle:scope.row.coupType}}"
                                     active-class="active" style="margin-right: 10px">
                            <el-button size="small" type="warning"
                                       icon="el-icon-edit" title="修改">
                            </el-button>
                        </router-link>
                        <!--删除-->
                        <el-button size="small" type="danger" style="margin-right: 10px"
                                   @click="couponDelete(scope.row.coupId, scope.row)"
                                   icon="el-icon-delete" title="删除">
                        </el-button>
                        <!--发放-->
                        <router-link :to="{path:'/couponGrant',query:{id:scope.row.coupId}}"
                                     active-class="active">
                            <el-button size="small" type="primary"
                                       icon="el-icon-money" title="发放">
                            </el-button>
                        </router-link>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="paging">
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[3,5,8]"
                        :page-size="3"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    name: "couponMaOne",
    data(){
      return{
        // 初始化数据总条数：200
        total:0,
        // 初始化页码
        currentPage: 1,
        // 初始化每页大小
        pageSize:3,
        // 多选框
        multipleSelection: [],
        // 表格数据
        tableData: [],
        // 选中的数据
        totalNumber:[],
      }
    },
    // 载入时==获得所有优惠券数据和数据总条数
    created() {
      // 获取优惠券列表
      // console.log(this.$data.pageSize)
      // console.log(this.$data.currentPage)
      this.$axios.post(this.$host+"/groupmall/power/coupon/queryAllByCouponPage",JSON.stringify({
        pageSize:this.$data.pageSize,
        currPage:this.$data.currentPage,
      })).then(resp=>{
          // console.log("获取优惠券列表");
        // console.log(resp.data)
          this.$data.tableData=resp.data;
        for(var i=0;i<resp.data.length;i++){
          if(resp.data[i].coupUseTotal==null){
            resp.data[i].coupUseTotal=0;
          }
          if(resp.data[i].coupUse==null){
            resp.data[i].coupUse=0;
          }
        }
        });
      // 获取数据总条数
      this.$axios.post(this.$host+"/groupmall/power/coupon/queryAllByCouponTotal")
        .then(resp=>{
          // console.log(resp.data);
          this.$data.total=resp.data;
        })
    },
    methods:{
      // 删除优惠券
      couponDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(this.$host+"/groupmall/power/coupon/delete",JSON.stringify({
            coupID:index,
            currPage:this.$data.currentPage,
            pageSize:this.$data.pageSize,
          })).then(resp=>{
            console.log(resp.data);
            // 获取优惠券列表
            this.$axios.post(this.$host+"/groupmall/power/coupon/queryAllByCouponPage",JSON.stringify({
              pageSize:this.$data.pageSize,
              currPage:this.$data.currentPage,
            })).then(resp=>{
              this.$data.tableData=resp.data;
            });
            // 获取数据总条数
            this.$axios.post(this.$host+"/groupmall/power/coupon/queryAllByCouponTotal")
              .then(resp=>{
                this.$data.total=resp.data;
              })
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });

      },
      // 改变每页显示的数据条数
      handleSizeChange(val) {
        this.$data.pageSize=val;
        this.$axios.post(this.$host+"/groupmall/power/coupon/queryAllByCouponPage",JSON.stringify({
          pageSize:this.$data.pageSize
        })).then(resp=>{
            this.$data.tableData=resp.data;
          for(var i=0;i<resp.data.length;i++){
            if(resp.data[i].coupUseTotal==null){
              resp.data[i].coupUseTotal=0;
            }
            if(resp.data[i].coupUse==null){
              resp.data[i].coupUse=0;
            }
          }
          });
      },
      // 当前显示的是哪一页的数据
      handleCurrentChange(val) {
        this.$data.currentPage=val,
        this.$axios.post(this.$host+"/groupmall/power/coupon/queryAllByCouponPage",JSON.stringify({
          currPage:this.$data.currentPage,
          pageSize:this.$data.pageSize,
        })).then(resp=>{
          this.$data.tableData=resp.data;
          // console.log("111")
          console.log(resp.data);
          for(var i=0;i<resp.data.length;i++){
            if(resp.data[i].coupUseTotal==null){
              resp.data[i].coupUseTotal=0;
            }
            if(resp.data[i].coupUse==null){
              resp.data[i].coupUse=0;
            }
          }
        });
      },
      // 全选
      handleSelectionChange(val) {
        // console.log(this.$refs.multipleTable.toggleRowSelection(row));
        this.$data.multipleSelection = val;
        this.$data.totalNumber=[];
        for(var i=0;i<this.multipleSelection.length;i++){
          this.$data.totalNumber.push(this.multipleSelection[i].coupId)
        }
        var sessionArr=[this.$data.totalNumber,this.$data.currentPage,this.$data.pageSize];
        this.$emit("clickEvent",sessionArr);
      }
    },
  };
</script>

<style scoped>
    .paging{
        text-align: center;
    }
    .paging>div{
        margin: 8px 0px;
    }
</style>
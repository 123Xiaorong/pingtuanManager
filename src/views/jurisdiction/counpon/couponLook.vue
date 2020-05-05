<template>
    <div>
        <div class="divFirst">
            <el-row>
                <el-button type="danger" style="margin-left: 10px" icon="el-icon-delete" @click="deleteAll()">
                    批量删除
                </el-button>
                <el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>
            </el-row>
        </div>
        <div class="couponTable">
            <el-table :data="tableData"  ref="multipleTable" tooltip-effect="dark"
                      @selection-change="handleSelectionChange" style="width: 100%;text-align: center">
                <el-table-column width="60" type="selection"></el-table-column>
                <el-table-column label="编号"  prop="couponId" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{ scope.row.mangeId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="优惠券序列号" width="160">
                    <template slot-scope="scope">
                        <span>{{xuliehao}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型" width="80" >
                    <template slot-scope="scope">
                        <span>{{myStyle}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单号"  width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderNum}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="使用会员" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.userId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="使用时间" width="170">
                    <template slot-scope="scope">
                        <span>{{scope.row.uesDate}}</span>
                        <!--<span>{{(scope.row.uesDate).format("yyyy-MM-dd hh:mm:ss")}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-button size="small" type="danger"
                                       @click="couponLookDelete(scope.row.mangeId, scope.row)"
                                       icon="el-icon-delete" title="删除"></el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="paging">
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5,8,10]"
                        :page-size="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
  // 处理日期
  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  export default {
    name: "couponLook",
    data() {
      return {
        xuliehao:'',
        myIndex:'',
        myStyle:'',
        tableData: [],
        multipleSelection: [],
        // 初始化数据总条数：200
        total:100,
        // 初始化页码
        currentPage: 1,
        // 初始化每页大小
        pageSize:5,
        // 批量删除
        totalNumber:[],
      }
    },
    created(){
      this.$data.myIndex=this.$route.query.id;
      this.$data.myStyle=this.$route.query.myStyle;
      this.$axios.post(this.$host+"/groupmall/power/coupon/detail",JSON.stringify({
        coupID:this.$data.myIndex,
        pageSize:this.$data.pageSize,
        currPage:this.$data.currentPage,
      })).then(resp=>{
        this.$data.tableData=resp.data[0];
        this.$data.total=resp.data[1];
        this.$data.xuliehao=resp.data[2];
        // console.log(resp.data)
        // console.log(this.$data.xuliehao)
      })
    },
    methods: {
      // 批量删除
      deleteAll(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url:this.$host+"/groupmall/power/coupon/couponMangeBatchDelete",
            method:'post',
            headers:{"Content-Type":"application/x-www-form-urlendcoded"},
            access_token:this.token,
            params:{
              coupID:this.$data.myIndex,
              mangeIds:this.$data.totalNumber,
              pageSize:this.$data.pageSize,
              currPage:this.$data.currentPage,
            }
          }).then(resp=>{
            // console.log("测试批量删除");
            // console.log(resp.data);
            // that.reload()
            this.$router.go(0)
          });
        }).catch(() => {

        });
      },
      // 单个删除
      couponLookDelete(index,row){
        // console.log(index);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(this.$host+"/groupmall/power/coupon/couponMangeDelete",JSON.stringify({
            coupID:this.$data.myIndex,
            mangeId:index,
            pageSize:this.$data.pageSize,
            currPage:this.$data.currentPage,
          })).then(resp=>{
            // console.log(resp.data);
            this.$axios.post(this.$host+"/groupmall/power/coupon/detail",JSON.stringify({
              coupID:this.$data.myIndex,
              pageSize:this.$data.pageSize,
              currPage:this.$data.currentPage,
            })).then(resp=>{
              this.$data.tableData=resp.data[0];
              this.$data.total=resp.data[1];
            })
          })
        }).catch(() => {

        });
      },
      // 改变每页显示的数据条数
      handleSizeChange(val) {
        this.$data.pageSize=val;
        this.$axios.post(this.$host+"/groupmall/power/coupon/couponMangePage",JSON.stringify({
          coupID:this.$data.myIndex,
          pageSize:this.$data.pageSize,
          currPage:this.$data.currentPage,
        })).then(resp=>{
          this.$data.tableData=resp.data;
        });
      },
      // 当前显示的是哪一页的数据
      handleCurrentChange(val) {
        this.$data.currentPage=val,
          this.$axios.post(this.$host+"/groupmall/power/coupon/couponMangePage",JSON.stringify({
            coupID:this.$data.myIndex,
            currPage:this.$data.currentPage,
            pageSize:this.$data.pageSize,
          })).then(resp=>{
            this.$data.tableData=resp.data;
          });
      },
      // 选择哪些行
      handleSelectionChange(val) {
        this.$data.multipleSelection = val;
        this.$data.totalNumber=[];
        for(var i=0;i<this.multipleSelection.length;i++){
          this.$data.totalNumber.push(this.multipleSelection[i].mangeId)
        }
      },
      // 取消选择
      toggleSelection(rows) {
        // console.log(rows);
        // console.log(this.$refs.multipleTable.toggleRowSelection(row));
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
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
    .paging{
        text-align: center;
    }
    .paging>div{
        margin: 8px 0px;
    }
</style>

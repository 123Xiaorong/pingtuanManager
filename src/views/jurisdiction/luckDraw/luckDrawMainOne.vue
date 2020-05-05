<template>
    <div>
        <div class="couponTable">
            <el-table :data="tableData"  ref="multipleTable" tooltip-effect="dark"
                      @selection-change="handleSelectionChange" style="width: 100%;text-align: center">
                <el-table-column width="60" type="selection"></el-table-column>
                <el-table-column label="ID" width="80" prop="luckDrawId" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{ scope.row.lkId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" width="140" prop="goodName">
                    <template slot-scope="scope">
                        <span>{{scope.row.proName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="活动时间" width="165" prop="luckDrawActiveTime">
                    <template slot-scope="scope">
                        <span>{{scope.row.lkBegin}}{{scope.row.lkEnd}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100" prop="luckDrawState">
                    <template slot-scope="scope">
                        <span>{{scope.row.lkState}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="首页推荐" width="100" prop="shouye">
                    <template slot-scope="scope">
                        <el-switch
                                @change="changeSwitch(scope.row)"
                                v-model="scope.row.lkIndex"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-value="1"
                                inactive-value="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-row>
                            <el-button type="success" icon="el-icon-view"
                                       size="small" @click="luckDrawView(scope.row.lkId, scope.row)"
                                       title="查看详情">
                            </el-button>
                            <router-link
                                    :to="{path:'/luckDrawEdit',query:{id:scope.row.lkId}}"
                                    active-class="active" style="margin-right: 10px;margin-left: 10px">
                                <el-button size="small" type="warning"
                                           icon="el-icon-edit" title="修改">
                                </el-button>
                            </router-link>
                            <el-button size="small" type="danger" style="margin-right: 10px;"
                                       @click="luckDrawDelete(scope.row.lkId, scope.row)"
                                       icon="el-icon-delete" title="删除">
                            </el-button>
                            <!--<router-link to="/luckyGroupManage" active-class="active" style="margin-right: 10px">-->
                                <!--<el-button type="primary" size="small">抽奖详情</el-button>-->
                            <!--</router-link>-->
                            <router-link :to="{path:'/winningUsers',
                            query:{id:scope.row.lkId}}"
                                         active-class="active" style="margin-right: 10px">
                                <el-button
                                           style="padding: 9.5px 15px;background-color: #70c267;border: 0;color: white"
                                           icon="el-icon-trophy" title="查看中奖用户"></el-button>
                            </router-link>
                            <el-button type="info" size="small"
                                       icon="el-icon-coordinate" title="随机抽奖"
                                        @click="luckRodom(scope.row.lkId)"
                            ></el-button>
                            <router-link
                                         :to="{path:'/InternalDeter',
                            query:{id:scope.row.lkId}}"
                                         active-class="active" style="margin-left: 10px">
                                <el-button type="primary" size="small"
                                           icon="el-icon-thumb" title="内定抽奖"></el-button>
                            </router-link>
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
                        :page-sizes="[3, 5, 8]"
                        :page-size="3"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import myArr from "./myArr"
  export default {
    name: "luckDrawMainOne",
    components:{
      myArr:myArr
    },
    data() {
      return {
        // 初始化数据总条数：200
        total:200,
        // 初始化页码
        currentPage: 1,
        // 初始化每页大小
        pageSize:3,
        // 所有数据信息
        tableData:[],
        // tableData: [
        //   {
        //     lkId: '1',
        //     shouYe:0,
        //     proName: '测试商品名称',
        //     luckDrawActiveTime: '2019-12-24 09:00:00 2019-12-24 09:00:00',
        //     luckDrawNum:'20',
        //     luckDrawState:'进行中'
        //   },
        //   {
        //     luckDrawId: '2',
        //     goodName: '测试商品名称',
        //     shouYe:0,
        //     luckDrawActiveTime: '2019-12-24 09:00:00 2019-12-24 09:00:00',
        //     luckDrawNum:'20',
        //     luckDrawState:'进行中'
        //   },
        //   {
        //         luckDrawId: '3',
        //     shouYe:1,
        //     goodName: '测试商品名称',
        //     luckDrawActiveTime: '2019-12-24 09:00:00 2019-12-24 09:00:00',
        //     luckDrawNum:'20',
        //     luckDrawState:'进行中'
        //   },
        // ],
        multipleSelection: [],
        searchArr:[],
        totalNumber:[],
      }
    },
    // 载入时==获得所有数据和数据总条数
    created() {
      this.$axios({
        url:this.$host+"/groupmall/setting/LuckInfo/getNewLuckActs",
        method:'get',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{
          page:this.$data.currentPage,
          limit:this.$data.pageSize,
        }
      }).then(resp=>{
        this.$data.tableData=resp.data.data;
        this.$data.total=resp.data.count;
      });
    },
    methods: {
      // 随机抽奖
      luckRodom(index){
        // console.log(index);
        this.$axios({
          url:this.$host+"/groupmall/setting/LuckInfo/LuckDog",
          method:'put',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            luckId:index,
          }
        }).then(resp=>{
          console.log(resp.data);
          if(resp.data=='"status":true'){
            this.$alert('随机抽奖处理成功!', '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }else{
            this.$alert('随机抽奖处理失败!', '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }
        });

      },
      // 切换Switch开关
      changeSwitch(data){
        // console.log(data.lkIndex)
        // console.log(data.lkId)
        this.$axios({
          url:this.$host+"/groupmall/setting/LuckInfo/updateLkIndex",
          method:'get',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            luckId:data.lkId,
            lkIndex:data.lkIndex,
          }
        }).then(resp=>{
          if(resp.data=='"status":true'){
            this.$alert('首页推荐处理成功!', '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }else{
            this.$alert('首页推荐处理失败!', '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }
          // console.log(resp.data);//"status":true

          // this.$data.tableData=resp.data.data;
          // this.$data.total=resp.data.count;
        });

      },
      // 删除抽奖
      luckDrawDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(this.$host+"/groupmall/setting/LuckInfo?luckId="+index)
          // this.$axios.post("http://172.16.14.132:80/power/",JSON.stringify({
          //   coupID:index,
          //   currPage:this.$data.currentPage,
          //   pageSize:this.$data.pageSize,
          // }))
            .then(resp=>{

              // this.$router.go(0)

              this.$axios({
                url:this.$host+"/groupmall/setting/LuckInfo/getNewLuckActs",
                method:'get',
                headers:{"Content-Type":"application/x-www-form-urlendcoded"},
                access_token:this.token,
                params:{
                  page:this.$data.currentPage,
                  limit:this.$data.pageSize,
                }
              }).then(resp=>{
                this.$data.tableData=resp.data.data;
                this.$data.total=resp.data.count;
              });
              // console.log(resp.data);
              // console.log("删除抽奖")
            })
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },
      // 查看抽奖
      luckDrawView(index,row){
        // console.log(index)
        this.$data.searchArr=[];
        for(var i=0;i<this.$data.tableData.length;i++){
          if(this.$data.tableData[i].lkId==index){
            this.$data.searchArr.push(this.$data.tableData[i]);
            break;
          }
        }
        // console.log(this.$data.searchArr[0])
        sessionStorage.setItem("searchArr",JSON.stringify(this.$data.searchArr[0]));
        const h = this.$createElement;
        this.$msgbox({
          title: '详情',
          message: h('myArr', { id: 'teal'}, [
          ]),
          showCancelButton: true,
          showConfirmButton:false,
          // confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'cancel') {
              // console.log("cancel");
              // sessionStorage.setItem("searchArr","");
              // console.log(sessionStorage.getItem("searchArr"))
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 0);
              }, 0);
            } else {
              done();
            }
          }
        }).then(

        ).catch(cancel => {
          // console.log(cancel)
        });
      },
      // 改变每页显示的数据条数
      handleSizeChange(val) {
        this.$data.pageSize=val;
        this.$axios({
          url:this.$host+"/groupmall/setting/LuckInfo/getNewLuckActs",
          method:'get',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            page:this.$data.currentPage,
            // page:1,
            limit:this.$data.pageSize,
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
          url:this.$host+"/groupmall/setting/LuckInfo/getNewLuckActs",
          method:'get',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
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
          this.$data.totalNumber.push(this.multipleSelection[i].lkId)
        }
        var sessionArr=[this.$data.totalNumber,this.$data.currentPage,this.$data.pageSize];
        this.$emit("luckClickEvent",sessionArr);
      }
    }
  };
</script>

<style scoped>
    .paging{
        text-align: center;
        margin-top: 10px;
    }
</style>
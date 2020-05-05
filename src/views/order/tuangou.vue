<template>
    <div style="margin-top: 10px;margin-bottom: 5px">
        <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">
                    <span style="font-size: 14px;color: #626066">
                        订单编号:
                    </span>&nbsp;
                <el-input placeholder="请输入订单编号" size="small" v-model="input" style="width: 55%"></el-input></div></el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
<span style="font-size: 14px;color: #626066">
                        团购状态:
                    </span>

                    <el-select v-model="value" placeholder="请选择"   size="small"    style="width: 62%">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
                <el-button type="success" size="small" @click="shousuo">搜索</el-button></div></el-col>
        </el-row>
        <el-table
                ref=""
                :data="tableData"
                style="width: 100%"
                @selection-change="">
            <el-table-column
                    prop="groupId"
                    label="团购编号"
                    show-overflow-tooltip
                    width="120">
            </el-table-column>
            <el-table-column
                    property="groupMaster"
                    label="团购商品"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="groupMaster"
                    label="团长"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    property="address"
                    label="团购人数"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    property="address"
                    label="还差人数"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    property="address"
                    label="拼团时间"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    property="address"
                    label="团购状态"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    property=""
                    label="操作"
                    show-overflow-tooltip>
                <template slot-scope="scope"> <el-button type="success" size="small" icon="el-icon-view" title="查看"  @click="tuangouxiangqing(scope)"></el-button></template>
            </el-table-column>
        </el-table>
        <el-row style="text-align: center;margin-top: 10px">
            <el-col :span="24"><div class="grid-content bg-purple-light">
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage4"
                            :page-sizes="[3,5,8]"
                            :page-size="3"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalchangdu">
                    </el-pagination>
                </div>
            </div></el-col>
        </el-row>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        options: [
          {
            value: 'null',
            label: '全部'
          },
          {
            value: '1',
            label: '待付款'
          }, {
            value: '2',
            label: '拼团中'
          }, {
            value: '3',
            label: '拼团成功'
          }, {
            value: '4',
            label: '拼团失败(待退款)'
          },
          {
            value: '5',
            label: '拼团失败(已退款)'
          },
        ],
        value: '',
        checked: true,
        tableData: [],
        input:"",
        totalchangdu:"",
        fenye:"3",
        nowPage:"1"
      };

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      tuangouxiangqing(a){
        console.log(a.row.groupId)
        // this.$router.push("/tuangouxiangqing")
        this.$router.push({path:"/tuangouxiangqing",query:{orderId:a.row.groupId}});
      },
      handleSizeChange(val) {
        // console.log(`${val} items per page`);
        this.fenye=val
        console.log(this.fenye)
        console.log(this.nowPage)
        this.$axios.post(this.$host+'/groupmall/power/order/selectGroupList',JSON.stringify({page: (this.nowPage-1)*this.fenye,limit:this.fenye,groupId:null,groupState:null})).then((resp)=>{
          // console.log(resp.data.count)
          // this.totalchangdu=resp.data.count
          this.tableData=resp.data.data
          // console.log(this.tableData)
          // this.totalchangdu=this.tableData.length
        })
      },
      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.nowPage=val;
        this.$axios.post(this.$host+'/groupmall/power/order/selectGroupList',JSON.stringify({page: (this.nowPage-1)*this.fenye,limit:this.fenye,groupId:null,groupState:null})).then((resp)=>{
          // console.log(resp.data.count)
          // this.totalchangdu=resp.data.count
          this.tableData=resp.data.data
          // console.log(this.tableData)
          // this.totalchangdu=this.tableData.length
        })
      },
      shousuo(){
        console.log(this.input)
        console.log(this.value)
        if(this.input==""){
          this.input=null
        }
        this.$axios.post(this.$host+'/groupmall/power/order/selectGroupList',JSON.stringify({page:(this.nowPage-1)*this.fenye,limit:this.fenye,groupId:this.input,groupState:null})).then((resp)=>{
          // console.log(resp.data)
          this.tableData=resp.data.data
          if(this.input==null&&this.value==null){
            this.totalchangdu=resp.data.count
          }
          else {
            this.totalchangdu=this.tableData.length
          }

          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].groupState==1){
              this.tableData[i].groupState="待付款"
            }
            if(this.tableData[i].groupState==2){
              this.tableData[i].groupState="拼团中"
            }
            if(this.tableData[i].groupState==3){
              this.tableData[i].groupState="拼团成功"
            }
            if(this.tableData[i].groupState==4){
              this.tableData[i].groupState="拼团失败(待退款)"
            }
            if(this.tableData[i].groupState==5){
              this.tableData[i].groupState="拼团失败(已退款)"
            }
          }
          // console.log(this.tableData)
          // this.totalchangdu=this.tableData.length
        })
      }
    },
    created(){
      this.$axios.post(this.$host+'/groupmall/power/order/selectGroupList',JSON.stringify({page:0,limit:3,groupId:null,groupState:null})).then((resp)=>{
        console.log(resp.data.count)
        this.totalchangdu=resp.data.count
        this.tableData=resp.data.data
        for(var i=0;i<this.tableData.length;i++){
          if(this.tableData[i].groupState==1){
            this.tableData[i].groupState="待付款"
          }
          if(this.tableData[i].groupState==2){
            this.tableData[i].groupState="拼团中"
          }
          if(this.tableData[i].groupState==3){
            this.tableData[i].groupState="拼团成功"
          }
          if(this.tableData[i].groupState==4){
            this.tableData[i].groupState="拼团失败(待退款)"
          }
          if(this.tableData[i].groupState==5){
            this.tableData[i].groupState="拼团失败(已退款)"
          }
        }
        console.log(this.tableData)
        // this.totalchangdu=this.tableData.length
      })
    }
  };
</script>

<style scoped>
    thead el-table-column--selection cell{
        display: none;
    }
</style>
<template>
    <div>
        <el-row style="margin-top: 10px;margin-bottom: 5px">
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <el-col :span="10"><div class="grid-content bg-purple">
                    <el-button type="warning" icon="el-icon-c-scale-to-original"  @click="fahuo">批量发货</el-button>
                    <el-button type="primary" icon="el-icon-bottom" @click="daochu">导出订单</el-button>
                </div>
                </el-col>
            </div>
            </el-col>
        </el-row>
        <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%;padding-left: 1%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    >
            </el-table-column>
            <el-table-column
                    label="订单号"
                    show-overflow-tooltip
                    prop="orderId">
            </el-table-column>
            <el-table-column
                    property="receiveName"
                    label="收货人"
                    >
            </el-table-column>
            <el-table-column
                    property="receivePhone"
                    label="手机"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    property=""
                    label="配送方式"
                    show-overflow-tooltip>
                <template style="width: 120px" slot-scope="scope">
                    <el-select v-model="scope.row.value" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    property=""
                    label="快递单号"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.input" placeholder="请输入内容" size="small"></el-input>
                </template>
            </el-table-column>
            <!--<el-table-column-->
                    <!--property=""-->
                    <!--label=""-->
                    <!--show-overflow-tooltip>-->
            <!--</el-table-column>-->
        </el-table>
        <el-row style="text-align: center;margin-top: 10px">
            <el-col :span="24"><div class="grid-content bg-purple-light">
                <!--<div class="block">-->
                <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page.sync="currentPage4"-->
                <!--:page-sizes="[3,6,9]"-->
                <!--:page-size="10"-->
                <!--layout="total, sizes, prev, pager, next, jumper"-->
                <!--:total="sumPage">-->
                <!--</el-pagination>-->
                <!--</div>-->
            </div></el-col>
        </el-row>
        <!--<el-dialog-->
                <!--title="提示"-->
                <!--:visible.sync="dialogVisible"-->
                <!--width="30%"-->
                <!--:before-close="handleClose">-->
            <!--<span>{{daochuzhuangtai}}</span>-->
            <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="fahuochenggong">确 定</el-button>-->
  <!--</span>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
  export default {
    name: "piliangfahuo",
    data(){
      return{
        tableData:[{
          orderId:"23",
          username:"aaa",
          callNum:"123",
          input:"",
          value:""
        },
          {
            orderId:"33",
            username:"bbb",
            callNum:"456",
            input:"",
            value:""
          }],
        options: [{
          value: '选项1',
          label: '顺丰'
        }, {
          value: '选项2',
          label: '申通'
        }, {
          value: '选项3',
          label: '天天'
        }, {
          value: '选项4',
          label: '圆通'
        }],
        value:"",
        input:"",
        dialogVisible:"",
        daochuzhuangtai:"",
        shibie:0,
        nowPage:"",
        fenye:"",
        sumPage:""
      }
    },
    methods:{
      fahuo(){
        // console.log(this.$refs.multipleTable.selection)

        if(this.$refs.multipleTable.selection.length>0){
          // this.daochuzhuangtai="发货成功"

          // console.log(this.$refs.multipleTable)
          if(this.$refs.multipleTable.selection.length>0){
            this.$axios.post(this.$host+'/groupmall/power/order/doAllSend',JSON.stringify({shuzu:this.$refs.multipleTable.store.states.selection})).then((resp)=>{
              // console.log(resp.data.data.dataList)
              // this.tableData=resp.data.data.dataList
            })
          }
          this.$alert('发货成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$axios.post(this.$host+'/groupmall/power/order/selectAllSend',JSON.stringify({})).then((resp)=>{
                // console.log(resp.data.count)
                this.sumPage=resp.data.count
                this.tableData=resp.data.data.dataList
              })
              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
            }
          });

        }
        else {
          // this.daochuzhuangtai="选择不能为空!"
          this.$alert('选择不能为空！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
            }
          });
        }
        // this.dialogVisible=true
      },
      fahuochenggong(){
        this.dialogVisible=false
        console.log(this.$refs.multipleTable)
        if(this.$refs.multipleTable.selection.length>0){
          this.$axios.post(this.$host+'/groupmall/power/order/doAllSend',JSON.stringify({shuzu:this.$refs.multipleTable.store.states.selection})).then((resp)=>{
            // console.log(resp.data.data.dataList)
            // this.tableData=resp.data.data.dataList
          })
        }
      },
      daochu(){
        if(this.$refs.multipleTable.selection.length>0){
          // this.daochuzhuangtai="导出成功"
          this.$alert('导出成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
            }
          });
        }
        else {
          // this.daochuzhuangtai="导出不能为空!"
          this.$alert('导出不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {

              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
            }
          });
        }
        // this.dialogVisible=true
      },
      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.fenye=val
        // this.$axios.post('http://172.16.14.41:8080/groupmall/power/order/selectAllSend',JSON.stringify({})).then((resp)=>{
        //   console.log(resp)
        //   this.tableData=resp.data.data.dataList
        // })
      },
      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.nowPage=val
        this.$axios.post(this.$host+'/groupmall/power/order/selectAllSend',JSON.stringify({})).then((resp)=>{
          console.log(resp.data.data.dataList)
          this.sumPage=resp.data.count
          this.tableData=resp.data.data.dataList
        })
      }
      // console.log(this.$refs.multipleTable.store.states.selection)
      // this.$axios.post('http://172.16.14.41:8080/groupmall/power/order/doAllSend',JSON.stringify({shuzu:this.$refs.multipleTable.store.states.selection})).then((resp)=>{
      //   // console.log(resp.data.data.dataList)
      //   // this.tableData=resp.data.data.dataList
      // })
    },
    created(){
      this.dialogVisible=false
      this.$axios.post(this.$host+'/groupmall/power/order/selectAllSend',JSON.stringify({})).then((resp)=>{
        console.log(resp.data.count)
        console.log(resp.data.data.dataList)
        this.sumPage=resp.data.count
        this.tableData=resp.data.data.dataList
      })
    }
  };
</script>

<style scoped>

</style>
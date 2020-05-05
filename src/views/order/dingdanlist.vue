<template>
    <div>
        <div class="grid-content bg-purple-dark">
            <div class="grid-content bg-purple" style="width: 100%;margin-top: 10px">
                <el-button type="primary" icon="el-icon-bottom" @click="daochupanduan">导出</el-button>
                <el-button type="info" icon="el-icon-document" @click="dayingdingdan">打印订单</el-button>
            </div>
            <div style="margin-top: 10px;margin-bottom: 5px">
                <el-row>
                    <el-col style="float: left;width: 250px">
                        <div class="grid-content bg-purple" style="margin-right: 10px;margin-top: 5px">
                            <span style="font-size: 14px;color: #606266">订单号:&nbsp;&nbsp;</span>
                            <!--<el-input placeholder="请输入订单号" size="small"-->
                            <!--v-model="input" style="width: 150px" @input.native="changeInput"></el-input>-->
                            <el-input
                                    @change="changeStatus"
                                    @input.native="changeInput"
                                    style="width: 150px"
                                    size="small"
                                    placeholder="请输入订单号"
                                    v-model="input"
                                    clearable>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col style="float: left;width: 250px">
                        <div class="grid-content bg-purple-light">
                            <span style="font-size: 14px;color: #606266">下单人:&nbsp;&nbsp;</span>
                            <el-input placeholder="请输入下单人" v-model="input1"
                                      @change="changeStatus1"
                                      size="small"
                                      style="width: 150px"
                                      clearable=""
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col style="float: left;width: 200px">
                        <div class="grid-content bg-purple">
                            <span style="font-size: 14px;color: #606266">订单状态:&nbsp;&nbsp;</span>
                            <el-select v-model="value" placeholder="请选择"
                                       size="small"
                                       style="width:120px">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            <el-button type="success" size="small" style="margin-left: 30px" @click="dingdanchaxun">搜索</el-button>
                        </div>
                    </el-col>
                </el-row>

            </div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%;margin-top: 10px"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="订单号"
                        width="120"
                        show-overflow-tooltip
                        property="orderId"
                >
                </el-table-column>
                <el-table-column
                        property="username"
                        label="下单人"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        property="callNum"
                        label="手机"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        property="address"
                        label="取货门店"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        property="bestState"
                        label="订单状态"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        property=""
                        label="操作"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button type="success" @click="dianji(scope)" size="small" title="查看" icon="el-icon-view"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="text-align: center;margin-top: 10px">
                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <div class="block">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage4"
                                    :page-sizes="[3,6,8]"
                                    :page-size="10"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="sumcount">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>

        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>{{daochuzhuangtai}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: "first",
        options: [
          {
            value: null,
            label: "全部"
          },
          {
            value: "1",
            label: "待付款"
          }, {
            value: "2",
            label: "待核销"
          }, {
            value: "3",
            label: "待发货"
          }, {
            value: "4",
            label: "待收货"
          },
          {
            value: "5",
            label: "待评价"
          },
          {
            value: "6",
            label: "退款成功"
          },
          {
            value: "7",
            label: "交易成功"
          }
        ],
        value: null,
        checked: true,
        tableData: [

        ],
        input: "",
        input1:"",
        nowPage:"1",
        testarr:[],
        shoparr:[],
        multipleSelection: [],
        getId:"",
        dialogVisible: false,
        daochuzhuangtai:"",
        fenye:"3",
        sumcount:"",
        qingkong:0,
        qingkong1:0
      };
    },
    created(){
      this.$axios.post(this.$host+'/groupmall/power/order/selectOfList',
        JSON.stringify({page:0,limit:3,orderId:null,username:null,bestState:null})).then((resp)=>{
        console.log(resp.data.count)
        console.log(resp.data)
        this.tableData=resp.data.data;
        this.sumcount=resp.data.count
        for(var i=0;i<this.tableData.length;i++){
          if(this.tableData[i].bestState==1){
            this.tableData[i].bestState="待付款"
          }
          if(this.tableData[i].bestState==2){
            this.tableData[i].bestState="待核销"
          }
          if(this.tableData[i].bestState==3){
            this.tableData[i].bestState="待发货"
          }
          if(this.tableData[i].bestState==4){
            this.tableData[i].bestState="待收货"
          }
          if(this.tableData[i].bestState==5){
            this.tableData[i].bestState="待评价"
          }
          if(this.tableData[i].bestState==6){
            this.tableData[i].bestState="退款成功"
          }
          if(this.tableData[i].bestState==7){
            this.tableData[i].bestState="交易成功"
          }
        }
        console.log(this.tableData)

      })
      // this.$axios.get('http://172.16.14.41:8080/groupmall/power/order/selectOfList',{params:{page:1,limit:10,orderId:null,username:null,bestState:null}})
      //   .then((resp)=> {
      //     console.log("请求成功之后的回调函数");
      //     console.log(resp);
      //     // this.tableData=resp.data;
      //     // console.log( this.tableData);
      //   })
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      dianji(c) {
        console.log(c.row.orderId)
        this.getId=c.row.orderId
        console.log(typeof this.getId)
        this.$router.push({path:"/dingdanxiangqing",query:{orderId:this.getId}});
        // this.$axios.get('http://172.16.14.41:8080/groupmall/power/order/selectOfListDetail',{params:{id:this.getId}})
        //   .then((resp)=> {
        //     console.log("请求成功之后的回调函数");
        //     console.log(resp);
        //     // this.tableData=resp.data;
        //     // console.log( this.tableData);
        //   })
        console.log(this.$refs.multipleTable.store.states.selection)
      },
      aaa(e){
        console.log(e.row.date)
      },
      arrtest(a){
        var newarr=[]
        for(var i=0;i<this.shoparr.length;i++){
          if(a.row.orderId==this.shoparr[i].orderId){
            newarr.push({orderId:this.shoparr[i].orderId,proImg:this.shoparr[i].proImg,proName:this.shoparr[i].proName,price:this.shoparr[i].price,count:this.shoparr[i].count})
          }
        }
        console.log(this.$refs.multipleTable.selection)
        return newarr
      },
      handleSizeChange(val) {
        this.fenye=val
        if(this.input==''){
          this.input=null
        }
        if(this.input1==null){
          this.input1=null
        }
        console.log(`${val} items per page`);
        console.log(this.nowPage)
        this.$axios.post(this.$host+'/groupmall/power/order/selectOfList',JSON.stringify({page:(this.nowPage-1)*this.fenye,limit:this.fenye,orderId:this.input,username:this.input1,bestState:this.value})).then((resp)=>{
          console.log(resp.data.data)
          this.tableData=resp.data.data
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].bestState==1){
              this.tableData[i].bestState="待付款"
            }
            if(this.tableData[i].bestState==2){
              this.tableData[i].bestState="待核销"
            }
            if(this.tableData[i].bestState==3){
              this.tableData[i].bestState="待发货"
            }
            if(this.tableData[i].bestState==4){
              this.tableData[i].bestState="待收货"
            }
            if(this.tableData[i].bestState==5){
              this.tableData[i].bestState="待评价"
            }
            if(this.tableData[i].bestState==6){
              this.tableData[i].bestState="退款成功"
            }
            if(this.tableData[i].bestState==7){
              this.tableData[i].bestState="交易成功"
            }
          }
        })
      },
      handleCurrentChange(val) {
        console.log(val);
        if(this.input==''){
          this.input=null
        }
        if(this.input1==null){
          this.input1=null
        }
        this.$axios.post(this.$host+'/groupmall/power/order/selectOfList',JSON.stringify({page:(val-1)*this.fenye,limit:this.fenye,orderId:this.input,username:this.input1,bestState:this.value})).then((resp)=>{
          console.log(resp.data.data)
          this.tableData=resp.data.data
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].bestState==1){
              this.tableData[i].bestState="待付款"
            }
            if(this.tableData[i].bestState==2){
              this.tableData[i].bestState="待核销"
            }
            if(this.tableData[i].bestState==3){
              this.tableData[i].bestState="待发货"
            }
            if(this.tableData[i].bestState==4){
              this.tableData[i].bestState="待收货"
            }
            if(this.tableData[i].bestState==5){
              this.tableData[i].bestState="待评价"
            }
            if(this.tableData[i].bestState==6){
              this.tableData[i].bestState="退款成功"
            }
            if(this.tableData[i].bestState==7){
              this.tableData[i].bestState="交易成功"
            }
          }
        })
        this.nowPage=val;
      },
      daochupanduan(){
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
          this.$alert('导出选项不能为空!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
            }
          });
          // this.daochuzhuangtai="导出选项不能为空!"
        }
        this.dialogVisible=false
      },
      changeInput() {
        this.$nextTick(() => {
          console.log(this.input)
        })
      },
      dingdanchaxun(){
        // console.log(this.input)
        // console.log(this.input1)
        // console.log(this.value)
        if(this.input==""){
          this.input=null
        }
        if(this.input1==""){
          this.input1=null
        }
        // if(this.bestState==""){
        //   this.bestState="null"
        // }
        // console.log(this.input)
        // console.log(this.input1)
        // console.log(this.value)
        this.$axios.post(this.$host+'/groupmall/power/order/selectOfList',JSON.stringify({page:(this.nowPage-1)*this.fenye,limit:this.fenye,orderId:this.input,bestState:this.value,username:this.input1})).then((resp)=>{
          console.log(resp.data.count)
          if(this.input==null&&this.input1==null&&this.value==null){
            this.sumcount=resp.data.count
          }
          else {
            this.$axios.post(this.$host+'/groupmall/power/order/selectOfList',JSON.stringify({page:0,limit:100,orderId:this.input,username:this.input1,bestState:this.value})).then((resp)=> {
              console.log(resp.data.data.length)
              this.sumcount = resp.data.data.length

              console.log(11111)
            })
            // this.sumcount = resp.data.data.length
          }
          this.tableData=resp.data.data;
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].bestState==1){
              this.tableData[i].bestState="待付款"
            }
            if(this.tableData[i].bestState==2){
              this.tableData[i].bestState="待核销"
            }
            if(this.tableData[i].bestState==3){
              this.tableData[i].bestState="待发货"
            }
            if(this.tableData[i].bestState==4){
              this.tableData[i].bestState="待收货"
            }
            if(this.tableData[i].bestState==5){
              this.tableData[i].bestState="待评价"
            }
            if(this.tableData[i].bestState==6){
              this.tableData[i].bestState="退款成功"
            }
            if(this.tableData[i].bestState==7){
              this.tableData[i].bestState="交易成功"
            }
          }
        })
        console.log(this.value)
      },
      changeStatus(){
        this.qingkong=1;
        if(this.qingkong==1){
          this.$axios.post(this.$host+'/groupmall/power/order/selectOfList',JSON.stringify({page:(this.nowPage-1)*this.fenye,limit:this.fenye,orderId:null,username:null,bestState:null})).then((resp)=>{
            console.log(resp.data.count)
            this.tableData=resp.data.data;
            this.sumcount=resp.data.count
            for(var i=0;i<this.tableData.length;i++){
              if(this.tableData[i].bestState==1){
                this.tableData[i].bestState="待付款"
              }
              if(this.tableData[i].bestState==2){
                this.tableData[i].bestState="待核销"
              }
              if(this.tableData[i].bestState==3){
                this.tableData[i].bestState="待发货"
              }
              if(this.tableData[i].bestState==4){
                this.tableData[i].bestState="待收货"
              }
              if(this.tableData[i].bestState==5){
                this.tableData[i].bestState="待评价"
              }
              if(this.tableData[i].bestState==6){
                this.tableData[i].bestState="退款成功"
              }
              if(this.tableData[i].bestState==7){
                this.tableData[i].bestState="交易成功"
              }
            }
            console.log(this.tableData)

          })
        }
      },
      dayingdingdan(){
        if(this.$refs.multipleTable.selection.length>0){
          // this.daochuzhuangtai="打印订单成功"
          this.$alert('打印订单成功', '提示', {
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
          this.$alert('打印不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
            }
          });

          // this.daochuzhuangtai="打印不能为空!"
        }
        this.dialogVisible=false
      },
      changeStatus1(){
        this.qingkong1=111
        if(this.qingkong1==111){
          this.$axios.post(this.$host+'/groupmall/power/order/selectOfList',JSON.stringify({page:0,limit:3,orderId:null,username:null,bestState:null})).then((resp)=>{
            console.log(resp.data.count)
            this.tableData=resp.data.data;
            this.sumcount=resp.data.count
            for(var i=0;i<this.tableData.length;i++){
              if(this.tableData[i].bestState==1){
                this.tableData[i].bestState="待付款"
              }
              if(this.tableData[i].bestState==2){
                this.tableData[i].bestState="待核销"
              }
              if(this.tableData[i].bestState==3){
                this.tableData[i].bestState="待发货"
              }
              if(this.tableData[i].bestState==4){
                this.tableData[i].bestState="待收货"
              }
              if(this.tableData[i].bestState==5){
                this.tableData[i].bestState="待评价"
              }
              if(this.tableData[i].bestState==6){
                this.tableData[i].bestState="退款成功"
              }
              if(this.tableData[i].bestState==7){
                this.tableData[i].bestState="交易成功"
              }
            }
            console.log(this.tableData)

          })
        }
      }
    },
  };
</script>

<style scoped>
    el-table__expanded-cell {
        padding-top: 5px;
    }
</style>
<template>
    <div style="color: #606266">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left: 1%">
            <el-row>
                <el-col :span="6"><div class="grid-content bg-purple" style="font-size: 14px">发货单流水号:&nbsp;&nbsp;
                    <el-input placeholder="请输入发货单" v-model="input3" style="width: 50%" size="small"></el-input>
                </div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple-light" style="font-size: 14px">订单号:&nbsp;&nbsp;
                    <el-input placeholder="请输入订单号" v-model="input1" style="width: 60%" size="small"></el-input></div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple" style="font-size: 14px">收货人:&nbsp;&nbsp;
                    <el-input placeholder="请输入收货人" v-model="input2" style="width: 60%" size="small"></el-input></div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple-light" style="font-size: 14px">
                    发货状态:
                    <el-select v-model="value" placeholder="全部" style="width: 50%" size="small">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">
                    <el-button type="success" @click="chaxun" size="small">搜索</el-button>
                </div></el-col>
            </el-row>
            <el-table
                    ref=""
                    :data="tableData"
                    style="width: 100%"
                    @selection-change="">
                <el-table-column show-overflow-tooltip
                                 property="sendId"
                        label="发货流水号"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="orderId"
                        label="订单号"
                        show-overflow-tooltip
                        width="120">
                </el-table-column>
                <el-table-column
                        property="receiveName"
                        label="收货人"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        property="sendTime"
                        label="发货时间"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        property="bestState"
                        label="发货状态"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        property=""
                        label="操作"
                        show-overflow-tooltip>
                    <!--<span @click="fahuodanxiangqing">-->
                    <template slot-scope="scope">
                        <el-button type="success" size="small" icon="el-icon-view" title="查看" @click="fahuodanxiangqing(scope)">
                        </el-button>
                    </template>
                    <!--</span>-->
                </el-table-column>
            </el-table>
            <el-row style="text-align: center;margin-top: 10px">
                <el-col :span="24"><div class="grid-content bg-purple-light">
                    <div class="block">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage4"
                                :page-sizes="[3,6,9]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="fenye">
                        </el-pagination>
                    </div>
                </div></el-col>
            </el-row>
        </el-tabs>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        options: [
          {
            value: null,
            label: '全部'
          },
          {
            value: '3',
            label: '正常'
          },
          {
            value: '4',
            label: '已发货'
          }
        ],
        value: "",
        checked: true,
        tableData: [],
        input:"",
        input1:"",
        input2:"",
        getId:"",
        fenye:"",
        nowPage:1,
        currentPage:3,
        input3:""
      };

    },
    methods: {
      handleClick(tab) {
        console.log(tab);
      },
      fahuodanxiangqing(c){
        console.log(c.row.orderId)
        this.getId=c.row.orderId
        console.log(this.getId)
        // this.$axios.get('http://172.16.14.41:8080/groupmall/power/order/selectSendListDetail',{params:{id:1}})
        //   .then((resp)=> {
        //     console.log("请求成功之后的回调函数");
        //     console.log(resp);
        //     // this.tableData=resp.data;
        //     // console.log( this.tableData);
        //   })
        // this.$router.push("/fahuodanxiangqing")
        this.$router.push({path:"/fahuodanxiangqing",query:{orderId:this.getId,zhuangtai:c.row.bestState}});
      },
      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.currentPage=val
        this.$axios.post(this.$host+'/groupmall/power/order/selectSendList',JSON.stringify({page:(this.nowPage-1)*this.currentPage,limit:this.currentPage,sendId:null,orderId:null,receiveName:null,bestState:null})).then((resp)=>{
          console.log(resp.data.count)
          this.fenye=resp.data.count
          this.tableData=resp.data.data
          console.log(this.tableData)
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].bestState=="1"||this.tableData[i].bestState=="2"||this.tableData[i].bestState=="3"||this.tableData[i].bestState=="8"){
              this.tableData[i].bestState="正常"
            }
            else {
              this.tableData[i].bestState="已发货"
            }
          }
        })
      },
      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.nowPage=val
        this.$axios.post(this.$host+'/groupmall/power/order/selectSendList',JSON.stringify({page:(this.nowPage-1)*this.currentPage,limit:this.currentPage,sendId:null,orderId:null,receiveName:null,bestState:null})).then((resp)=>{
          console.log(resp.data.count)
          this.fenye=resp.data.count
          this.tableData=resp.data.data
          console.log(this.tableData)
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].bestState=="1"||this.tableData[i].bestState=="2"||this.tableData[i].bestState=="3"||this.tableData[i].bestState=="8"){
              this.tableData[i].bestState="正常"
            }
            else {
              this.tableData[i].bestState="已发货"
            }
          }
        })
      },
      chaxun(){
        // console.log(this.value)
        if(this.input3==""){
          this.input3=null
        }
        if(this.input1==""){
          this.input1=null
        }
        if(this.input2==""){
          this.input2=null
        }
        console.log(this.input3)
        console.log(this.input1)
        console.log(this.input2)

        console.log(this.value)
        console.log(this.nowPage)
        console.log(this.currentPage)
        this.$axios.post(this.$host+'/groupmall/power/order/selectSendList ',JSON.stringify({page:(this.nowPage-1)*this.currentPage,limit:this.currentPage,sendId:this.input3,orderId:this.input1,receiveName:this.input2,bestState:this.value})).then((resp)=>{
          console.log(resp.data.count)
          if(this.input1==null&&this.input2==null&&this.input3==null&&this.value==null){
            this.fenye= resp.data.count
          }
          else {
            this.fenye=resp.data.data.length
          }
          this.tableData=resp.data.data
          console.log(this.tableData)
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].bestState=="1"||this.tableData[i].bestState=="2"||this.tableData[i].bestState=="3"||this.tableData[i].bestState=="8"){
              this.tableData[i].bestState="正常"
            }
            else {
              this.tableData[i].bestState="已发货"
            }
          }
        })
      }
    },
    created(){
      this.value=null,
        //   this.input=null
        // this.input1=null
        // this.input2=null

        this.$axios.post(this.$host+'/groupmall/power/order/selectSendList',JSON.stringify({page:0,limit:3,sendId:null,orderId:null,receiveName:null,bestState:null})).then((resp)=>{
          console.log(resp.data)
          this.fenye=resp.data.count
          this.tableData=resp.data.data
          console.log(this.tableData)
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].bestState=="1"||this.tableData[i].bestState=="2"||this.tableData[i].bestState=="3"||this.tableData[i].bestState=="8"){
              this.tableData[i].bestState="正常"
            }
            else {
              this.tableData[i].bestState="已发货"
            }
          }
        })
    }
  };
</script>

<style scoped>
    thead el-table-column--selection cell{
        display: none;
    }
</style>
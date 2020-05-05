<template>
    <div style="color: #606266;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">团购信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="wenzi-size">
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">团购编号：{{groupId}}</div></el-col>
        </el-row>
        <el-row class="wenzi-size">
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">团购状态：{{groupState}}</div></el-col>
        </el-row>
        <el-row class="wenzi-size">
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">团长：{{groupMaster}}</div></el-col>
        </el-row>
        <el-row class="wenzi-size">
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">开团时间：{{startTime}}</div></el-col>
        </el-row>
        <el-row class="wenzi-size">
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">结束时间：{{endTime}}</div></el-col>
        </el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">商品信息
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="wenzi-size">
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">商品名称：{{proName}}</div></el-col>
        </el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">参团信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="用户名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="joinTime"
                    label="参团时间">
            </el-table-column>
            <el-table-column
                    prop="orderId"
                    label="订单号码">
            </el-table-column>
            <el-table-column
                    prop="bestState"
                    label="订单状态">
            </el-table-column>
        </el-table>

        <el-row style="padding-top: 2%;padding-left: 2%;text-align: center">
            <el-col :span="24"><div class="grid-content bg-purple-dark"><el-button type="primary"  @click="fanhui">返回</el-button></div></el-col>
        </el-row>

    </div>
</template>




<script>
  export default {
    name: "dingdanxiangqing",
    data(){
      return{
        groupId:""  ,
        tableData:[],
        groupState:"",
        groupMaster:"",
        startTime:"",
        endTime:"",
        proName:"",
        username:""
      }
    },
    methods:{
      tuikuan(){
        this.$router.push("/dingdantuikuan")
      },
      fanhui(){
        this.$router.push("/tuangou")
      }
    },
    created(){
      console.log(this.$route.query.orderId)
      this.$axios.get(this.$host+'/groupmall/power/order/selectGroupDetail',{params:{id:this.$route.query.orderId}})
        .then((resp)=> {
          console.log("请求成功之后的回调函数");
          console.log(resp.data.data);
          this.tableData=resp.data.data

          this.groupId=this.tableData[0].groupId
          this.groupState=this.tableData[0].groupState;
          this.groupMaster=this.tableData[0].groupMaster;
          this.startTime=this.tableData[0].startTime;
          this.endTime=this.tableData[0].endTime
          this.proName=this.tableData[0].proName;
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].bestState==1){
              this.tableData[i].bestState="待付款"
            }
            if(this.tableData[i].bestState==2){
              this.tableData[i].bestState="拼团中"
            }
            if(this.tableData[i].bestState==3){
              this.tableData[i].bestState="拼团成功"
            }
            if(this.tableData[i].bestState==4){
              this.tableData[i].bestState="拼团失败"
            }
          }
        })
    }
  };

</script>

<style scoped>
    .el-breadcrumb {
        height: 10px;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    }
    .line {
        border-left: 3px solid #40b6a6;
        padding-left: 10px;
    }
    .gap{
        padding: 0.8% 2%;
    }
    .wenzi-size{
        font-size: 14px;
        /*padding: 0 0.5%;*/
    }
</style>
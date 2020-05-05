<template>
    <div style="color: #606266">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">基本信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">发货单流水号：{{liushuihao}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">发货时间：{{sendTime}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">订单编号：{{orderId}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">下单时间：{{orderTime}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">购买用户：{{username}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">配送方式：{{sendType}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">配送费用：{{sendMoney}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">发货单号：<el-input placeholder="发货单号" v-model="input" style="width: 200px" size="small"></el-input></div></el-col>
        </el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">客户留言:{{doNote}}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">收货人信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">姓名：{{name}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">手机：{{callNum}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">地址：{{address}}</div></el-col>
        </el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">商品信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    property="proName"
                    label="商品名称"
                    width="130">
            </el-table-column>
            <el-table-column
                    property="proId"
                    label="货号"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="count"
                    label="发货数量">
            </el-table-column>
        </el-table>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">发货操作信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row style="padding: 1%">
            <el-col :span="2"><div class="grid-content bg-purple-dark" style="font-size: 14px">操作人:{{name}}</div></el-col>
        </el-row>
        <!--<el-row style="padding: 1%">-->
        <!--<el-col :span="2"><div class="grid-content bg-purple-dark" style="font-size: 14px;padding-top: 18%">操作备注:</div></el-col>-->
        <!--<el-col :span="12"><div class="grid-content bg-purple-dark"><el-input-->
        <!--type="textarea"-->
        <!--:rows="2"-->
        <!--placeholder="Please input"-->
        <!--v-model="textarea">-->
        <!--</el-input></div></el-col>-->
        <!--</el-row>-->

        <el-breadcrumb separator-class="el-icon-arrow-right" style="position: relative">
            <el-breadcrumb-item class="line">可执行的操作:
                <span v-if="shibie==1">无</span>
                <el-button type="primary" style="position: absolute;top:15%;left: 15%" @click="fahuo" size="small"  v-if="shibie==0">
                    发货</el-button>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="操作者"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="操作时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="订单状态">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="付款状态">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="发货状态">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="备注">
            </el-table-column>
        </el-table>
        <!--<el-dialog-->
                <!--title="提示"-->
                <!--:visible.sync="dialogVisible"-->
                <!--width="30%"-->
                <!--height="100px"-->
                <!--:before-close="handleClose">-->
            <!--<span>确定发货吗？</span>-->
            <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取消</el-button>-->
    <!--<el-button type="primary" @click="queding">确定</el-button>-->
  <!--</span>-->
        <!--</el-dialog>-->
    </div>
</template>




<script>
  export default {
    name: "dingdanxiangqing",
    data(){
      return{
        input:"",
        textarea:"",
        tableData:[],
        liushuihao:"",
        sendTime:"",
        orderId:"",
        orderTime:"",
        username:"",
        sendType:"",
        sendMoney:"",
        doNote:"",
        name:"",
        callNum:"",
        address:"",
        dialogVisible: false,
        shibie:0
      }
    },
    methods:{
      tuikuan(){
        this.$router.push("/dingdantuikuan")

      },
      fahuo(){
        // this.dialogVisible=true
        this.$alert('发货成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            console.log("发货成功")
            this.$axios.post(this.$host+'/groupmall/power/order/doSend',JSON.stringify({orderId:this.$route.query.orderId,sendType:this.sendType,sendNumber:this.input})).then((resp)=>{
              // console.log(resp)
              this.tableData=resp.data.data.dataList
            })
          }
        });
      },
      // queding(){
      //   this.dialogVisible=false
      //   this.$axios.post(this.$host+'/groupmall/power/order/doSend',JSON.stringify({orderId:this.$route.query.orderId,sendType:this.sendType,sendNumber:this.input})).then((resp)=>{
      //     // console.log(resp)
      //     this.tableData=resp.data.data.dataList
      //   })
      // }
    },
    created(){
      console.log(this.$route.query.orderId)
      if(this.$route.query.zhuangtai=="正常"){
        this.shibie=0
      }
      else {
        this.shibie=1
      }
      this.$axios.get(this.$host+'/groupmall/power/order/selectSendListDetail',{params:{id:this.$route.query.orderId}})
        .then((resp)=> {
          console.log("请求成功之后的回调函数");
          console.log(resp.data.data);
          this.tableData=resp.data.data;
          this.liushuihao=this.tableData[0].sendId
          this.sendTime=this.tableData[0].sendTime
          this.address=this.tableData[0].address
          this.orderId=this.tableData[0].orderId
          this.orderTime=this.tableData[0].orderTime
          this.doNote=this.tableData[0].doNote
          this.name=this.tableData[0].name
          this.callNum=this.tableData[0].callNum
          this.username=this.tableData[0].username
          this.sendType=this.tableData[0].sendType
          this.sendMoney=this.tableData[0].sendMoney
          console.log(this.tableData);
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
        padding: 0.8% 1.5%;
        font-size: 14px;
    }
</style>
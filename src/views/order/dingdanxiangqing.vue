<template>
    <div style="color: #606266">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">基本信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">订单编号：{{orderId}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">订单状态：{{bestState}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">购买用户：{{username}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">下单时间：{{orderTime}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">支付方式：{{payWay}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">付款时间：{{payTime}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">配送方式：{{sendType}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">发货时间：{{doTime}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">发货单号：{{proId}}</div></el-col>
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
            <el-col :span="24"><div class="grid-content bg-purple-dark gap">姓名：{{adminName}}</div></el-col>
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
                    prop="proName"
                    label="商品名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="orderId"
                    label="货号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="count"
                    label="数量"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="zhongliang"
                    label="商品总重量"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="zongjia"
                    label="合计"
                    width="120"
            >
            </el-table-column>
        </el-table>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">费用信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="gap" style="padding-top: 2%">
            <el-col :span="5"><div class="grid-content bg-purple" style="font-size: 14px">商品总金额¥{{sumjiage}}.00 </div></el-col>
            <el-col :span="1"><div class="grid-content bg-purple-light" style="font-size: 14px">+</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 14px">配送费用¥25.00 </div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light" style="font-size: 14px">= 应付款金额：¥{{shijijine}}</div></el-col>
        </el-row>
        <el-row style="text-align: center;padding: 2% 0">
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <!--<el-button type="info" icon="el-icon-document">打印订单</el-button>-->
            </div></el-col>
        </el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">操作信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row style="padding: 20px;height: 100px">
            <el-col :span="2"><div class="grid-content bg-purple-dark" style="font-size: 14px;height: 50px;text-align: center;line-height: 50px">操作备注:</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-dark" style="font-size: 14px"><el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea">
            </el-input></div></el-col>

        </el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="position: relative">
            <el-breadcrumb-item class="line" style="font-size: 14px">可执行的操作:
                <el-button type="primary"  size="small" style="position: absolute;top:15%;left: 15%" @click="yijianfahuo">一键发货</el-button>
                <el-button type="danger" size="small" style="position: absolute;top:15%;left: 25%" @click="tuikuan">退款</el-button>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-table
                :data="tableData"
                style="width: 100%;padding-left: 1%">
            <el-table-column
                    prop="adminName"
                    label="操作者"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="doTime"
                    label="操作时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="bestState"
                    label="订单状态">
            </el-table-column>
            <el-table-column
                    prop="doNote"
                    label="备注">
            </el-table-column>
        </el-table>

    </div>
</template>




<script>
  export default {
    name: "dingdanxiangqing",
    created(){
      console.log(this.$route.query.orderId)
      this.$axios.get(this.$host+'/groupmall/power/order/selectOfListDetail',{params:{id:this.$route.query.orderId}})
        .then((resp)=> {
          console.log(resp.data.data);
          this.tableData=resp.data.data;
          this.doTime=this.tableData[0].doTime
          this.address=this.tableData[0].address
          this.proId=this.tableData[0].proId
          this.payTime=this.tableData[0].payTime
          this.callNum=this.tableData[0].callNum
          this.orderId=this.tableData[0].orderId
          this.sendType=this.tableData[0].sendType
          this.orderTime=this.tableData[0].orderTime
          this.doNote=this.tableData[0].doNote
          this.adminName=this.tableData[0].adminName
          this.payWay=this.tableData[0].payWay
          this.username=this.tableData[0].username
          this.bestState=this.tableData[0].bestState
          for (var i=0;i<this.tableData.length;i++){
            this.tableData[i]["zongjia"]=parseInt(this.tableData[i].price*this.tableData[i].count)
            this.tableData[i]["zhongliang"]=this.tableData[i].weight*this.tableData[i].count
          }
          if(this.bestState==1){
            this.bestState="待付款"
          }
          if(this.bestState==2){
            this.bestState="待核销"
          }
          if(this.bestState==3){
            this.bestState="待发货"
          }
          if(this.bestState==4){
            this.bestState="待收货"
          }
          if(this.bestState==5){
            this.bestState="待评价"
          }
          if(this.bestState==6){
            this.bestState="退款成功"
          }
          if(this.bestState==7){
            this.bestState="交易成功"
          }
          for(var k=0;k<this.tableData.length;k++){
            this.sumjiage=this.tableData[k].zongjia+this.sumjiage
          }
          this.shijijine=this.sumjiage+25

          for (var q=0;q<this.tableData.length;q++){
            if(this.tableData[q].bestState==1){
              this.tableData[q].bestState="待付款"
            }
            if(this.tableData[q].bestState==2){
              this.tableData[q].bestState="待核销"
            }
            if(this.tableData[q].bestState==3){
              this.tableData[q].bestState="待发货"
            }
            if(this.tableData[q].bestState==4){
              this.tableData[q].bestState="待收货"
            }
            if(this.tableData[q].bestState==5){
              this.tableData[q].bestState="待评价"
            }
            if(this.tableData[q].bestState==6){
              this.tableData[q].bestState="退款成功"
            }
            if(this.tableData[q].bestState==7){
              this.tableData[q].bestState="交易成功"
            }
          }
          // console.log( this.tableData);
        })
    },
    methods:{
      tuikuan(){
        // this.$router.push("/dingdantuikuan")
        this.$router.push({path:"/dingdantuikuan",query:{orderId:this.$route.query.orderId}});
        // this.$axios.post('http://172.16.14.41:8080/groupmall/power/order/selectOfList',JSON.stringify({orderId:this.$route.query.orderId,refundMone})).then((resp)=>{
        //   console.log(resp)
        // })
        // this.$axios.get('http://172.16.14.41:8080/groupmall/power/order/selectOfListDetail',{params:{id:this.getId}})
        //   .then((resp)=> {
        //     console.log("请求成功之后的回调函数");
        //     console.log(resp);
        //     // this.tableData=resp.data;
        //     // console.log( this.tableData);
        //   })
      },
      yijianfahuo(){
        this.$router.push("/fahuodan")
      }
    },
    data(){
      return{
        tableDate:[{
          username:"苹果",
          callNum:"123",
          productId:"1241251",
          price:"15",
          count:"1",
          sendType:"",
          doTime:"",
          address:""
        }],
        orderId:"",
        bestState:"",
        username:"",
        orderTime:"",
        payWay:"",
        payTime:"",
        proId:"",
        doNote:"",
        adminName:"",
        callNum:"",
        sumjiage:"",
        shijijine:""
      }
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
        padding:0.5% 1.5%;
        font-size: 14px;
    }
</style>
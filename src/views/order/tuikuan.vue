<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">退款
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row style="height: 120px;padding-left: 2%">
            <el-col :span="3"><div class="grid-content bg-purple-dark" style="line-height: 120px">
                <span style="color: #606266">操作备注： </span></div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light" style="height: 60px;margin-top: 30px">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入操作内容"
                        v-model="textarea">
                </el-input>
            </div></el-col>
        </el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="position: relative">
            <el-breadcrumb-item class="line" style="width: 100%">退款金额
                <span style="margin-left: 5%">金额:</span>
                <el-input :placeholder="jine" v-model="input" style="width: 15%;position: absolute;top: 15%;left: 18%" :disabled="true" size="small"></el-input>
                <span style="margin-left: 21%">运费:</span>
                <el-input :placeholder="yunfei" v-model="input1" style="width: 15%;position: absolute;top: 15%;left: 41.5%" :disabled="true" size="small"></el-input>
                <div style="position: absolute;left: 60%;top: 30%;height: 50%" @change="changeHandler">
                    <el-radio v-model="radio" label="1">不退运费</el-radio>
                    <el-radio v-model="radio" label="2">退运费</el-radio>
                </div>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="line">退款方式
                &nbsp;  &nbsp;  &nbsp;
                <el-checkbox v-model="checked">线下退款</el-checkbox>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row style="padding: 20px">
            <el-col :span="3"><div class="grid-content bg-purple" style="padding-top: 12%">
                <span style="color: #606266">退款说明：</span></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入信息"
                        v-model="textarea1">
                </el-input>
            </div></el-col>
        </el-row>

        <el-row style="text-align: center">
            <el-col :span="24"><div class="grid-content bg-purple">  <el-button type="primary" @click="gettuikuan">
                确定</el-button><el-button>返回</el-button></div></el-col>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>退款成功</span>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="queding">确定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "tuikuan",
    data () {
      return {
        radio: '1',
        textarea: '',
        textarea1:"",
        input:"",
        input1:"",
        tuikuanjine:"2",
        yunfei:"0",
        zongjia:"",
        jine:"",
        dialogVisible: false

      };
    },
    methods:{
      gettuikuan(){
        this.dialogVisible=true
        console.log(this.textarea);
        console.log(this.textarea1);
        // this.$axios.post('http://172.16.14.41:8080/groupmall/power/order/doRefund',JSON.stringify({orderId:this.$route.query.orderId,refundMoney:123,refundNote:"123",refundType:"1"})).then((resp)=>{
        //   console.log(resp)
        // })
      },
      queding(){
        this.dialogVisible=false;
        this.$router.push("/dingdanlist")
        this.$axios.post(this.$host+'/groupmall/power/order/doRefund',JSON.stringify({orderId:this.$route.query.orderId,refundMoney:this.zongsum,refundNote:this.textarea,refundType:this.textarea})).then((resp)=>{
          console.log(resp)
        })
      },
      changeHandler() {
        console.log(this.radio)
        if(this.radio==1){
          this.yunfei=0
          this.jine=this.zongjia
        }
        if(this.radio==2){
          this.yunfei=25
          this.jine=this.zongjia-25

        }
      }
      // listenyunfei(){
      //   console.log(this.radio)
      //   if(this.radio==2){
      //     this.yunfei=0
      //     // console.log(this.jine)
      //     this.jine=this.zongjia
      //
      //   }
      //   if(this.radio==1){
      //     this.yunfei=25
      //     this.jine=this.zongjia-25
      //
      //   }
      //   // if(this.radio)
      // }
    },
    created(){
      this.zongjia=this.$route.query.zongjia
      this.jine=this.zongjia-this.yunfei
      console.log(this.$route.query.zongjia)
      // this.zongjia=this.$route.query.zongjia
      // console.log(this.zongsum)
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
</style>
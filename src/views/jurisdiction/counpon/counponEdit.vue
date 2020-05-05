<template>
    <div>
        <!--修改优惠券-->
        <div class="nameStyle" style="margin-top: 10px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="优惠券名称" prop="coupName">
                    <el-input style="width: 40%"
                              size="small"
                              placeholder="请输入内容"
                              v-model="ruleForm.coupName"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="类型" prop="myStyle">
                    <el-radio-group v-model="ruleForm.myStyle">
                        <el-radio label="用户发放" disabled></el-radio>
                        <el-radio label="订单发放" disabled></el-radio>
                        <el-radio label="商品发放" disabled></el-radio>
                        <el-radio label="团长优惠" disabled></el-radio>
                        <el-radio label="积分兑换" disabled></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="优惠券金额" prop="couponMoney">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              size="small"
                              v-model="ruleForm.couponMoney"
                              clearable>
                    </el-input>
                    <span style="color: #606266;font-size: 11px;margin-left: 5px">(此券可抵的金额)</span>
                </el-form-item>
                <el-form-item label="订单金额" prop="couponOrderMoney"  v-if="couponOrderMoneyVis">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              size="small"
                              v-model="ruleForm.couponOrderMoney"
                              clearable>
                    </el-input>
                    <span style="color: #606266;font-size: 11px;margin-left: 5px">(订单满多少可用)</span>
                </el-form-item>
                <el-form-item label="订单下限" prop="couponOrderLimit" v-if="couponOrderLimitVis">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              size="small"
                              v-model="ruleForm.couponOrderLimit"
                              clearable>
                    </el-input>
                    <span style="color: #606266;font-size: 11px;margin-left: 5px">(满多少可送此券)</span>
                </el-form-item>
                <el-form-item label="优惠商品" prop="couponGood" v-if="couponGoodVis">
                    <el-input style="width: 40%"
                              size="small"
                              :disabled="true"
                              v-model="ruleForm.couponGood"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="所需积分" prop="needNum" v-if="needNumVis">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              size="small"
                              v-model="ruleForm.needNum"
                              clearable>
                    </el-input>
                    <span style="color: #606266;font-size: 11px;margin-left: 5px">(兑换此券需要多少积分)</span>
                </el-form-item>
                <el-form-item label="发放日期">
                    <el-date-picker
                            v-model="ruleForm.date1"
                            type="datetimerange"
                            size="small"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效日期">
                    <el-date-picker
                            v-model="ruleForm.date2"
                            type="datetimerange"
                            align="right"
                            size="small"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="text-align: center;margin-left: -240px">
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
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
    name: "couponEdit",
    data() {
      return {
        myIndex:'',
        couponGoodVis:true,
        needNumVis:true,
        couponOrderLimitVis:true,
        couponOrderMoneyVis:true,
        ruleForm: {
          coupName:'',
          myStyle:'',
          couponMoney: "",
          couponOrderMoney: "",
          couponOrderLimit:'',
          couponGood:'',
          needNum:'',
          date1: "",
          date2: "",
        },
      };
    },
    created(){
      this.$data.myIndex=this.$route.query.id;
      this.$data.ruleForm.myStyle=this.$route.query.myStyle;
      this.$axios.post(this.$host+"/groupmall/power/coupon/updateByQueryId", JSON.stringify({
        coupID: this.$data.myIndex,
      })).then(resp => {
        // console.log(this.$data.ruleForm.myStyle)
        if(this.$data.ruleForm.myStyle=="订单发放"){
          this.$data.couponGoodVis=false;
          this.$data.needNumVis=false;
          // console.log( this.$data.couponOrderLimitVis)
          // this.$data.couponOrderLimitVis=true;
          // console.log( this.$data.couponOrderLimitVis)
        }
        if(this.$data.ruleForm.myStyle=="用户发放"||this.$data.ruleForm.myStyle=="团长优惠"){
          this.$data.couponGoodVis=false;
          this.$data.needNumVis=false;
          this.$data.couponOrderLimitVis=false;
        }
        if(this.$data.ruleForm.myStyle=="积分兑换"){
          // console.log(this.$data.ruleForm.myStyle)
          this.$data.couponGoodVis=false;
          this.$data.couponOrderLimitVis=false;
          this.$data.needNumVis=true;
        }
        if(this.$data.ruleForm.myStyle=="商品发放"){
          this.$data.couponOrderLimitVis=false;
          this.$data.couponOrderMoneyVis=false;
        }
        // console.log("修改优惠券");
        // console.log(resp.data);
        this.$data.ruleForm.coupName=resp.data[0].coupName;
        this.$data.ruleForm.couponMoney=resp.data[0].coupAmount;
        this.$data.ruleForm.couponOrderMoney=resp.data[0].orderAmount;
        this.$data.ruleForm.couponOrderLimit=resp.data[0].orderLeast;
        this.$data.ruleForm.couponGood=resp.data[1];
        this.$data.ruleForm.needNum=resp.data[0].coupInteg;
        this.$data.ruleForm.date1=[new Date(resp.data[0].sendBegin),new Date(resp.data[0].sendEnd)];
        this.$data.ruleForm.date2=[new Date(resp.data[0].useBegin),new Date(resp.data[0].userEnd)];
        // console.log(resp.data[0].sendEnd);
        // console.log(this.$data.ruleForm.date1);
      });
    },
    methods: {
      // 点击添加按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var send_begin=(this.ruleForm.date1[0]).format("yyyy-MM-dd hh:mm:ss");
            var send_end=(this.ruleForm.date1[1]).format("yyyy-MM-dd hh:mm:ss");
            var use_begin=(this.ruleForm.date2[0]).format("yyyy-MM-dd hh:mm:ss");
            var user_end=(this.ruleForm.date2[1]).format("yyyy-MM-dd hh:mm:ss");
            this.$axios.post(this.$host+"/groupmall/power/coupon/update",JSON.stringify({
              coupId:this.myIndex,
              coupName:this.ruleForm.coupName,
              coupType:this.ruleForm.coupStyle,
              coupAmount:this.ruleForm.couponMoney,
              orderAmount:this.ruleForm.couponOrderMoney,
              orderLeast:this.ruleForm.couponOrderLimit,
              coupInteg:this.ruleForm.needNum,
              sendBegin:send_begin,
              sendEnd:send_end,
              useBegin:use_begin,
              userEnd:user_end,
            })).then(resp=>{
              // console.log(resp.data.coupId==null);
              if(resp.data.coupId!=null){
                this.$alert('修改成功', '提示信息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // console.log("被点击了");
                    this.$router.push({ path:'/CouponManagement'})
                  }
                });
              }else{
                this.$alert('修改失败', '提示信息', {
                  confirmButtonText: '确定',
                });
              }
            })
          } else {
            console.log("加载失败");
            return false;
          }
        });
      },
      // 点击重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style scoped>
    .nameStyle {
        margin-top: 10px;
        text-align: left;
    }
    .el-col-2{
        width: 1%;
    }
</style>
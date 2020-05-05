<template>
    <div>
        <div class="nameStyle" style="margin-top: 10px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="优惠券名称" prop="coupName">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              v-model="ruleForm.coupName"
                              size="small"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="类型" prop="coupStyle">
                    <el-radio-group v-model="ruleForm.coupStyle">
                        <router-link to="/couponAdd" active-class="active" style="margin-right: 10px">
                            <el-radio label="用户发放" style="margin-right: 30px"></el-radio>
                        </router-link>
                        <router-link to="/couponAddTwo" active-class="active" style="margin-right: 10px">
                            <el-radio label="订单发放" style="margin-right: 30px"></el-radio>
                        </router-link>
                        <router-link to="/couponAdd" active-class="active" style="margin-right: 10px">
                            <el-radio label="团长优惠" style="margin-right: 30px"></el-radio>
                        </router-link>
                        <router-link to="/couponAddThree" active-class="active" style="margin-right: 10px">
                            <el-radio label="商品发放" style="margin-right: 30px"></el-radio>
                        </router-link>
                        <el-radio label="积分兑换"></el-radio>
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
                <el-form-item label="订单金额" prop="couponOrderMoney">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              size="small"
                              v-model="ruleForm.couponOrderMoney"
                              clearable>
                    </el-input>
                    <span style="color: #606266;font-size: 11px;margin-left: 5px">(订单满多少可用)</span>
                </el-form-item>
                <el-form-item label="所需积分" prop="needNum">
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
                <el-form-item style="text-align: center;margin-left: -80px">
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
    name: "couponAddFour",
    data() {
      return {
        ruleForm: {
          coupName: "",
          coupStyle: "积分兑换",
          couponMoney: "",
          couponOrderMoney: "",
          date1: "",
          date2: "",
          needNum:'',
        },
      };
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
            this.$axios.post(this.$host+"/groupmall/power/coupon/addcoup",JSON.stringify({
              coupName:this.ruleForm.coupName,
              coupType:this.ruleForm.coupStyle,
              coupAmount:this.ruleForm.couponMoney,
              orderAmount:this.ruleForm.couponOrderMoney,
              coupInteg:this.ruleForm.needNum,
              sendBegin:send_begin,
              sendEnd:send_end,
              useBegin:use_begin,
              userEnd:user_end,
            })).then(resp=>{
              console.log(resp.data)
              if(resp.data==true){
                // 弹框  确定后需要调到列表页
                this.$alert('添加成功', '提示信息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // console.log("被点击了");
                    this.$router.push({ path:'/CouponManagement'  })
                  }
                });
              }else{
                this.$alert('添加失败', '提示信息', {
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
        /*margin-left: 10px;*/
        text-align: left;
    }
    .el-col-2{
        width: 1%;
    }
</style>
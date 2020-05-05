<template>
    <div>
        <div class="nameStyle" style="margin-top: 10px;color: #606266">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="goodsName">
                   <span>{{ruleForm.goodName}}</span>
                </el-form-item>
                <el-form-item label="活动日期">
                    <el-date-picker
                            v-model="ruleForm.date1"
                            type="datetimerange"
                            size="small"
                            align="right"
                            style="width: 40%"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="团购人数" prop="totalPeople">
                    <el-input style="width: 40%" size="small"
                              placeholder="请输入内容"
                              v-model="ruleForm.totalPeople"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="抽奖价格" prop="activePrice">
                    <el-input style="width: 40%" size="small"
                              placeholder="请输入内容"
                              v-model="ruleForm.activePrice"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="抽奖人数" prop="activePeople">
                    <el-input style="width: 40%" size="small"
                              placeholder="请输入内容"
                              v-model="ruleForm.activePeople"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="抽奖规则" prop="activeRule">
                    <el-input
                            style="width: 40%"
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="ruleForm.activeRule"
                            maxlength="120"
                            show-word-limit
                    ></el-input>
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
    name: "luckDrawAdd",
    data() {
      return {
        luckId:'',
        ruleForm: {
          goodName:'测试',
          date1:'',
          totalPeople:'',
          activePrice:'',
          activePeople:'',
          activeRule:'测试活动规则',
        },
      };
    },
    created(){
      this.$data.luckId=this.$route.query.id;
      // console.log(this.$data.luckId);
      this.$axios.get(this.$host+"/groupmall/setting/LuckInfo/getLuckAct?id="+this.$data.luckId).then(resp => {
        // console.log("修改抽奖");
        // console.log(resp.data);
        this.$data.ruleForm.goodName=resp.data.proName;
        var t1=new Date(resp.data.lkBegin);
        var t2=new Date(resp.data.lkEnd);
        this.$data.ruleForm.date1=[t1,t2];
        this.$data.ruleForm.totalPeople=resp.data.lkGroupmin;
        this.$data.ruleForm.activePrice=resp.data.lkPrice;
        this.$data.ruleForm.activePeople=resp.data.lkPeop;
        this.$data.ruleForm.activeRule=resp.data.lkRule;
      });
    },
    methods: {
      // 点击确定按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var send_begin=(this.ruleForm.date1[0]).format("yyyy-MM-dd hh:mm:ss");
            var send_end=(this.ruleForm.date1[1]).format("yyyy-MM-dd hh:mm:ss");
            this.$axios({
              url:this.$host+"/groupmall/setting/LuckInfo/test",
              method:'put',
              access_token:this.token,
              data:{
                lkId:this.$data.luckId,
                lkGroupmin:this.$data.ruleForm.totalPeople,
                lkPrice:this.$data.ruleForm.activePrice,
                lkPeop:this.$data.ruleForm.activePeople,
                lkRule:this.$data.ruleForm.activeRule,
                lkBegin:send_begin,
                lkEnd:send_end,
              }
            })
            .then(resp=>{
              // console.log(resp.data);
              if(resp.data=='"status":true'){
                this.$alert('修改成功', '提示信息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // console.log("被点击了");
                    this.$router.push({ path:'/luckDrawMain'})
                  }
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
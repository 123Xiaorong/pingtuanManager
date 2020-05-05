<template>
    <div>
        <!--<div class="divFirst">-->
            <!--<el-row>-->
                <!--&lt;!&ndash;<router-link to="/seckillMain" active-class="active" style="margin-right: 10px">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button type="primary">秒杀管理</el-button>&ndash;&gt;-->
                <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
                <!--&lt;!&ndash;<router-link to="/seckillAdd" active-class="active" style="margin-right: 10px">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button type="primary" style="margin-left: 10px">添加秒杀</el-button>&ndash;&gt;-->
                <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
            <!--</el-row>-->
        <!--</div>-->
        <!--优惠券名称和类型-->
        <div class="nameStyle">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                    <p style="font-size: 14px;color: #606266;margin: 0 0">商品名称测试</p>
                </el-form-item>
                <el-form-item label="活动日期" required="">
                    <el-col :span="11" style="width: 15%">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                            size="small"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11" style="width: 15%">
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"
                                            size="small"
                                            style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                    <!--============-->
                    <el-col :span="11" style="width: 15%;margin-left: 10px">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                            size="small"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11" style="width: 15%">
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"
                                            size="small"
                                            style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="团购人数" prop="name">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              v-model="ruleForm.couponOrderMoney"
                              size="small"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="秒杀价格" prop="name">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              size="small"
                              v-model="ruleForm.couponOrderMoney"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="秒杀库存" prop="name">
                    <el-input style="width: 40%"
                              placeholder="请输入内容"
                              size="small"
                              v-model="ruleForm.couponOrderMoney"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="秒杀规则" prop="name">
                    <el-input
                            style="width: 40%"
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="textarea"
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
  export default {
    name: "seckillEdit",
    data() {
      return {
        textarea:'',
        ruleForm: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: "",
          couponMoney: "",
          couponOrderMoney: ""

        },
        rules: {
          name: [
            { required: true, message: "请输入优惠券名称", trigger: "blur" },
            // { min: 3, max: 5, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          region: [
            { required: true, message: "请选择活动区域", trigger: "change" }
          ],
          date1: [
            { type: "date", required: true, message: "请选择日期", trigger: "change" }
          ],
          date2: [
            { type: "date", required: true, message: "请选择时间", trigger: "change" }
          ],
          type: [
            { type: "array", required: true, message: "请至少选择一个活动性质", trigger: "change" }
          ],
          resource: [
            { required: true, message: "请选择活动资源", trigger: "change" }
          ],
          desc: [
            { required: true, message: "请填写活动形式", trigger: "blur" }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert("submit!");
            this.$alert('添加成功', '提示信息', {
              confirmButtonText: '确定',
              // callback: action => {
              //   this.$message({
              //     type: 'info',
              //     // message: `action: ${ action }`
              //   });
              // }

            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style scoped>
    .divFirst {
        margin-top: 10px;
        margin-left: 10px;
    }

    .nameStyle {
        margin-top: 10px;
        /*margin-left: 10px;*/
        text-align: left;
    }
    .el-col-2{
        width: 1%;
    }
</style>
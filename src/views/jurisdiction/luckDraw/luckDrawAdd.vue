<template>
    <div>
        <div class="nameStyle" style="margin-top: 10px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品关键字" prop="goodMain">
                    <el-input style="width: 40%"
                              size="small"
                              placeholder="请输入内容"
                              v-model="goodMain"
                              clearable>
                    </el-input>
                    <el-button type="success" style="margin-left: 10px"
                               @click="searchGoods()"
                               size="small">搜索</el-button>
                </el-form-item>
                <el-form-item label="商品名称" prop="GoodsId">
                    <el-select v-model="GoodsId" size="small"
                               clearable placeholder="请选择分类"
                               style="width: 15%;margin-right: 10px">
                        <el-option
                                v-for="item in GoodsArr"
                                :key="item.proId"
                                :label="item.proName"
                                :value="item.proId">
                        </el-option>
                    </el-select>
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
        goodMain:'',
        GoodsId:'',
        GoodsArr:[],
        ruleForm: {
          date1:'',
          totalPeople:'',
          activePrice:'',
          activePeople:'',
          activeRule:'',
        },
      };
    },
    methods: {
      // 点击搜索按钮
      searchGoods(){
        console.log(this.$data.goodMain);
        this.$axios.get(this.$host+"/groupmall/setting/LuckInfo/getLuckProducts?keyWord="+this.$data.goodMain)
          .then(resp=>{
          // console.log(resp.data);
          // this.$data.GoodsArr=resp.data;
          for(var i=0;i<resp.data.length;i++){
            this.$data.GoodsArr.push({
              proId:resp.data[i].proId,
              proName:resp.data[i].proName,
            })
          }
        })
      },
      // 点击添加按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var send_begin=(this.ruleForm.date1[0]).format("yyyy-MM-dd hh:mm:ss");
            var send_end=(this.ruleForm.date1[1]).format("yyyy-MM-dd hh:mm:ss");
            // console.log(this.$data.GoodsArr)
            console.log(this.$data.GoodsId);
            this.$axios.post(this.$host+"/groupmall/setting/LuckInfo",JSON.stringify({
              proId:this.GoodsId,
              lkGroupmin:this.$data.ruleForm.totalPeople,
              lkPrice:this.$data.ruleForm.activePrice,
              lkPeop:this.$data.ruleForm.activePeople,
              lkRule:this.$data.ruleForm.activeRule,
              lkBegin:send_begin,
              lkEnd:send_end,
            })).then(resp=>{
              console.log(resp.data);
                if(resp.data=='"status":true'){
                  this.$alert('添加成功', '提示信息', {
                    confirmButtonText: '确定',
                    callback: action => {
                      // console.log("被点击了");
                      this.$router.push({ path:'/luckDrawMain'  })
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
        text-align: left;
    }
    .el-col-2{
        width: 1%;
    }
</style>
<template>
    <div class="couponGrantContent">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!--<el-tab-pane label="线下发放" name="first">-->
                <!--<div>-->
                    <!--<el-form ref="form" :model="form" label-width="100px">-->
                        <!--<el-form-item label="名称金额" style="width: 40%">-->
                            <!--<el-input placeholder="请输入内容"-->
                                      <!--size="small"-->
                                      <!--v-model="form.nameMoney"-->
                                      <!--clearable></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="优惠券数量" style="width: 40%">-->
                            <!--<el-input placeholder="请输入内容"-->
                                      <!--v-model="form.couponNumber"-->
                                      <!--size="small"-->
                                      <!--clearable></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="" style="width: 60%">-->
                            <!--<p style="color: #606266"><span style="color: red">-->
                                <!--提示:-->
                            <!--</span>优惠券序列号由六位序列号种子加上四位随机数字组成</p>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="submitForm('form')">确定</el-button>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->
                <!--</div>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="按商品发放" name="first">
                <div class="goodPayment">
                    <div>
                        <el-select v-model="form.couponGoodsId" size="small"
                                   clearable placeholder="请选择分类"
                                   style="width: 15%;margin-right: 10px">
                            <el-option
                                    v-for="item in form.couponGoodsArr"
                                    :key="item.categoryId"
                                    :label="item.categoryName"
                                    :value="item.categoryId">
                            </el-option>
                        </el-select>
                        <el-input style="width: 30%;margin-right: 10px" placeholder="请输入内容" size="small"
                                  v-model="form.couponGoodSearch" clearable>
                        </el-input>
                        <el-button type="success" size="small" @click="productSearch()">搜索</el-button>
                        <el-divider></el-divider>
                    </div>
                    <div>
                        <span style="margin-right: 200px;color: #606266;font-size: 14px">可选商品</span>
                        <span style="margin-right: 120px;color: #606266;font-size: 14px">操作</span>
                        <span style="color: #606266;font-size: 14px">发放此类型优惠券的商品</span>
                        <el-divider></el-divider>
                        <el-transfer
                                v-model="myValue"
                                :data="myData"
                                :props="{key: 'proId',label: 'proName'}"
                        ></el-transfer>
                    </div>
                    <div style="margin-left: 250px;margin-top: 10px">
                        <el-button type="primary" @click="submitForm()">确定</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="按用户发放" name="second">
                <div class="userPayment">
                    <div>
                        <span style="margin-right: 10px;color: #606266;font-size: 14px">关键字</span>
                        <el-input style="width: 30%;margin-right: 10px" placeholder="请输入内容" size="small"
                                  v-model="form.userSearch" clearable></el-input>
                        <el-button type="success" size="small" @click="userSearch()">搜索</el-button>
                        <el-divider></el-divider>
                    </div>
                    <div>
                        <span style="margin-right: 200px;color: #606266;font-size: 14px">会员列表</span>
                        <span style="margin-right: 120px;color: #606266;font-size: 14px">操作</span>
                        <span style="color: #606266;font-size: 14px">给下列用户发放优惠券</span>
                        <el-divider></el-divider>
                        <el-transfer
                                v-model="myValueTwo"
                                :data="myDataTwo"
                                :props="{key: 'userId',label: 'userName'}"
                        ></el-transfer>
                    </div>
                    <div style="margin-left: 250px;margin-top: 10px">
                        <el-button type="primary" @click="submitFormUser()">确定</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
  export default {
    name: "couponGrant",
    data() {
      return {
        // 左右移动的数据源
        myData: [],
        // 右边的值
        myValue: [],
        // 左右移动的数据源--2
        myDataTwo: [],
        // 右边的值--2
        myValueTwo: [],
        // 活动tab
        activeName: 'first',
        // 优惠券ID
        coupId:'',
        // 表单信息
        form: {
          couponGoodSearch:'',
          couponGoodsId:'',
          couponGoodsArr:[],
          // 用户
          userSearch:'',
        },
      };

    },
    created(){
      this.$data.coupId=this.$route.query.id;
      this.$axios.post(this.$host+"/groupmall/power/coupon/sendCategory",JSON.stringify({

      })).then(resp=>{
        this.$data.form.couponGoodsArr=resp.data;
      })
    },
    methods:{
      // 点击搜索用户
      userSearch(){
        // console.log(this.$data.form.userSearch);
        this.$axios.post(this.$host+"/groupmall/power/coupon/userSearch",JSON.stringify({
          userName:this.$data.form.userSearch,
        })).then(resp=>{
          // console.log("发送");
          console.log(resp.data);
          this.$data.myDataTwo=[];
          for(var i=0;i<resp.data.length;i++){
            this.$data.myDataTwo.push({
              userId:resp.data[i].userId,
              userName:resp.data[i].username
            })
          }
        })
      },
      // 点击搜索商品
      productSearch(){
        this.$axios.post(this.$host+"/groupmall/power/coupon/productSearch",JSON.stringify({
          categoryId:this.$data.form.couponGoodsId,
          proName:this.$data.form.couponGoodSearch,
        })).then(resp=>{
          var goodArr=[];
          for(var i=0;i<resp.data.length;i++){
            goodArr.push({
              proId:resp.data[i].proId,
              proName:resp.data[i].proName
            })
          }
          this.$data.myData=[];
          for(var i=0;i<goodArr.length;i++){
            this.$data.myData.push({
              proId:goodArr[i].proId,
              proName:goodArr[i].proName
            })
          }
        })
      },
      // 左右移动点击后的返回
      // transferClick(value, direction, movedKeys){
      //   // console.log(value, direction, movedKeys)
      //   // console.log(this.$data.myValue)
      //   },
      // 提交商品
      submitForm() {
        // console.log(this.$data.myValue);
        this.$axios({
          url:this.$host+"/groupmall/power/coupon/proAdds",
          method:'post',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            productIds:this.$data.myValue,
            coupId:this.$data.coupId,
          }
        }).then(resp=>{
          // console.log("发送成功");
          // console.log(resp.data)
          if(resp.data==0){
            // console.log("添加成功")
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }else{
            // console.log("已经添加了，不能重复添加")
            this.$alert('添加失败，不能重复添加', '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }
        })
      },
      // 提交用户
      submitFormUser() {
        console.log(this.$data.myValueTwo);
        this.$axios({
          url:this.$host+"/groupmall/power/coupon/userAdds",
          method:'post',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{
            userIds:this.$data.myValueTwo,
            coupId:this.$data.coupId,
          }
        }).then(resp=>{
          console.log("发送成功");
          console.log(resp.data);
          if(resp.data==0){
            // console.log("添加成功")
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }else{
            // console.log("已经添加了，不能重复添加")
            this.$alert('添加失败，不能重复添加', '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }
        })
      },
      // tab切换
      handleClick(tab, event) {
        // console.log(tab, event);
      },
    }

  };
</script>

<style scoped>
    .couponGrantContent{
        margin-top: 10px;
        margin-left: 10px;
    }
    .el-transfer-panel{
        width: 300px;
    }
</style>
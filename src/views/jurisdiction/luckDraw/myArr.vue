<template>
    <div>
        <!--<div><span>ID:</span><el-input v-model=""></el-input></div>-->
        <!--<div><span>商品名称:</span><el-input v-model=""></el-input></div>-->
        <!--<div><span>活动日期:</span><el-input v-model=""></el-input></div>-->
        <!--<div><span>团购人数:</span><el-input v-model=""></el-input></div>-->
        <!--<div><span>抽奖价格:</span><el-input v-model=""></el-input></div>-->
        <!--<div><span>抽奖人数:</span><el-input v-model=""></el-input></div>-->
        <!--<div><span>抽奖规则:</span><el-input v-model=""></el-input></div>-->
        <el-form ref="form" :model="form" label-width="80px" style="width: 96%;">
            <el-form-item label="ID">
                <el-input v-model="form.lkId" size="small" disabled></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="form.proName" size="small"></el-input>
            </el-form-item>
            <el-form-item label="活动日期">
                <el-date-picker
                        v-model="form.mydate"
                        type="datetimerange"
                        size="small"
                        align="right"
                        style="width: 100%"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00', '08:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="团购人数">
                <el-input v-model="form.lkGroupmin" size="small"></el-input>
            </el-form-item>
            <el-form-item label="抽奖价格">
                <el-input v-model="form.lkPrice" size="small"></el-input>
            </el-form-item>
            <el-form-item label="抽奖人数">
                <el-input v-model="form.lkPeop" size="small"></el-input>
            </el-form-item>
            <el-form-item label="抽奖规则">
                <el-input v-model="form.lkRule" size="small"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: "myArr",
    data(){
      return{
        form: {
          lkId: '',
          proName: '',
          mydate: '',
          lkGroupmin: '',
          lkPrice: '',
          lkPeop: '',
          lkRule: '',
        }
      }
    },
    created(){
      (()=>{
        setInterval(()=>{
          let searchArr=sessionStorage.getItem("searchArr");
          searchArr=JSON.parse(searchArr);
          // console.log(searchArr.lkId)
          this.$data.form.lkId=searchArr.lkId;
          this.$data.form.proName=searchArr.proName;
          this.$data.form.mydate=[new Date(searchArr.lkBegin),new Date(searchArr.lkEnd)];
          this.$data.form.lkGroupmin=searchArr.lkGroupmin;
          this.$data.form.lkPrice=searchArr.lkPrice;
          this.$data.form.lkPeop=searchArr.lkPeop;
          this.$data.form.lkRule=searchArr.lkRule;
        },0);
      })()

    }
  };
</script>

<style scoped>
    .el-form-item{
        margin-bottom: 10px;
    }
</style>
<template>
    <div style="margin-top: 20px">
        <div style="margin-left: 15px">
            <!--<el-button @click="tosign" type="primary">签到管理 </el-button>-->
            <router-link to="/vip_loginLog" active-class="active" style="margin-right: 10px">
                <el-button
                        type="primary"
                        icon="el-icon-s-order"
                >签到日志
                </el-button
                >
            </router-link>
            <!--<el-button @click="tologinLog"> </el-button>-->
        </div>
        <el-form ref="form" :model="form" label-width="150px" style="margin-top: 20px">
            <el-form-item label="签到积分">
                <el-input v-model="form.num" size="small" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="是否递增">
                <el-radio-group v-model="form.add">
                    <el-radio label="false">否</el-radio>
                    <el-radio label="true">是</el-radio>
                </el-radio-group>
                <div>
                    要开启递增模式，则需要同时设置每天递增积分、赠送积分的最大值。<br>
                    递增模式下，连续签到所获得积分为：签到积分+已签到天数*每天递增积分。<br>
                    例：签到积分：5，每天递增积分：1，那么第一天签到就是：5+0*1=5，第二天就是5+1*1=6，以此类推。<br>
                    当达到赠送积分最大值后，则不管再连续签到几天，都只赠送积分最大值对应的积分。<br>
                </div>
            </el-form-item>
            <el-form-item label="每天递增积分">
                <el-input v-if="form.add == 'false'" size="small" v-model="form.addnum" style="width: 150px"
                          :disabled="true"></el-input>
                <el-input v-else v-model="form.addNum" size="small" style="width: 150px" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="赠送积分最大值">
                <el-input v-if="form.add == 'false'" size="small" v-model="form.max" style="width: 150px"
                          :disabled="true"></el-input>
                <el-input v-else v-model="form.max" size="small" style="width: 150px" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="是否保存日志">
                <el-radio-group v-model="form.save">
                    <el-radio label="false">否</el-radio>
                    <el-radio label="true">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="签到日志保存天数">
                <el-input v-if="form.save == 'false'" size="small" v-model="form.day_num" style="width: 150px"
                          :disabled="true"></el-input>
                <el-input v-else v-model="form.dayNum" size="small" style="width: 150px" :disabled="false"></el-input>
                <div>为每个用户保存签到日志多少天，0表示不限制。</div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: "vip_sign",
    created(){
      this.$axios.post(this.$host+"/groupmall/member/SignManager" )
        .then(response => {
        console.log(response.data.data);
        console.log(response.data);
          const resp =response.data;
        console.log(resp.data.add);
          this.$data.form.num = resp.data.points;
          // this.$data.form.add = resp.data.add;
          this.$data.form.addNum = resp.data.addNum;
          this.$data.form.max= resp.data.max;
          // this.$data.form.save = resp.data.save;
          this.$data.form.dayNum = resp.data.dayNum;
          if (resp.data.add==true){
            this.$data.form.add="true"
          }else {
            this.$data.form.add="false"
          }
          if (resp.data.save==true){
            this.$data.form.save="true"
          }else {
            this.$data.form.save="false"
          }
      });
    },
    data() {
      return {
        form: {
          num:"",
          add: "",
          addNum: "",
          max: "",
          save:"",
          dayNum: ""
        }
      };
    },
    methods: {
      onSubmit() {
        this.$axios.post(this.$host+"/groupmall/member/updateSignManager", JSON.stringify({
          points: this.form.num,
          add: this.form.add,
          addNum: this.form.addNum,
          max: this.form.max,
          save: this.form.save,
          dayNum: this.form.dayNum
        }))
          .then(resp => {
            this.$alert('更改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          });
      },
      tosign() {
        this.$router.push({ path: "/vip_sign" });
      },
      tologinLog() {
        this.$router.push({ path: "/vip_loginLog" });
      }
    }
  };
</script>

<style scoped>

</style>
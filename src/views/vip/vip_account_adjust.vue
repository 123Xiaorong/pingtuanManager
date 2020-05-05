<template>
    <div>
        <div style="margin-top: 10px;color: #626066">
            <div class="box" style="margin-left: 20px">当前会员: <span style="color: red"> {{nickname}}</span> </div>
        </div>
        <div style="margin-top: 10px">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="账户变动原因">
                    <el-input v-model="form.reason" size="small" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="可用资金账户">
                    <el-select v-model="form.available_capital" size="small" style="width: 120px;float: left">
                        <el-option label="增加" value="增加"></el-option>
                        <el-option label="减少" value="减少"></el-option>
                    </el-select>
                    <el-input size="small" v-model="form.availableCapital" style="width: 80px;float: left;margin-left: 10px"></el-input>
                    <div style="width: 80px;float: left;margin-left: 10px">当前值 $<span>{{available_capital}}</span></div>
                </el-form-item>
                <el-form-item label="冻结资金账户">
                    <el-select v-model="form.frozen_capital" size="small" style="width: 120px;float: left">
                        <el-option label="增加" value="增加"></el-option>
                        <el-option label="减少" value="减少"></el-option>
                    </el-select>
                    <el-input v-model="form.frozenCapital" size="small" style="width: 80px;float: left;margin-left: 10px"></el-input>
                    <div style="width: 80px;float: left;margin-left: 10px">当前值 $<span>{{frozen_capital}}</span></div>
                </el-form-item>
                <el-form-item label="等级积分账户">
                    <el-select v-model="form.addlevel" size="small" style="width: 120px;float: left">
                        <el-option label="增加" value="增加"></el-option>
                        <el-option label="减少" value="减少"></el-option>
                    </el-select>
                    <el-input v-model="form.level" size="small" style="width: 80px;float: left;margin-left: 10px"></el-input>
                    <div style="width: 80px;float: left;margin-left: 10px">当前值 <span>{{level}}</span></div>
                </el-form-item>
                <el-form-item label="消费积分账户">
                    <el-select v-model="form.consumption_points" size="small" style="width: 120px;float: left">
                        <el-option label="增加" value="增加"></el-option>
                        <el-option label="减少" value="减少"></el-option>
                    </el-select>
                    <el-input v-model="form.consumptionPoints" size="small" style="width: 80px;float: left;margin-left: 10px"></el-input>
                    <div style="width: 80px;float: left;margin-left: 10px">当前值 <span>{{consumption_points}}</span></div>
                </el-form-item>
            </el-form>
        </div>
        <el-button @click="submitData" style="margin-left: 150px" type="primary">提交</el-button>
    </div>
</template>

<script>
  export default {
    name: "vip_account_adjust",
    created() {
      var username = this.$route.query.username;
      this.$data.nickname = username;
      this.$axios.get(this.$host+"/groupmall/member/Account", { params: { username: username } })
        .then(response => {
          console.log(response.data.data);
          const resp = response.data;
          console.log(resp);
          this.$data.nickname = username;
          this.$data.available_capital = resp.available_capital;
          this.$data.frozen_capital = resp.frozen_capital;
          this.$data.level = resp.level;
          this.$data.consumption_points = resp.consumption_points;
        })
    },
    data() {
      return {
        nickname: 'XXX',
        available_capital: '0',
        frozen_capital: '0',
        level: '0',
        consumption_points: '0',
        form: {
          reason: "xxx",


          availableCapital: '0',
          frozenCapital: '0',
          level: '0',
          consumptionPoints: '0',

          available_capital: '',
          addlevel: '',
          frozen_capital: '',
          consumption_points: '',

        }
      }
    },
    methods: {
      submitData() {
        var ac = this.form.availableCapital;
        var le = this.form.level;
        var fc = this.form.frozenCapital;
        var cp = this.form.consumptionPoints;
        if (this.form.available_capital == "减少") {
          ac = -ac;
        }
        if (this.form.addlevel == "减少") {
          le = -le;
        }
        if (this.form.frozen_capital == "减少") {
          fc = -fc;
        }
        if (this.form.consumption_points == "减少") {
          cp = -cp;
        }
        console.log(cp);
        this.$axios.post(this.$host+"/groupmall/member/changeAccount/"+this.$data.nickname, JSON.stringify({
          availableCapital: ac,
          level: le,
          frozenCapital: fc,
          consumptionPoints: cp,
          reason:this.form.reason

        }))
          .then(response => {
            this.$alert('更改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.go(0);
              }
            });
          })
      },
    }
  }
</script>

<style scoped>

</style>
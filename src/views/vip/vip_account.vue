<template>
    <div>
        <div style="margin-top: 10px;color: #606266">
            <router-link
                    :to="{ path:'/vip_account_adjust',
                    query:{username:nickname }}">
            <el-button type="warning" @click="account_adjust" style="margin-left: 10px">调整会员账户</el-button>
            </router-link>
            <div class="box" >当前会员: <span style="color: red"> {{nickname}}</span> ,
                可用资金账户: <span style="color: red">{{available_capital}}</span> ,
                冻结资金账户: <span style="color: red">{{frozen_capital}}</span> ,
                等级积分账户: <span style="color: red">{{level}}</span> ,
                消费积分: <span style="color: red">{{consumption_points}}</span>
            </div>

        </div>
        <div style="clear: both">
            <div class="table">
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                label="账户变动时间"
                                width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.timedate }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="账户变动原因"
                                width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.reason }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="可用账户资金"
                                width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.available_capital }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="冻结账户资金"
                                width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.frozen_capital }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="等级积分账户"
                                width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.level}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="消费积分账户"
                                width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.consumption_points }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "vip_account",
    created() {
      var username = this.$route.query.username;
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
          for (var i = 0; i < resp.data.length; i++) {
            this.tableData.push({
              timedate: resp.data[i].timedate,
              reason: resp.data[i].reason,
              available_capital: resp.data[i].availableCapital,
              frozen_capital: resp.data[i].frozenCapital,
              level: resp.data[i].level,
              consumption_points: resp.data[i].consumptionPoints
            });
          }
        });
    },
    data() {
      return {
        nickname: "",
        available_capital: "",
        frozen_capital: "",
        level: "",
        consumption_points: "",
        tableData: [],
      };
    },
    methods: {

    }
  };
</script>

<style scoped>
    .box {
        margin-left: 10px;
        line-height: 40px;
    }
</style>
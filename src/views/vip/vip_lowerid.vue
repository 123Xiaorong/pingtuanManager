<template>
    <div>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%;color: #606266">
                <el-table-column
                        prop="level"
                        label="等级"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="积分下限"
                        width="180">
                    <!--<div style="text-align: center">上次设置<span>aaaa</span></div>-->

                    <template slot-scope="scope">

                        <el-input v-model="scope.row.lower" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="积分上限"
                        width="180">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.upper" size="small"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-button @click="submitData" style="margin-top: 10px;margin-left: 230px" type="primary">提交 </el-button>
    </div>
</template>

<script>
  export default {
    name: "vip_lowerid",
    created(){
      this.$axios.post(this.$host+"/groupmall/member/Level")
        .then(response => {
          // console.log(response.data.data);
          const resp = response.data;
          // console.log(resp);
          for(var i=0;i<3;i++){
            this.tableData.push({
              level:resp.data[i].level,
              upper:resp.data[i].upper,
              lower:resp.data[i].lower,
            });
          }
        })
    },
    data() {
      return {
        tableData: []
      }
    },
    methods:{
      submitData() {
        // console.log(this.tableData[0].upper);
        // console.log(this.tableData);
        for (let i=0;i<3;i++){
          this.tableData[i].upper=Number(this.tableData[i].upper);
          this.tableData[i].lower=Number(this.tableData[i].lower);
        }
        // console.log(this.tableData);
        this.$axios.post(this.$host+'/groupmall/member/changeLevel',(
           this.tableData
        ))
          .then(response => {
            this.$alert('更改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          })
      }
    }
  };
</script>

<style scoped>

</style>
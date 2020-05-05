<template>
    <div>
    <template>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="姓名"
                    width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.myusername}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="手机号"
                    width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.myconsigneee_tel}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="地址"
                    width="180">
                <template slot-scope="scope">
                    <span >{{ scope.row.myaddress}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            type="warning"
                            size="small"
                            @click="open(scope.$index, scope.row)" title="编辑" icon="el-icon-edit"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </template>
    </div>
</template>

<script>
  export default {
    name: "vip_address",
    created(){
      var username=this.$route.query.username;
      // var my="-1";
      console.log(username);
      this.$axios.get(this.$host+'/groupmall/member/Address',{params:{username:username}})
          .then(response => {
        // console.log(response.data);
        const resp =response.data;

        var Array=[];
            Array[0]=resp.address1;
            Array[1]=resp.address2;
            Array[2]=resp.address3;
            Array[3]=resp.address4;
            Array[4]=resp.address5;
        var ID=[];
            ID[0]=resp.address1Id;
            ID[1]=resp.address2Id;
            ID[2]=resp.address3Id;
            ID[3]=resp.address4Id;
            ID[4]=resp.address5Id;

        for(var i=0;i<resp.count;i++){
          this.tableData.push({
            myusername:resp.username,
            myconsigneee_tel:resp.tel,
            myaddress:Array[i],
            Addressid:ID[i]
          })
        }
      });
    },
    data() {
      return {
        tableData: [ ],
        username:""
      }
    },
    methods: {
      open(index, row) {
        // console.log(row.Addressid);
        this.$prompt('请输入地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          console.log(22);
          console.log(row.Addressid);
          console.log(value);
          this.$axios.post(this.$host+"/groupmall/member/updateAddress", JSON.stringify({
            id: row.Addressid, address: value,
          }))
            .then(resp => {
              this.$alert('更改成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.go(0);
                }
              });
            }).catch(() => {
          });
        })
      }
    }
  };
</script>

<style scoped>

</style>
<template>
    <div style="margin-top: 20px">
        <div class="search" style="margin: 10px 0 0 15px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="昵称">
                    <el-input v-model="formInline.nickname"
                              size="small"
                              clearable
                              @input.native="changeInput"
                              @change="Clean"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="onSubmit" size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table" style="min-width: 980px">
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            style="text-align: center"
                            label="id"
                            >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px;
                            width: 30px;
                            white-space:nowrap;
                            text-overflow:ellipsis;
                              overflow: hidden">{{ scope.row.myid }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="昵称"
                           >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.mynickname }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="积分"
                            >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.mypoints }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="签到时间"
                            >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.mysignin_time }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="small"
                                    type="danger"
                                    title="删除"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="block" style="text-align: center;margin-top: 10px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[3, 5, 8,]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  export default {
    name: "vip_loginLog",
    created(){
      this.$axios.get(this.$host+"/groupmall/member/SignLogByPage?page=1&limit=3",)
        .then(response => {
        console.log(response.data);
        const resp =response.data;
        for( var i=0;i<resp.data.length;i++){
          this.tableData.push({
            id:resp.data[i].id,
            myid:resp.data[i].userid,
            myavatar:resp.data[i].avatar,
            mynickname:resp.data[i].nickname,
            mysignin_time:resp.data[i].signin_time,
            mypoints:resp.data[i].points,
          })
        }
          this.$data.count=resp.count;
      });
    },
    data() {
      return {
        king:0,
        pageSize:1,
        pageSize2:1,
        currentSize:3,
        currentSize2:3,
        lis:0,
        count:"",
        formInline: {
          nickname: '',
        },
        tableData: []
      }
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row.id);
          this.$axios.delete(this.$host+'/groupmall/member/deleteSignLog?id='+row.id)
            .then(resp => {
            console.log(resp.data);
            console.log(1111);
              this.$router.go(0);
          });
        }).catch(() => {

        });

      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        console.log(this.king);
        if(this.king==1){
          this.currentSize2=val;
          this.onSubmit()
        }
        if(this.king==0){
          this.currentSize=val;
          this.xx()
        }
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        console.log(this.king);
        if(this.king==1){
          this.pageSize2=val;
          this.onSubmit()
        }
        if(this.king==0){
          this.pageSize=val;
          this.xx()
        }
      },
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      //   this.currentSize=val;
      //   console.log(this.currentSize);
      //   this.xx()
      // },
      // handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      //   this.pageSize=val;
      //   console.log(this.pageSize);
      //   this.xx()
      // },
      xx(){
        // console.log(this.pageSize);
        // console.log(this.currentSize);
        this.$axios.get(this.$host+'/groupmall/member/SignLogByPage?page='+this.pageSize+'&limit='+this.currentSize+'',)
          .then(response => {
            console.log(response.data);
            const resp =response.data;
            this.$data.tableData = [];
            for( var i=0;i<resp.data.length;i++){
              this.tableData.push({
                id:resp.data[i].id,
                myid:resp.data[i].userid,
                myavatar:resp.data[i].avatar,
                mynickname:resp.data[i].nickname,
                mysignin_time:resp.data[i].signin_time,
                mypoints:resp.data[i].points,
              })
            }
          });
      },
      onSubmit() {
        var nickname=this.formInline.nickname;
        this.king=1;
        this.$axios.get(this.$host+'/groupmall/member/SignLogByNickname?nickname='+nickname+'&page='+this.pageSize2+'&limit='+this.currentSize2+'', ({
        }))
          .then(response => {
            const resp =response.data;
            console.log(resp);
            this.$data.tableData = [];
            for (var i = 0; i < resp.count; i++) {
              console.log(resp.data[i].id);
              this.tableData.push({
                id:resp.data[i].id,
                myid: resp.data[i].userid,
                myavatar: resp.data[i].avatar,
                mynickname: resp.data[i].nickname,
                mysignin_time: resp.data[i].signin_time,
                mypoints: resp.data[i].points,
              });
              this.$data.count=resp.count;
            }
          })
      },
      changeInput() {
        this.$nextTick(() => {

          if (this.formInline.nickname==""){
            this.lis=0;
            console.log(this.lis)
          }else {
            this.lis=1;
            console.log(this.lis)
          }
          if(this.lis==0){
            this.king=0;
            this.pageSize=1;
            this. pageSize2=1;
            this.currentSize=3;
            this. currentSize2=3;
            this.$axios.get(this.$host+"/groupmall/member/SignLogByPage?page=1&limit=3",)
              .then(response => {
                console.log(response.data);
                const resp =response.data;
                this.$data.tableData = [];
                for( var i=0;i<resp.data.length;i++){
                  this.tableData.push({
                    id:resp.data[i].id,
                    myid:resp.data[i].userid,
                    myavatar:resp.data[i].avatar,
                    mynickname:resp.data[i].nickname,
                    mysignin_time:resp.data[i].signin_time,
                    mypoints:resp.data[i].points,
                  })
                }
                this.$data.count=resp.count;
              });
          }
        });
      },
      Clean(){
        this.$axios.get(this.$host+"/groupmall/member/SignLogByPage?page=1&limit=3",)
          .then(response => {
            console.log(response.data);
            const resp =response.data;
            this.$data.tableData = [];
            for( var i=0;i<resp.data.length;i++){
              this.tableData.push({
                id:resp.data[i].id,
                myid:resp.data[i].userid,
                myavatar:resp.data[i].avatar,
                mynickname:resp.data[i].nickname,
                mysignin_time:resp.data[i].signin_time,
                mypoints:resp.data[i].points,
              })
            }
            this.$data.count=resp.count;
          });
      }
    }
  };
</script>

<style scoped>

</style>
<template>
    <div>
        <div class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="昵称">
                    <el-input v-model="formInline.nickname" size="small" clearable @input.native="changeInput"  @change="Clean"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" style="margin-left: 10px;">
                    <el-input v-model="formInline.tel" size="small" clearable @input.native="changeInput"  @change="Clean"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 10px;">
                    <el-button type="success" @click="onSubmit()" size="small" >查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="id"
                            width="90">
                        <template slot-scope="scope">
                            <span style="
                            width: 30px;
                            white-space:nowrap;
                            text-overflow:ellipsis;
                              overflow: hidden
">{{ scope.row.myuserid }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="昵称"
                            width="130">
                        <template slot-scope="scope">
                            <span >{{ scope.row.mynickname }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="注册时间"
                            width="130">
                        <template slot-scope="scope">
                            <span >{{ scope.row.mydate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            width="110">
                        <template slot-scope="scope">
                            <span >{{ scope.row.myusername }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="性别"
                            width="60">
                        <template slot-scope="scope">
                            <span >{{ scope.row.mygender }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="地区"
                            width="130">
                        <template slot-scope="scope">
                            <span >{{ scope.row.mydistrict }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="手机号"
                            width="140">
                        <template slot-scope="scope">
                            <span >{{ scope.row.mytel }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <router-link
                                    :to="{ path:'/vip_address',
                                    query:{username:scope.row.myusername }}" >
                                <el-button
                                        size="small"
                                        type="success"
                                        icon="el-icon-view"
                                        title="收货地址"
                                        @click="address"></el-button>
                            </router-link>
                            <router-link
                                    :to="{ path:'/vip_account',
                                    query:{username:scope.row.myusername}}"
                            style="margin: 0 10px 0 10px">
                                <el-button
                                        size="small"
                                        type="info"
                                        icon="el-icon-s-finance"
                                        title="查看账目明细"
                                        @click="account"></el-button>
                            </router-link>
                            <el-button
                                    size="small"
                                    type="danger"
                                    icon="el-icon-delete"
                                    title="删除"
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
                    :page-sizes="[3, 5, 8]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  var b="";
  export default {
    name: "vip_manage",
    created(){
      this.$axios.get(this.$host+"/groupmall/member/MemberByPage?page=1&limit=3", ({
      })).then(response => {
          console.log(response.data);
          const resp =response.data;

          for( var i=0;i<resp.data.length;i++){
            this.tableData.push({
              myuserid:resp.data[i].userid,
              myavatar:resp.data[i].avatar,
              mynickname:resp.data[i].nickname,
              mydate:resp.data[i].registerTime,
              myusername:resp.data[i].username,
              mygender:resp.data[i].gender,
              mydistrict: resp.data[i].address,
              mytel:resp.data[i].tel,
            })
          }
        this.$data.count=resp.count;
      });
    },
    data() {
      return {
        count:"",
        tableData:[
        ],
        formInline: {
          nickname: '',
          tel: ''
        },
        pageSize:1,
        currentSize:3,
        lis:0,
        lis2:0,
      }
    },
    methods: {
        Clean(){
            this.$axios.get(this.$host+"/groupmall/member/MemberByPage?page=1&limit=3", ({
            })).then(response => {
              console.log(response.data);
              const resp =response.data;
              this.$data.tableData = [];
              for( var i=0;i<resp.data.length;i++){
                this.tableData.push({
                  myuserid:resp.data[i].userid,
                  myavatar:resp.data[i].avatar,
                  mynickname:resp.data[i].nickname,
                  mydate:resp.data[i].registerTime,
                  myusername:resp.data[i].username,
                  mygender:resp.data[i].gender,
                  mydistrict: resp.data[i].address,
                  mytel:resp.data[i].tel,
                })
              }
              this.$data.count=resp.count;
            });
          },
      onSubmit() {
        var name=this.formInline.nickname;
        var tel=this.formInline.tel;
        if (name==""){
          name=-1
        }
        if (tel==""){
          tel=-1
        }
        this.$axios.get(this.$host+'/groupmall/member/MemberByKey?nickname='+name+'&tel='+tel+'', ({
        }))
          .then(response => {
            const resp =response.data;
            this.$data.tableData = [];
              this.tableData.push({
                myuserid:resp.data.userid,
                myavatar:resp.data.avatar,
                mynickname:resp.data.nickname,
                mydate:resp.data.registerTime,
                myusername:resp.data.username,
                mygender:resp.data.gender,
                mydistrict: resp.data.address,
                mytel:resp.data.tel,
              });
            this.$data.count=resp.count;
          });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row.myuserid);
          this.$axios.delete(this.$host+'/groupmall/member/delectMemberById/'+row.myuserid)
           .then(resp => {
                console.log(resp.data);
            this.$router.go(0);
            });
        }).catch(() => {

        });

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentSize=val;
        console.log(this.currentSize);
        this.xx()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageSize=val;
        console.log(this.pageSize);
        this.xx()
      },
      xx(){
        this.$axios.get(this.$host+'/groupmall/member/MemberByPage?page='+this.pageSize+'&limit='+this.currentSize+'', ({
        }))
          .then(response => {
            console.log(response.data);
            const resp =response.data;
            this.$data.tableData = [];
            for( var i=0;i<resp.data.length;i++){
              this.tableData.push({
                myuserid:resp.data[i].userid,
                myavatar:resp.data[i].avatar,
                mynickname:resp.data[i].nickname,
                mydate:resp.data[i].registerTime,
                myusername:resp.data[i].username,
                mygender:resp.data[i].gender,
                mydistrict: resp.data[i].address,
                mytel:resp.data[i].tel,
              })
            }
          });
      },
      changeInput() {
        this.$nextTick(() => {
          if (this.formInline.nickname==""){
            this.lis=0;
          }else {
            this.lis=1;
          }
          // console.log(this.lis)
        });
        this.$nextTick(() => {
          if (this.formInline.tel==""){
            this.lis2=0;
          }else {
            this.lis2=1;
          }
          // console.log(this.lis2)
        });
        this.$nextTick(() => {
          if(this.lis==0&&this.lis2==0){
            // console.log(111);
            this.$axios.get(this.$host+"/groupmall/member/MemberByPage?page=1&limit=3", ({
            })).then(response => {
              console.log(response.data);
              const resp = response.data;
              this.tableData=[];
              for (var i = 0; i < resp.data.length; i++) {
                this.tableData.push({
                  myuserid: resp.data[i].userid,
                  myavatar: resp.data[i].avatar,
                  mynickname: resp.data[i].nickname,
                  mydate: resp.data[i].registerTime,
                  myusername: resp.data[i].username,
                  mygender: resp.data[i].gender,
                  mydistrict: resp.data[i].address,
                  mytel: resp.data[i].tel,
                })
              }
              this.$data.count = resp.count;
            })
          }
        });
      },
    },

  };

</script>

<style scoped>
    .search{
       margin: 20px 0 0 33px;
    }
</style>
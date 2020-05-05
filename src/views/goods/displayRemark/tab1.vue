<template>
  <div class="tab1">
    <div class="Row">
      <span style="font-size: 14px;margin-right: 5px">请输入评论内容:   </span>
      <el-input class="inputSize" style="width: 30%" placeholder="请输入评论内容" v-model="content" clearable size="small"></el-input>
      &nbsp;&nbsp;
      <el-button type="success" size="small" @click="searchC">搜索</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="comId" label="ID" width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName" label="用户名称" width="120"></el-table-column>
        <el-table-column label="评论内容" max-width="300" fit>
          <template slot-scope="scope">
            评论内容：{{ scope.row.content}}
            <br />
            评论商品：{{scope.row.proName}}
          </template>
        </el-table-column>
        <el-table-column prop="comDate" label="评论时间" width="170"></el-table-column>
        <el-table-column label="推荐" width="90">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.rate" @change="tuijianchange(scope.row)"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="90">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ifShow" @change="xianshichange(scope.row)"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="success" size="small" icon="el-icon-view" title="查看"></el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" title="删除" @click="deletecom(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Row">
      <div class="block fenye">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[3, 5, 7, 10]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tableData:[],
        limit:5,
        page: 1,
        count:'',
      content:'',
      multiArr:[],
    };
  },
  components: {},

  methods: {
    handleSizeChange(val) {
      this.limit=val;
      console.log(this);
      this.getAllPro(this.page,this.limit,this.content);
    },
    handleCurrentChange(val) {
      this.page=val;
      console.log(this);
      this.getAllPro(this.page,this.limit,this.content);
    },
    searchC(){
      this.getAllPro(this.page,this.limit,this.content);
    },
    getAllPro(a,b,c){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/comment/selectByPage',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{page:a,limit:b,content:c}
      }).then((resp)=>{
        console.log(resp.data);
        this.tableData=resp.data.data;
        this.count=resp.data.count;
      });},
      deletecom(c){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var comId=c.comId;
          console.log(comId);
          this.$axios({
            method:'post',
            url: this.$host+'/groupmall/power/comment/deleteOne',
            headers:{"Content-Type":"application/x-www-form-urlendcoded"},
            access_token:this.token,
            params:{comId:comId}
          }).then((resp)=>{
            console.log(resp.data.success);
          });
        }).catch(() => {
        });

      },
      handleSelectionChange(val) {
        this.multipleSelection=val;
        this.multiArr=[];
        for(var i=0;i<this.multipleSelection.length;i++){
          this.multiArr.push(this.multipleSelection[i].comId);
        }
        this.$emit('func',this.multiArr);
    },
    tuijianchange(e){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/comment/setRate',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{comId:e.comId}
      }).then((resp)=>{
        console.log(resp.data);
      });
    },
    xianshichange(e){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/comment/setShow',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{comId:e.comId}
      }).then((resp)=>{
        console.log(resp.data);
      });
    }
  },
  created(){
    this.$axios({
      method:'post',
      url: this.$host+'/groupmall/power/comment/selectByPage',
      headers:{"Content-Type":"application/x-www-form-urlendcoded"},
      access_token:this.token,
      params:{page:this.page,limit:this.limit}
    }).then((resp)=>{
      console.log(resp.data);
      this.tableData=resp.data.data;
      this.count=resp.data.count;
    });
  }
};
</script>

<style scoped>
#app{
        margin-left: 20px;
    }
    .sub_nav{
        padding: 10px 20px;
    }
    .fenye{
        text-align: center;
    }
    .Row{
        padding: 10px 0;
    }
    .inputSize{
        width: 40%;
    }
</style>
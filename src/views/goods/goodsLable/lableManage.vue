<template>
  <div class="labelManage">
    <!-- <el-tab-pane label="标签管理" name="first"> -->
    <div style="margin-top: 5px">
      <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
        <el-table-column
                type="selection">
        </el-table-column>
        <el-table-column label="ID" width="60" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.tagId }}</template>
        </el-table-column>
        <el-table-column prop="tagName" label="标签名称" width="120"> </el-table-column>
        <el-table-column prop="tagDesc" label="标签描述" fit width="450">
        </el-table-column>
        <el-table-column label="启用" width="120">
          <template slot-scope="scope">
          <el-switch
            v-model="scope.row.ifShow" @change="qiyongchange(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <router-link :to="{path:'/xiugaitags',query:{row:scope.row}}">
              <el-button @click="xiugai(scope.row)" type="warning" size="small"
                     icon="el-icon-edit" title="修改"></el-button>
            </router-link>
            <el-button type="danger" size="small" icon="el-icon-delete" style="margin-left: 10px"
                       title="删除" @click="deletetag(scope.row)">

            </el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Row" style="margin-top: 10px;text-align: center">
      <div class="block fenye">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[3, 5, 10]"
                :page-size="3"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count"
        ></el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      page:1,
      limit:5,
      count:'',
      multiArr:[],
    };
  },
  created(){
    this.$axios({
      method:'post',
      url: this.$host+'/groupmall/power/tags/selectByPage',
      headers:{"Content-Type":"application/x-www-form-urlendcoded"},
      access_token:this.token,
      params:{page:this.page,limit:this.limit}
    }).then((resp)=>{
      this.tableData=resp.data.data;
      this.count=resp.data.count;
  });
  },
  methods:{
    handleSizeChange(val) {
      this.limit=val;
      console.log(this);
      this.getAllPro(this.page,this.limit);
    },
    handleCurrentChange(val) {
      this.page=val;
      console.log(this);
      this.getAllPro(this.page,this.limit)
    },
    getAllPro(a,b){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/tags/selectByPage',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{page:a,limit:b }
      }).then((resp)=>{
        console.log(resp.data);
        this.tableData=resp.data.data;
        this.count=resp.data.count;
      });
    },
    deletetag(c){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var tagId=c.tagId;
        console.log(tagId);
        this.$axios({
          method:'post',
          url: this.$host+'/groupmall/power/tags/deleteOne',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{tagId:tagId}
        }).then((resp)=>{
          console.log(resp);
        });
      }).catch(() => {
      });

    },
    xiugai(c){

    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection=val;
      this.multiArr=[];
      for(var i=0;i<this.multipleSelection.length;i++){
        this.multiArr.push(this.multipleSelection[i].tagId);
      }
      this.$emit('func',this.multiArr);
    },
    qiyongchange(e){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/tags/setShow',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{tagId:e.tagId}
      }).then((resp)=>{
        console.log(resp.data);
      });
    }
  }
};
</script>
<style scoped>
/* #app {
  margin-left: 20px;
} */
.inputSize {
  width: 40%;
}
.Row > div {
  padding: 10px 0;
}
</style>

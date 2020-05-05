<template>
    <div>
        <div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column
                        prop="cateId"
                        label="分类ID"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="cateName"
                        label="分类名称"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="是否显示"
                        >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.ifShow" @change="xianshichange(scope.row)"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <router-link :to="{path:'/xiugaifenlei',query:{row:scope.row}}">
                            <el-button @click="xiugai(scope.row)" type="warning" size="small"
                                       icon="el-icon-edit" title="修改"></el-button>
                        </router-link>

                        <el-button type="danger" size="small" icon="el-icon-delete"
                                   title="删除" @click="deleteCate(scope.row)" style="margin-left: 10px"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="fenyeborder">
                <div class="block fenye" style="text-align: center">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[3,5, 10]"
                            :page-size="5"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="count"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "feileiguanli",
    props:{},
    data(){
      return{
        tableData: [],
        page:1,
        limit:5,
        count:'',
        ifShow1:true,
        ifShow2:false
      }
    },
    methods:{
      handleSizeChange(val) {
        this.limit=val;
        this.getAll(this.page,this.limit);
      },
      handleCurrentChange(val) {
        this.page=val;
        this.getAll(this.page,this.limit)
      },
      deleteCate(c){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var cateId=c.cateId;
          console.log(cateId);
          this.$axios({
            method:'post',
            url: this.$host+'/groupmall/power/category/deleteOne',
            headers:{"Content-Type":"application/x-www-form-urlendcoded"},
            access_token:this.token,
            params:{cateId:cateId}
          }).then((resp)=>{
            console.log(resp);
          });
        }).catch(() => {
        });

      },
      handleSelectionChange(val) {
        this.multipleSelection=val;
        this.multiArr=[];
        for(var i=0;i<this.multipleSelection.length;i++){
          this.multiArr.push(this.multipleSelection[i].cateId);
        }
        this.$emit('func',this.multiArr);
      },
      xianshichange(e){
        this.$axios({
          method:'post',
          url: this.$host+'/groupmall/power/category/setShow',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{cateId:e.cateId}
        }).then((resp)=>{
          console.log(resp.data);
        });
      },
      getAll(a,b){
        this.$axios({
          method:'post',
          url: this.$host+'/groupmall/power/category/selectByPage',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{page:a,limit:b}
        }).then((resp)=>{
          // console.log(resp.data);
          this.tableData=resp.data.data;
        });
      }

    },
    created(){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/category/selectByPage',
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
    .Row>div{
        padding: 10px 0;
    }
    .fenyeborder {
        margin-top: 10px;
    }
</style>
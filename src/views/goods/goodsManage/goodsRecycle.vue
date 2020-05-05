<template>
    <div class="goodsRecycle">
        <div style="margin-top: 10px;margin-bottom: 5px">
            <router-link to="/goodsManage">
                <el-button
                        type="primary"
                        icon="el-icon-s-cooperation">返回商品列表
                </el-button>
            </router-link>
            <el-button style="margin-left: 10px"
                       type="primary"
                       icon="el-icon-s-cooperation" @click="huanyuan">批量还原
            </el-button>
        </div>
        <div>
            <div>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="ID" width="100" show-overflow-tooltip>
                        <template slot-scope="scope">{{ scope.row.proId}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="proName"
                            label="商品名称"
                            fit
                    >
                    </el-table-column>
                    <el-table-column prop="cardId" label="货号" width="200">
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="140">
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                    @click="handleClick(scope.row)"
                                    type="primary"
                                    size="small"
                                    class="el-icon-s-cooperation"
                                    title="还原"
                            ></el-button>
                            <el-button type="danger" size="small"
                                       class="el-icon-delete"
                                       title="删除" @click="realDelete(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="fenyeborder">
                <div class="fenye">
                    <div class="block">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="page"
                                :page-sizes="[3, 5, 7, 10]"
                                :page-size="limit"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="count"
                        >
                        </el-pagination>
                    </div>
                </div>
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
        multipleSelection: [],
        page:1,
        limit:5,
        count:'',
        multiArr:[],
      };
    },
    methods:{
      handleSizeChange(val) {
        this.limit=val;
        // console.log(this);
        this.getAllPro(this.page,this.limit);
      },
      handleCurrentChange(val) {
        this.page=val;
        // console.log(this);
        this.getAllPro(this.page,this.limit)
      },
      handleSelectionChange(val) {
        this.multipleSelection=val;
        this.multiArr=[];
        for(var i=0;i<this.multipleSelection.length;i++){
          this.multiArr.push(this.multipleSelection[i].proId);
        }
        console.log(this.multiArr)
      },
      huanyuan(){
        this.$axios({
          method:'post',
          url: this.$host+'/groupmall/power/product/deleteBatch',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{ids:this.multiArr}
        }).then((resp)=>{
          console.log(resp);
        });
        this.$router.go(0);
      },
      handleClick(e){
        this.$axios({
          method:'post',
          url: this.$host+'/groupmall/power/product/deleteOne',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{proId:e.proId}
        }).then((resp)=>{
          console.log(resp)
        });
        this.$router.go(0);
      },
      realDelete(e){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method:'post',
            url: this.$host+'/groupmall/power/product/realDelete',
            headers:{"Content-Type":"application/x-www-form-urlendcoded"},
            access_token:this.token,
            params:{proId:e.proId}
          }).then((resp)=>{
            console.log(resp)
            this.$router.go(0);
          });
        }).catch(() => {

        });


      }
    },
    created(){
      console.log(this.page,this.limit);
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/product/recycle',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{page:this.page,limit:this.limit}
      }).then((resp)=>{
            console.log(resp);
            this.tableData=resp.data.data;
      });
    }
  };
</script>
<style scoped>
    .goodsRecycle {
        padding: 5px;
    }

    .searchinput {
        width: 150px;
    }

    .fenye {
        text-align: center;
    }

    .Row > div {
        padding: 10px 0;
    }

    .inputSize {
        width: 40%;
    }

    .fenyeborder {
        margin-top: 10px;
    }

    .floatL {
        float: left;
    }

    .paddL {
        width: 150px;
        padding-right: 10px;
    }

    .clearB {
        clear: both;
    }

    .TitleB {
        width: 100px;
        float: left;
    }
</style>

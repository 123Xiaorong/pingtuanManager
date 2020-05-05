<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="ID" width="120"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="配送区域名称" width="120"></el-table-column>
      <el-table-column  prop="address" label="所辖区域" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            @click="handleEdit(scope.row.id)"
            icon="el-icon-edit"
            title="修改"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            title="删除"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import localApi from '../../../api/local'
export default {
  data() {
    return {
      tableData: []
    };
  },

  created() {
    this.fetchDate();
  },
  methods: {
    fetchDate() {
      this.tableData=[]
      // localApi.getList().then(response=>{
      //   const resp = response.data
      //   if(resp.flag) {
      //     console.log(resp)
      //   }else {
      //      //失败提示信息
      //       this.$message({
      //         message: resp.message,
      //         type: "waring"
      //       });
      //   }
      // })
      this.$axios
        .get(
          this.$host+"/groupmall/setting/AreaOfDistributionSet?page=1&limit=10"
        )
        .then(response => {
          console.log(response.data.data);
          const resp = response.data;
          for (var i = 0; i < resp.data.length; i++) {
            this.tableData.push({
              id: resp.data[i].areaofdistributionsetId,
              name: resp.data[i].areaofdistributionsetAddress,
              address: resp.data[i].areaofdistributionsetBelongarea
            });
          }
        });
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
      this.multipleSelection = val;
    },
    handleDelete(id) {
      console.log("删除", id);
      this.$confirm('确认删除这条记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(()=>{
          localApi.deleteById(id).then(response=>{
            console.log(response.data)
            const resp = response.data
            if(resp){
              this.$alert('新增成功','新增提示信息', {
                confirmButtonText:'确定'
              })

              this.fetchDate()
            }
            
          // if(resp.flag){
          //   //删除成功，刷新列表
            
          // }
          })
        })
    },
    handleEdit(id) {
      console.log("修改", id);
    }
  }
};
</script>

<style scoped>
.cell {
  display: inline !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
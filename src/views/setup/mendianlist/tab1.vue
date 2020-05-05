<template>
  <div>
    <el-table ref="mendianTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column show-overflow-tooltip prop="physicalstoreId" label="ID" width="120"></el-table-column>
      <el-table-column prop="physicalstoreName" label="门店名称" width="120"></el-table-column>
      <el-table-column prop="physicalstoreTel" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="physicalstoreAddress" label="详细地址"></el-table-column>
      <el-table-column prop="physicalstoreDescribe" label="门店描述"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            @click="handleEdit(scope.row.physicalstoreId) "
            icon="el-icon-edit"
            title="修改"
          ></el-button>
          <!-- <el-button size="small" type="danger"  @click="handleDelete(scope.row.physicalstoreId)"
          icon="el-icon-delete"
                     title="删除"
          ></el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="门店编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :rules="rules"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width:400px"
        :model="pojo"
      >
        <el-form-item :disabled="true" label="ID" prop="physicalstoreId">
          <el-input v-model="pojo.physicalstoreId"></el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="physicalstoreName">
          <el-input v-model="pojo.physicalstoreName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="physicalstoreTel">
          <el-input v-model="pojo.physicalstoreTel"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="physicalstoreAddress">
          <el-input v-model="pojo.physicalstoreAddress"></el-input>
        </el-form-item>
        <el-form-item label="门店描述" prop="physicalstoreDescribe">
          <el-input v-model="pojo.physicalstoreDescribe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="addData('pojoForm')">确 定</el-button> -->
        <el-button type="primary" @click="updateData('pojoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mendianApi from "../../../api/mendianlist";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false, //控制对话框
      pojo: {
        physicalstoreId: "",
        physicalstoreName: "",
        physicalstoreTel: "",
        physicalstoreAddress: '',
        physicalstoreDescribe: ''
      },
      rules: {
        physicalstoreName: [
          { required: true, message: "门店名称不能为空", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios
        .put(
          this.$host+"/groupmall/setting/physicalStoreSet?page=1&limit=100"
        )
        .then(response => {
          console.log(response.data.data);
          const resp = response.data;
          for (var i = 0; i < resp.data.length; i++) {
            this.tableData.push({
              physicalstoreId: resp.data[i].physicalstoreId,
              physicalstoreName: resp.data[i].physicalstoreName,
              physicalstoreTel: resp.data[i].physicalstoreTel,
              physicalstoreAddress: resp.data[i].physicalstoreAddress,
              physicalstoreDescribe: resp.data[i].physicalstoreDescribe
            });
          }
        });
      // mendianApi.getList().then(response=>{
      //   const resp = response.data
      //   console.log(resp)
      //   this.tableData = resp
      // })
    },
    handleDelete(id) {
      console.log("删除", id);
    },
    handleEdit(id) {
      this.pojo = this.tableData.filter(item => {
        return item.physicalstoreId === id;
      })[0];
      this.dialogFormVisible = true;
      console.log("修改", id);
      console.log(this.pojo);
    },
    updateData(formName) {
      console.log("修改");
      // this.$refs[formName].validate(valid => {
      //   console.log(valid)
      //   if (valid) {

      //     console.log(this.pojo)
      //     //提交更新
      //     mendianApi.updateById(this.pojo).then(response => {
      //       // const resp = response.data;
      //       console.log(response);
      //       //刷新列表
      //         this.fetchData();
      //         this.dialogFormVisible = false;
      //         this.$message({
      //           message: "修改成功",
      //           type: "success"
      //         });
      //     });
      //   } else {
      //     return false;
      //   }
      // });
      // this.$axios.get('http://172.16.14.127:8080/groupmall/setting/physicalStoreSet',{

      this.$axios({
        method: "post",
        url:this.$host+"/groupmall/setting/physicalStoreSet/test",
        data: {
          physicalstoreId: this.$data.pojo.physicalstoreId,
          physicalstoreName: this.$data.pojo.physicalstoreName,
          physicalstoreTel: this.$data.pojo.physicalstoreTel,
          physicalstoreAddress:this.$data.pojo.physicalstoreAddress,
          physicalstoreDescribe:this.$data.pojo.physicalstoreDescribe
        }
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }).then(res => {
        console.log(res.data);
         this.dialogFormVisible = false;
              this.$alert(
                '修改成功', '修改内容提示', {
                  confirmButtonText: '确定'
                });
      });
    }
  }
  // watch: {
  //   '$route': 'fetchData'
  // }
};
</script>

<style scoped>
</style>
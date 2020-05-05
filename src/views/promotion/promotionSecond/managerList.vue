<template>
  <div class="managerList">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="adminId" label="编号" width="150" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="adminName" label="姓名" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="adminCreationdate" label="创建时间" width="170" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="adminLastlogtime" label="最近登录时间" width="170" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="adminAuth" label="角色" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <el-button
          type="success"
          size="small"
          icon="el-icon-view"
          title="查看"
          @click="checkDetail($event)"
        ></el-button>
        <el-button
          type="warning"
          size="small"
          title="修改"
          icon="el-icon-edit"
          @click="changeDetail($event)"
        ></el-button>
        <el-button
          type="danger"
          size="small"
          title="删除"
          icon="el-icon-delete"
          @click="deleteAlert($event)"
        ></el-button>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align:center;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import promotionPage from "../promotionPage";
import checkDetail from "./checkDetail";
import changeDetail from "./changeDetail";
export default {
  components: {
    // promotionPage: promotionPage,
    checkDetail: checkDetail,
    changeDetail: changeDetail
  },
  data() {
    return {
      num: 100,
      currentPage: 1,
      pageSize: 3,
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.$axios.get('http://172.16.14.10:8080/groupmall/admin/selectAllAdmin')
      // this.$axios
      //   .post("http://localhost:9808/initData.do")
      this.$axios.get(this.$host+"/groupmall/admin/selectAllAdmin")
        .then(response => {
          console.log(response.data);
          // this.$data.num=response.data.length;
          this.$data.tableData = [];
          // console.log(this.$data.currentPage);
          this.$data.pageSize = val;
          for (
            let i = (this.$data.currentPage - 1) * this.$data.pageSize;
            i <
            (this.$data.pageSize +
              (this.$data.currentPage - 1) * this.$data.pageSize <
            response.data.length
              ? this.$data.pageSize +
                (this.$data.currentPage - 1) * this.$data.pageSize
              : response.data.length);
            i++
          ) {
            this.$data.tableData.push(response.data[i]);
          }
          // console.log(this.$data.tableData)
          // this.$data.managerData=response.data;
          // console.log(this.$data.managerData)
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.$axios.get('http://172.16.14.10:8080/groupmall/admin/selectAllAdmin')
      // this.$axios
      //   .post("http://localhost:9808/initData.do")
      this.$axios.get(this.$host+"/groupmall/admin/selectAllAdmin")
        .then(response => {
          // console.log(response.data);
          // this.$data.num=response.data.length;
          this.$data.tableData = [];
          // console.log(this.$data.currentPage);
          // this.$data.pageSize=val
          // console.log(this.$data.pageSize*(val-1));
          this.$data.currentPage = val;
          // console.log(
          //   this.$data.pageSize +
          //     (this.$data.currentPage - 1) * this.$data.pageSize
          // );
          // console.log(response.data.length);
          // console.log(
          //   this.$data.pageSize +
          //     (this.$data.currentPage - 1) * this.$data.pageSize<response.data.length
          // );
          let x =
            this.$data.pageSize +
            (this.$data.currentPage - 1) * this.$data.pageSize;
          let y = response.data.length;
          // console.log(x<y?x:y)
          for (
            let i = (this.$data.currentPage - 1) * this.$data.pageSize;
            i <
            (this.$data.pageSize +
              (this.$data.currentPage - 1) * this.$data.pageSize <
            response.data.length
              ? this.$data.pageSize +
                (this.$data.currentPage - 1) * this.$data.pageSize
              : response.data.length);
            i++
          ) {
            this.$data.tableData.push(response.data[i]);
          }
          // console.log(this.$data.tableData.length)
          // this.$data.managerData=response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteAlert(event) {
      // console.log(event.currentTarget.parentElement.parentElement.parentElement.firstElementChild.innerText);
      let deleteId =
        event.currentTarget.parentElement.parentElement.parentElement
          .firstElementChild.innerText;
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteManage(deleteId);
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    deleteManage(deleteId) {
      // console.log(deleteId);
      // console.log("aaaa");
      // this.$axios({
      //   method: "post",
      //   url: "http://172.16.14.10:8080/groupmall/admin/deleteAdmin",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded", //设置请求头请求格式为JSON
      //     access_token: this.token //设置token 其中K名要和后端协调好
      //   },
      //   params: { adminId: deleteId }
      // }).then(response => {
      //   console.log(response.data);
      // });
      this.$axios({
        method: "post",
        // url: "http://localhost:9808/deleteData.do",
        url:this.$host+"/groupmall/admin/deleteAdmin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded" //设置请求头请求格式为JSON
          // access_token: this.token //设置token 其中K名要和后端协调好
        },
        params: { adminId: deleteId }
      }).then(response => {
        // console.log(response);
        // this.$axios
        //   .post("http://localhost:9808/initData.do")
        this.$axios.get(this.$host+"/groupmall/admin/selectAllAdmin")
          .then(response => {
            // console.log(response.data);
            sessionStorage.setItem("allData", JSON.stringify(response.data));
            this.$data.num = response.data.length;
            this.$data.tableData = [];
            this.$data.currentPage = 1;
            for (let i = 0; i < this.$data.pageSize; i++) {
              this.$data.tableData.push(response.data[i]);
            }
            // console.log(this.$data.tableData)
            // this.$data.managerData=response.data;
            // console.log(this.$data.managerData)
          })
          .catch(error => {
            console.log(error);
          }); //获取信息总数
      }).catch(error=>{console.log(error)});
    },
    checkDetail(event) {
      console.log(event.currentTarget.parentElement.parentElement.parentElement.firstElementChild.innerText)
      sessionStorage.setItem(
        "targetId",
        event.currentTarget.parentElement.parentElement.parentElement
          .firstElementChild.innerText
      );
      const h = this.$createElement;
      this.$msgbox({
        title: "查看管理员信息",
        message: h("checkDetail", null),
        showCancelButton: false,
        showConfirmButton: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false
        // beforeClose: (action, instance, done) => {
        //   if (action === "confirm") {
        //     instance.confirmButtonLoading = true;
        //     instance.confirmButton
        //       setTimeout(() => {
        //         instance.confirmButtonLoading = false;
        //       }, 300);
        //     }, 3000);
        //   } else {
        //     done();
        //   }
        // }
      })
        .then(action => {
          // this.$message({
          //   type: "info",
          //   message: "action: " + action
          // });
        })
        .catch(cancel => {
          console.log(cancel);
        });
    },
    changeDetail(event) {
      sessionStorage.setItem(
        "targetId2",
        event.currentTarget.parentElement.parentElement.parentElement
          .firstElementChild.innerText
      );
      sessionStorage.setItem("isChange", false);
      const h = this.$createElement;
      this.$msgbox({
        title: "修改管理员信息",
        message: h("changeDetail", null),
        showCancelButton: true,
        showConfirmButton: true,
        showClose: false,
        confirmButtonText: "保存",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            sessionStorage.setItem("changeDetail", true);
            done();
          } else {
            done();
          }
        }
        // beforeClose:()=>{
        //   console.log("aaaa");
        // }
      })
        .then(action => {
          // this.$message({
          //   type: "info",
          //   message: "action: " + action
          // });
        })
        .catch(cancel => {
          console.log(cancel);
        });
    }
  },
  props: {},
  created() {
    // this.$data.num=50
    (() => {
      setInterval(() => {
        console.log()
        if (sessionStorage.getItem("updateList") === "true") {
          // this.$axios
          //   .post("http://localhost:9808/initData.do")
          this.$axios.get(this.$host+"/groupmall/admin/selectAllAdmin")
            .then(response => {
              // console.log(response.data);
              sessionStorage.setItem("allData", JSON.stringify(response.data));
              this.$data.num = response.data.length;
              this.$data.tableData = [];
              for (let i = 0; i < this.$data.pageSize; i++) {
                this.$data.tableData.push(response.data[i]);
              }
              // console.log(this.$data.tableData)
              // this.$data.managerData=response.data;
              // console.log(this.$data.managerData)
            })
            .catch(error => {
              console.log(error);
            }); //获取信息总数
            sessionStorage.setItem("updateList",false);
        }
      }, 0);
    })();
    sessionStorage.setItem("targetId", "0");
    sessionStorage.setItem("targetId2", "0");
    this.$axios.get(this.$host+"/groupmall/admin/selectAllAdmin")
    // this.$axios
    //   .post("http://localhost:9808/initData.do")
      .then(response => {
        // console.log(response.data);
        sessionStorage.setItem("allData", JSON.stringify(response.data));
        this.$data.num = response.data.length;
        this.$data.tableData = [];
        for (let i = 0; i < this.$data.pageSize; i++) {
          this.$data.tableData.push(response.data[i]);
        }
        // console.log(this.$data.tableData)
        this.$data.managerData=response.data;
        // console.log(this.$data.managerData)
      })
      .catch(error => {
        console.log(error);
      }); //获取信息总数
  }
};
</script>
<style scoped>
/* .managerList{
  padding: 10px;
} */
</style>

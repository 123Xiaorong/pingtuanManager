<template>
  <div class="promotionJournal" style="color: #606266;margin-top: 10px">
    <div class="block">
      <span class="demonstration" style="font-size: 14px">日志筛选</span>
      <el-date-picker
        size="small"
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="center"
      >
      </el-date-picker>
      <el-button
        type="success"
        @click="journalSearch"
        size="small"
        style="margin-left:10px"
        >查询</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="logId" label="ID" width="180"> </el-table-column>
      <el-table-column prop="adminName" label="操作者" width="180">
      </el-table-column>
      <el-table-column prop="operationTime" label="操作时间"> </el-table-column>
      <el-table-column prop="address" label="IP地址"> </el-table-column>
      <el-table-column prop="operationRecords" label="操作记录"> </el-table-column>
    </el-table>
    <!-- <promotionPage /> -->
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
// import promotionPage from "./promotionPage";
export default {
  components: {
    // promotionPage: promotionPage
  },
  methods: {
    journalSearch() {
      // console.log(this.$data.value2[0].toLocaleDateString().split("/").join("-")+" "+this.$data.value2[0].toTimeString().split("G")[0]);
      // console.log(this.$data.value2[1].toLocaleDateString().split("/").join("-")+" "+this.$data.value2[1].toTimeString().split("G")[0]);
      let time1 =
        this.$data.value2[0]
          .toLocaleDateString()
          .split("/")
          .join("-") +
        " " +
        this.$data.value2[0].toTimeString().split("G")[0];
      let time2 =
        this.$data.value2[1]
          .toLocaleDateString()
          .split("/")
          .join("-") +
        " " +
        this.$data.value2[1].toTimeString().split("G")[0];
      // console.log(typeof time1)
      // console.log(typeof time2)
      this.$axios({
        methods: "get",
        url: this.$host+"/groupmall/adminLog/selectLogByTime",
        headers: {
          "Content-Type": "application/x-www-form-urlendcoded"
          // access_token:this.token
        },
        params: {
          timestamp1: time1,
          timestamp2: time2
        }
      }).then(response => {
        this.$data.num=response.data.count;
        this.$data.tableData=[];
        for(let i=0;i<response.data.logList.length;i++){
          response.data.logList[i].address="172.0.0.1";
          this.$data.tableData.push(response.data.logList[i]);
        }
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.$axios.get(this.$host+'/groupmall/admin/selectAllAdmin')
      // this.$axios
      //   .post("http://localhost:9808/initData.do")
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
      this.$axios.get(this.$host+'/groupmall/admin/selectAllAdmin')
      // this.$axios
      //   .post("http://localhost:9808/initData.do")
        .then(response => {
          console.log(response.data);
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
    }
  },
  props: {},
  data() {
    return {
      num: 100,
      currentPage: 1,
      pageSize: 3,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      tableData: []
    };
  },
  created() {
    // this.$axios.get("http://172.16.14.10:8080/groupmall/adminLog/selectLog",{parmas:{page:1,limit:5}})
    // // this.$axios
    // //   .post("http://localhost:9808/initData.do")
    //   .then(response => {
    //     console.log(response.data);
    //     sessionStorage.setItem("allData",JSON.stringify(response.data))
    //     this.$data.num = response.data.length;
    //     this.$data.tableData = [];
    //     for (let i = 0; i < this.$data.pageSize; i++) {
    //       this.$data.tableData.push(response.data[i]);
    //     }
    //     // console.log(this.$data.tableData)
    //     // this.$data.managerData=response.data;
    //     // console.log(this.$data.managerData)
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   }); //获取信息总数
    this.$axios({
      method: "get",
      // url: "http://localhost:9808/deleteData.do",
      url: this.$host+"/groupmall/adminLog/selectLog",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded" //设置请求头请求格式为JSON
        // access_token: this.token //设置token 其中K名要和后端协调好
      },
      params: { page: 1, limit: 5 }
    })
      .then(response => {
        // console.log(response.data.logList[0]);
        this.$data.num=response.data.count;
        this.$data.tableData=[];
        for(let i=0;i<response.data.logList.length;i++){
          response.data.logList[i].address="172.0.0.1";
          this.$data.tableData.push(response.data.logList[i]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.promotionJournal {
  margin-top: 5px;
}
.block {
  margin: 10px;
}
.block > span {
  margin-right: 5px;
}
</style>

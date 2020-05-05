<template>
  <!--抽奖详情-->
  <div class="allGroup" style="margin-top: 10px">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="团购编号" style="width:300px;margin-right: 10px" class="allGroupInput">
        <el-input v-model="form.groupId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="团购状态" class="allGroupInput">
        <el-select v-model="form.groupState" placeholder="请选择团购状态" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="allGroupInput" style="margin-left: -50px">
        <el-button type="success" @click="onSubmit" size="small">搜索</el-button>
        <!--<el-button size="small">取消</el-button>-->
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <!--<el-table :data="tableData"  ref="multipleTable" tooltip-effect="dark"-->
                <!--@selection-change="handleSelectionChange" style="width: 100%;text-align: center">-->
        <!--<el-table-column width="60" type="selection"></el-table-column>-->
      <el-table-column prop="id" label="团购编号" width="200"></el-table-column>
      <el-table-column prop="name" label="团长" width="100"> </el-table-column>
      <el-table-column prop="peopleNum" label="参团人数" width="100"> </el-table-column>
      <el-table-column prop="groupTime" label="拼团时间" width="360"> </el-table-column>
      <el-table-column prop="groupState" label="拼团状态"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-button type="success" style="padding: 6px 10px" icon="el-icon-view" title="查看"></el-button>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="text-align:center;margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'allGroup',
  components: {},
  props: {},
  data() {
    return {
      form: {
        groupId:'',
        groupStat:'',
      },
      tableData: [
        {
          id: "2011225010101",
          name: "王小虎",
          peopleNum: "34",
          groupTime:'2019-07-11 15:21  2019-07-11 15:21',
          groupState:'拼团成功'
        },
        {
          id: "2011225010101",
          name: "王小虎",
          peopleNum: "34",
          groupTime:'2019-07-11 15:21  2019-07-11 15:21',
          groupState:'拼团成功'
        },
        {
          id: "2011225010101",
          name: "王小虎",
          peopleNum: "34",
          groupTime:'2019-07-11 15:21  2019-07-11 15:21',
          groupState:'拼团成功'
        },
        {
          id: "2011225010101",
          name: "王小虎",
          peopleNum: "34",
          groupTime:'2019-07-11 15:21  2019-07-11 15:21',
          groupState:'拼团成功'
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
.allGroup {
  padding: 10px;
}
.allGroupInput {
  float: left;
}

</style>

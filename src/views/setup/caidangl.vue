<template>
  <div>
    <el-button type="primary" @click="handleAdd" style="margin-top:10px"
    icon="el-icon-plus"
    >新增</el-button>
    <el-table :data="tableData"  style="width: 100%">
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <el-image style="width: 100px; height: 100px" :src="url"></el-image>
      </el-table-column>
      <el-table-column prop="link" label="链接"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="warning" @click="handleEdit(scope.row.id)"
          icon="el-icon-edit"
                     title="修改"

          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currenPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="text-align:center;margin-top:20px"
    ></el-pagination>

    <!-- 新增 -->
    <el-dialog title="菜单新增" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :rules="rules"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width:400px"
        :model="pojo"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="pojo.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="pojo.link" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('pojoForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "乐士青柠檬口味",
          icon: "",
          link:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        }
      ],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      total: 0, //总记录数
      currenPage: 1, //当前页码
      pageSize: 10, //每页显示10条数据
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      pojo: {
        name: "",
        icon: "",
        link: ""
      }, //提交的对象
      rules: {
        //校验规则
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },

  components: {},

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleAdd() {
      // this.pojo = {}
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        //this.$nextTick()它是一个异步事件，当渲染结束之后，它的回调函数才会被执行
        //弹出窗口打开后，需要加载DOM，就需要花费一点时间，我们就应该等待它加载完DOM之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },
    handleEdit(id) {
      console.log("编辑", id);
    },
  }
};
</script>

<style scoped>
</style>
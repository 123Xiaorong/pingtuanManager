<template>
    <div>
        <div class="divFirst">
            <el-row>
                <!--<el-button type="primary">秒杀管理</el-button>-->
                <!--<el-button type="primary" style="margin-left: 10px">添加秒杀</el-button>-->

                <!--<el-button @click="toList" :type="listShow===false?'':'primary'">秒杀管理</el-button>-->
                <!--<el-button @click="toAdd" :type="addShow===false?'':'primary'">添加秒杀</el-button>-->

                <!--<router-link to="/seckillMain" active-class="active" style="margin-right: 10px">-->
                    <!--<el-button type="primary">秒杀管理</el-button>-->
                <!--</router-link>-->
                <router-link to="/seckillAdd" active-class="active" style="margin-right: 10px">
                    <el-button type="primary" style="margin-left: 10px" icon="el-icon-plus">添加秒杀</el-button>
                </router-link>
                <el-button
                        type="danger"
                        icon="el-icon-delete">批量删除
                </el-button
                >
                <el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>
            </el-row>
        </div>
        <seckillMainOne v-if="listShow===true"/>
        <!--<seckillAdd v-if="addShow===true"/>-->

    </div>
</template>

<script>
  import seckillMainOne from './seckillMainOne'
  import seckillAdd from './seckillAdd'
  export default {
    name: "seckillMain",
    components: {
      seckillMainOne:seckillMainOne,
      seckillAdd:seckillAdd,
    },
    data() {
      return {
        listShow:true,
        addShow:false,
      }
    },
    methods: {
      toList(){
        this.$data.listShow=true;
        this.$data.addShow=false;
      },
      toAdd(){
        this.$data.listShow=false;
        this.$data.addShow=true;
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
      }

    }
  }
</script>

<style scoped>
    .divFirst{
        margin-top: 10px;
        margin-left: 10px;
    }
</style>

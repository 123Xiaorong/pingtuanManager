<template>
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--<el-tab-pane label="用户列表" name="first">-->
    <!--<advertising></advertising>-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="新增广告" name="second">-->
    <!--<Newadvertising></Newadvertising>-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->

    <div class="advertisinglist">
        <!--<el-row style="margin-bottom: 10px">-->
            <!--<el-button @click="toList" :type="listShow===true?'':'primary'">用户列表</el-button>-->
            <!--<el-button @click="toAdd" :type="addShow===true?'':'primary'">新增广告</el-button>-->
        <!--</el-row>-->
        <router-link to="/adverAdd" active-class="active" style="margin-right: 10px">
            <el-button
                    type="primary"
                    icon="el-icon-plus"
            >新增广告
            </el-button
            >
        </router-link>
        <!--<el-button-->
                <!--type="danger"-->
                <!--icon="el-icon-delete">批量删除-->
        <!--</el-button-->
        <!--&gt;-->
        <!--<el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>-->

        <advertising v-if="listShow===true"/>
        <!--<Newadvertising v-if="addShow===true"/>-->
    </div>
</template>

<script>
  import advertising from './tac/advertising'
  import Newadvertising from './tac/Newadvertising'
  export default {
    name: "Advertisinglist",
    data() {
      return {
        // activeName: 'first'
        listShow:true,
        addShow:false
      };
    },
    components:{
      advertising:advertising,
      Newadvertising:Newadvertising,
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      toList(){
        this.$data.listShow=true;
        this.$data.addShow=false;
        // console.log(this.$data.listShow,this.$data.addShow)
      },
      toAdd(){
        this.$data.listShow=false;
        this.$data.addShow=true;
        // console.log(this.$data.listShow,this.$data.addShow)
      }
    },
  }
</script>

<style scoped>
    .advertisinglist{
        padding: 10px;
    }
</style>
<template>
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--<el-tab-pane label="文章列表" name="first">-->
    <!--<Thearticlelists/>-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="新增文章" name="second">-->
    <!--<newly></newly>-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->
    <div class="article">
        <el-row style="margin-bottom: 10px;">
            <!--<el-button @click="toList" :type="listShow===true?'':'primary'">文章列表</el-button>-->
            <!--<el-button @click="toAdd" :type="addShow===true?'':'primary'">新增文章</el-button>-->
            <router-link to="/articleAdd" active-class="active" style="margin-right: 10px">
                <el-button
                        type="primary"
                        icon="el-icon-plus"
                >新增文章
                </el-button
                >
            </router-link>
            <!--<el-button-->
                    <!--type="danger"-->
                    <!--icon="el-icon-delete">批量删除-->
            <!--</el-button-->
            <!--&gt;-->

            <!--<el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>-->

        </el-row>
        <Thearticlelists v-if="listShow===true"/>
        <!--<newly v-if="addShow===true"/>-->
    </div>

</template>

<script>
  import Thearticlelists from './tab/Thearticlelists'
  import newly from './tab/newly'
  import modification from './tab/modification'
  export default {
    name: "Addend",
    data(){
      return {
        // activeName: 'first'
        listShow:true,
        addShow:false
      };
    },
    components:{
      Thearticlelists:Thearticlelists,
      newly:newly,
      modification:modification
    },
    methods: {
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
    }
  }
</script>

<style scoped>
    .article{
        padding: 10px;
    }
    .t_liebiao{
        /*border: 1px solid rebeccapurple;*/
        font-size: 18px;
        margin:20px 0 0 30px;
    }
    .t_guanli{
        /*border: 1px solid red;*/
        font-size: 16px;
        margin:15px 0 0 30px;
    }
</style>
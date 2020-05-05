<template>
  <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--&lt;!&ndash;<el-tab-pane label="列表" name="first">&ndash;&gt;-->
      <!---->
    <!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-tab-pane label="添加" name="second">&ndash;&gt;-->
      <!--&lt;!&ndash;<tabtwo/>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
    <!---->
    <!---->
  <!--</el-tabs>-->

  <div>
    <div style="margin-bottom: 5px;margin-top: 10px">
      <router-link to="/shezhi/peisongAdd" active-class="active" >
        <el-button
                type="primary"
                icon="el-icon-plus"
        >添加配送
        </el-button
        >
      </router-link>
        <!--<el-button  icon="el-icon-close" style="margin-left: 10px">取消选择</el-button>-->
    </div>

    <tabone/>
  </div>
</template>

<script>
import tabone from './peisonglocal/tab1'
import tabtwo from './peisonglocal/tab2'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },

  components: {
    tabone,tabtwo
  },

  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    }
  }
}
</script>

<style scoped>
</style>
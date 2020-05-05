<template>
  <div class="navbar">
      <el-menu
      :router = "true"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1" v-if="promotionNo[0]==='1'?true:false">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goodsManage">商品管理</el-menu-item>
          <el-menu-item index="/sortManage">分类管理</el-menu-item>
          <el-menu-item index="/goodsLable">商品标签</el-menu-item>
          <el-menu-item index="/displayRemark">用户评论</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" v-if="promotionNo[1]==='1'?true:false">
        <template slot="title">
          <i class="el-icon-medal-1"></i>
          <span>促销</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/CouponManagement">优惠券管理</el-menu-item>
          <el-menu-item index="/seckillMain">限时秒杀</el-menu-item>
          <el-menu-item index="/luckDrawMain">幸运抽奖</el-menu-item>
          <!--<el-menu-item index="1-2">助力活动</el-menu-item>-->
          <el-menu-item index="/cardManage">卡券管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" v-if="promotionNo[2]==='1'?true:false">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/dingdanlist">订单列表</el-menu-item>
          <el-menu-item index="/tuangou">团购列表</el-menu-item>
          <el-menu-item index="/fahuodan">发货单列表</el-menu-item>
          <!--<el-menu-item index="1-2">退货单列表</el-menu-item>-->
          <el-menu-item index="/piliangfahuo">批量发货</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4" v-if="promotionNo[3]==='1'?true:false">
        <template slot="title">
          <i class="el-icon-s-comment"></i>
          <span>广告</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/adr/article">文章管理</el-menu-item>
          <el-menu-item index="/adr/Thearticleclassification">文章分类</el-menu-item>
          <el-menu-item index="/adr/Advertisinglist">广告管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5" v-if="promotionNo[4]==='1'?true:false">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>会员</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/vip_manage">会员管理</el-menu-item>
          <el-menu-item index="/vip_lowerid">会员等级</el-menu-item>
          <el-menu-item index="/vip_sign">签到管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6" v-if="promotionNo[5]==='1'?true:false">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span>权限</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/manager">管理员列表</el-menu-item>
          <el-menu-item index="/journal">管理员日志</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7" v-if="promotionNo[6]==='1'?true:false">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/shezhi/shangdianshezhi">商店设置</el-menu-item>
          <el-menu-item index="/shezhi/caidangl">菜单管理</el-menu-item>
          <el-menu-item index="/shezhi/zhifumethod">支付方式</el-menu-item>
          <el-menu-item index="/shezhi/peisongmethod">配送方式</el-menu-item>
          <el-menu-item index="/shezhi/peisonglocal">配送区域</el-menu-item>
          <el-menu-item index="/shezhi/mendianlist">门店列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      promotionNo:"",
    }
  },
  created(){
    // console.log(sessionStorage.getItem("myPromotion").length);
    this.$data.promotionNo=sessionStorage.getItem("myPromotion");
    // console.log(7-this.$data.promotionNo.length)
  if(this.$data.promotionNo.length!==7){
    for(let i=0;i<7-sessionStorage.getItem("myPromotion").length;i++){
      // console.log(i);
      this.$data.promotionNo="0"+this.$data.promotionNo;
      // console.log(this.$data.promotionNo)
    }
  }

    // this.$data.promotionNo="1111110";
  },
  components: {},

  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style scoped>
.el-menu {
    border-right: none;
}
/* .el-submenu {
    margin-left: -30px;
} */
</style>
import Vue from "vue";
import Router from "vue-router";
import Layout from "./components/Layout.vue";
// import Sdsetup from "./views/setup/shangdianset.vue"
// import Caidangl from "./views/setup/caidangl.vue"
// import zhifumethod from "./views/setup/zhifumethod.vue"
// import manager from "./views/promotion/manager"
import home from "../src/components/index"
// =============================促销===========================
import CouponManagement from "./views/jurisdiction/counpon/CouponManagement"
import couponAdd from "./views/jurisdiction/counpon/couponAdd"
import couponAddTwo from "./views/jurisdiction/counpon/couponAddTwo"
import couponAddThree from "./views/jurisdiction/counpon/couponAddThree"
import couponAddFour from "./views/jurisdiction/counpon/couponAddFour"
import couponLook from "./views/jurisdiction/counpon/couponLook"
import couponGrant from "./views/jurisdiction/counpon/couponGrant"
import couponEdit from "./views/jurisdiction/counpon/counponEdit"
import seckillMain from "./views/jurisdiction/Seckill/seckillMain"
import seckillAdd from "./views/jurisdiction/Seckill/seckillAdd"
import seckillEdit from "./views/jurisdiction/Seckill/seckillEdit"
import luckDrawMain from "./views/jurisdiction/luckDraw/luckDrawMain"
import luckDrawAdd from "./views/jurisdiction/luckDraw/luckDrawAdd"
import luckDrawEdit from "./views/jurisdiction/luckDraw/luckDrawEdit"
import cardManage from "./views/jurisdiction/card/cardManage"
import luckyGroupManage from "./views/jurisdiction/luckDraw/luckyGroupManage"
import winningUsers from "./views/jurisdiction/luckDraw/winningUsers"
import InternalDeter from "./views/jurisdiction/luckDraw/InternalDeter"

// ===========================设置=========================================
import Sdsetup from "./views/setup/shangdianset.vue"
import Caidangl from "./views/setup/caidangl.vue"
import zhifumethod from "./views/setup/zhifumethod.vue"
import peisongmethod from "./views/setup/peisongmethod.vue"
import peisonglocal from "./views/setup/peisonglocal.vue"
import mendianlist from "./views/setup/mendianlist.vue"
// import peisongAdd from "./views/setup/peisonglocal/tab1"
import peisongAdd from "./views/setup/peisonglocal/tab2"
import mendianAdd from "./views/setup/mendianlist/tab2"

// ===========================广告=========================================
import article from "./views/adr/article.vue"
import Thearticleclassification from "./views/adr/Thearticleclassification.vue"
import Advertisinglist from "./views/adr/Advertisinglist.vue"
import Gamend from "./views/adr/tac/Gamend"
import xiugai from "./views/adr/tab/xiugai"
import articleAdd from "./views/adr/tab/newly"
import adverAdd from "./views/adr/tac/Newadvertising"

// ===========================权限=========================================
import manager from "./views/promotion/manager"
import journal from "./views/promotion/journal"
import managerAdd from "./views/promotion/promotionSecond/managerAdd"

// ===========================会员=========================================
import vip_manage from "./views/vip/vip_manage.vue"
import vip_account from "./views/vip/vip_account.vue"
import vip_account_adjust from "./views/vip/vip_account_adjust.vue"
import vip_address from "./views/vip/vip_address.vue"
import vip_lowerid from "./views/vip/vip_lowerid.vue"
import vip_sign from "./views/vip/vip_sign.vue"
import vip_loginLog from "./views/vip/vip_loginLog.vue"
// import vip_partner from "./views/vip/vip_partner.vue"
// import vip_modPartner from "./views/vip/vip_modPartner.vue"
// import vip_endManage from "./views/vip/vip_endManage.vue"
// import vip_end from "./views/vip/vip_end.vue"

// ===========================订单=========================================
import dingdanlist from "./views/order/dingdanlist"
import dingdanxiangqing from "./views/order/dingdanxiangqing"
import dingdantuikuan from "./views/order/tuikuan"
import tuangou from "./views/order/tuangou"
import tuangouxiangqing from "./views/order/tuangouxiangqing"
import fahuodan from "./views/order/fahuodan"
import fahuodanxiangqing from "./views/order/fahuodanxiangqing"
import piliangfahuo from "./views/order/piliangfahuo"

// ===========================商品=========================================
import login from "./views/login/login"
import goodsManage from "./views/goods/goodsManage"
import sortManage from "./views/goods/sortManage"
import goodsLable from "./views/goods/goodsLable"
import displayRemark from "./views/goods/displayRemark"
import goodsAdd from "./views/goods/goodsManage/goodsAdd"
import goodsRecycle from "./views/goods/goodsManage/goodsRecycle"
import sortAdd from "./views/goods/sortManagezujian/tianjiafeilei"
import goodLableAdd from "./views/goods/goodsLable/labelAdd"
import xiugaifenlei from "./views/goods/sortManagezujian/xiugaifenlei"
import xiugaitags from "./views/goods/goodsLable/xiugaitags"
import xiugaigoods from "./views/goods/goodsManage/xiugaigoods"


Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: home
        }
      ]
    },
    //  //====================== 促销==================================
// 优惠券管理
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/CouponManagement',
          component: CouponManagement,
          meta: {title: '优惠券管理'},
        }
      ]
    },
    // 添加优惠券
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/couponAdd',
          component: couponAdd,
          meta: {title: '添加优惠券-用户团长优惠发放'},
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/couponAddTwo',
          component: couponAddTwo,
          meta: {title: '添加优惠券-订单发放'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/couponAddThree',
          component: couponAddThree,
          meta: {title: '添加优惠券-商品发放'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/couponAddFour',
          component: couponAddFour,
          meta: {title: '添加优惠券-积分兑换'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/couponLook',
          component: couponLook,
          meta: {title: '查看优惠券使用'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/couponGrant',
          component: couponGrant,
          meta: {title: '优惠券发放'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/couponEdit',
          component: couponEdit,
          meta: {title: '优惠券修改'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/seckillMain',
          component: seckillMain,
          meta: {title: '限时秒杀'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/seckillAdd',
          component: seckillAdd,
          meta: {title: '添加秒杀'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/seckillEdit',
          component: seckillEdit,
          meta: {title: '修改秒杀'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/luckDrawMain',
          component: luckDrawMain,
          meta: {title: '幸运抽奖'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/luckDrawAdd',
          component: luckDrawAdd,
          meta: {title: '添加抽奖'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/luckDrawEdit',
          component: luckDrawEdit,
          meta: {title: '修改抽奖'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/cardManage',
          component: cardManage,
          meta: {title: '卡券管理'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/luckyGroupManage',
          component: luckyGroupManage,
          meta: {title: '抽奖详情--抽奖团购管理'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/winningUsers',
          component: winningUsers,
          meta: {title: '查看中奖用户'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/InternalDeter',
          component: InternalDeter,
          meta: {title: '内定抽奖'}
        }
      ]
    },

    //====================== 设置==================================
    {
      path:"/shezhi",
      component: Layout,
      children: [
        {
          path:'/shezhi/shangdianshezhi',  // '/member/'
          component:Sdsetup,
          meta: {title: '商店设置'}
        },
      ]
    },

    {
      path: '/shezhi',
      component: Layout,
      children: [
        {
          path: '/shezhi/caidangl',
          component: Caidangl,
          meta: {title: '菜单管理'}
        }
      ]
    },
    {
      path: '/shezhi',
      component: Layout,
      children: [
        {
          path: '/shezhi/zhifumethod',
          component: zhifumethod,
          meta: {title: '支付方式'}
        }
      ]
    },
    {
      path: '/shezhi',
      component: Layout,
      children: [
        {
          path: '/shezhi/peisongmethod',
          component: peisongmethod,
          meta: {title: '配送方式'}
        }
      ]
    },
    {
      path: '/shezhi',
      component: Layout,
      children: [
        {
          path: '/shezhi/peisonglocal',
          component: peisonglocal,
          meta: {title: '配送区域'}
        }
      ]
    },
    {
      path: '/shezhi',
      component: Layout,
      children: [
        {
          path: '/shezhi/peisongAdd',
          component: peisongAdd,
          meta: {title: '添加配送'}
        }
      ]
    },
    // {
    //   path: '/shezhi',
    //   component: Layout,
    //   children: [
    //     {
    //       path: '/shezhi/peisongTwo',
    //       component: peisongTwo,
    //       meta: {title: '配送'}
    //     }
    //   ]
    // },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/mendianAdd',
          component: mendianAdd,
          meta: {title: '添加门店'}
        }
      ]
    },
    {
      path: '/shezhi',
      component: Layout,
      children: [
        {
          path: '/shezhi/mendianlist',
          component: mendianlist,
          meta: {title: '门店列表'}
        }
      ]
    },
    //  //====================== 广告==================================
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/adr/article',
          component: article,
          meta: {title: '文章列表'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/adr/Thearticleclassification',
          component: Thearticleclassification,
          meta: {title: '文章分类'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/adr/Advertisinglist',
          component: Advertisinglist,
          meta: {title: '广告列表'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/adverAdd',
          component: adverAdd,
          meta: {title: '添加广告'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/xiugai',
          component: xiugai,
          meta: {title: '文章修改'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/Gamend',
          component: Gamend,
          meta: {title: '广告修改'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/articleAdd',
          component: articleAdd,
          meta: {title: '添加文章'}
        }
      ]
    },

    //===========================权限==============================
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/manager',
          component: manager,
          meta: {title: '权限管理'}
        },
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/journal',
          component: journal,
          meta: {title: '管理员日志'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/managerAdd',
          component: managerAdd,
          meta: {title: '添加管理员'}
        }
      ]
    },
    //====================== 会员==================================
//会员管理
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/vip_manage',
          component: vip_manage,
          meta: {title: '会员管理'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/vip_address',
          component: vip_address,
          meta: {title: '会员管理'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/vip_lowerid',
          component: vip_lowerid,
          meta: {title: '会员积分'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/vip_loginLog.vue',
          component: vip_loginLog.vue,
          meta: {title: '签到日志'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/vip_account',
          component: vip_account,
          meta: {title: '会员账户明细'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/vip_account_adjust',
          component: vip_account_adjust,
          meta: {title: '调整会员账户'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/vip_sign',
          component: vip_sign,
          meta: {title: '签到管理'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/vip_loginLog',
          component: vip_loginLog,
          meta: {title: '签到日志'}
        }
      ]
    },
    // {
    //   path: '/',
    //   component: Layout,
    //   children: [
    //     {
    //       path: '/vip_partner',
    //       component: vip_partner,
    //       meta: {title: '社区合伙人'}
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Layout,
    //   children: [
    //     {
    //       path: '/vip_modPartner',
    //       component: vip_modPartner,
    //       meta: {title: '添加/修改合伙人'}
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Layout,
    //   children: [
    //     {
    //       path: '/vip_endManage',
    //       component: vip_endManage,
    //       meta: {title: '结算管理'}
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Layout,
    //   children: [
    //     {
    //       path: '/vip_end',
    //       component: vip_end,
    //       meta: {title: '结算详情'}
    //     }
    //   ]
    // },

    // ===========================订单=========================================

    //订单管理
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/dingdanlist',
          component: dingdanlist,
          meta: {title: '订单列表'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/dingdanxiangqing',
          component: dingdanxiangqing,
          meta: {title: '订单详情'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/dingdantuikuan',
          component: dingdantuikuan,
          meta: {title: '退款管理'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/tuangou',
          component: tuangou,
          meta: {title: '团购列表'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/tuangouxiangqing',
          component: tuangouxiangqing,
          meta: {title: '团购详情'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/fahuodan',
          component: fahuodan,
          meta: {title: '发货单管理'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/fahuodanxiangqing',
          component: fahuodanxiangqing,
          meta: {title: '发货单详情'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/piliangfahuo',
          component: piliangfahuo,
          meta: {title: '批量发货'}
        }
      ]
    },

// ===========================商品=========================================
    {
      path: '/login',
      name:'/login',
      component: login,
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/goodsManage',
          component: goodsManage,
          meta: {title: '商品管理'},
          children:[

          ]
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/goodsRecycle',
          component: goodsRecycle,
          meta: {title: '商品回收站列表'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/goodsAdd',
          component: goodsAdd,
          meta: {title: '添加商品'},
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/sortManage',
          component: sortManage,
          meta: {title: '分类管理'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/sortAdd',
          component: sortAdd,
          meta: {title: '添加分类'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/goodsLable',
          component: goodsLable,
          meta: {title: '商品标签'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/goodLableAdd',
          component: goodLableAdd,
          meta: {title: '添加标签'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/displayRemark',
          component: displayRemark,
          meta: {title: '商品评论'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/xiugaifenlei',
          component: xiugaifenlei,
          meta: {title: '修改分类'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/xiugaitags',
          component: xiugaitags,
          meta: {title: '修改标签'}
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/xiugaigoods',
          component: xiugaigoods,
          meta: {title: '修改商品'}
        }
      ]
    },


  ]
});

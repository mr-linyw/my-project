import Vue from 'vue'
import Routers from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/views/Home'
import AssetAllocation from '@/views/asset-allocation/AssetAllocation'
import FOFbuild from '@/views/asset-allocation/FOFbuild'
import MacroData from '@/views/asset-allocation/MacroData'
import ResearchReport from '@/views/asset-allocation/ResearchReport'
import Details from '@/views/asset-allocation/Details'
Vue.use(Routers)

export default new Routers({


  routes:
  [
      {
        path: '/',
        name: 'Login',
        component: Login,
        redirect:"/views/Home",//默认跳转到首页
      },
      {
            path:"/views/Home",
            name:'Home',
            component:Home,
            meta: { title: "个人中心" }
      },

      {
        path: '/views/asset-allocation/Details',
        name: 'Details',
        component: Details,
      },

      {
            path:"/views/asset-allocation",
            name:'Home-All',
            component:Home,
            children:[
              {
                    path:"AssetAllocation",
                    name:'AssetAllocation',
                    component:AssetAllocation,
                    meta: { title: "资产配置服务-资产配置" }
              },
              {
                    path:"FOFbuild",
                    name:'FOFbuild',
                    component:FOFbuild,
                    meta: { title: "资产配置服务-FOF构建" }
              },
              {
                    path:"ResearchReport",
                    name:'ResearchReport',
                    component:ResearchReport,
                    meta: { title: "资产配置服务-研究报告" }
              },
              {
                    path:"MacroData",
                    name:'MacroData',
                    component:MacroData,
                    meta: { title: "资产配置服务-宏观数据" }
              },

            ]
      },

      {

        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: "错误页面" }
      }
  ]


  // routes: [
  //   {
  //     path: '/',
  //     name: 'Login',
  //     component: Login
  //   },
  //   {
  //     path: 'Home',
  //     name: 'Home',
  //     component: Home
  //   },
  // ]
})

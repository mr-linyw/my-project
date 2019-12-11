<template>

    <a-layout>
        <a-layout-header >
          <a-row>
               <a-col :span="12">
                 <div class="a-layout-header-img">
                   <img  src="@/assets/logo4.png">
                    <strong style="font-size:20px" >资产配置服务</strong>　
                 </div>

               </a-col>
               <a-col :span="1">　　　           　
               </a-col>
               <a-col :span="5"></a-col>
               <a-col :span="6" class="a-layout-header-box">
  　　　            <!-- <span  style="font-size:15px" >帮助中心</span>　　 -->
                    <!-- <a-dropdown>
                        <a class="ant-dropdown-link" href="#"><font color="white"> <span style="font-size:15px">linyawei</span> <a-icon type="down" /></font> </a>
                        <a-menu slot="overlay" @click="onClick">
                          <a-menu-item key="1">1st menu item</a-menu-item>
                          <a-menu-item key="2">2nd menu item</a-menu-item>
                          <a-menu-item key="3">3rd menu item</a-menu-item>
                        </a-menu>
                      </a-dropdown> -->
               </a-col>
          </a-row>
        </a-layout-header>
        <a-layout-content class="a-layout-content-tabs">

          <div class="a-layout-content-div">
            <a-tabs v-model="activeKey" size="small" :tabBarGutter=10 type="card" @change="handleClick">
              <a-tab-pane    v-for="(item) in atableTabs"
                :key="item.name"
                :tab="item.title"

              >
            </a-tab-pane>
          </a-tabs>
           </div>
        </a-layout-content>

        <a-layout-footer class="a-layout-footer-router">
            <router-view />
        </a-layout-footer>
    </a-layout>


</template>

<script>
  export default {
    data() {
      return {
        atableTabs: [{
        title: '研究报告',
        name: '1',
        content: ''
      }, {
        title: '宏观数据',
        name: '2',
        content: ''
      },
      {
      title: '资产配置',
      name: '3',
      content: ''
    }, {
      title: 'FOF构建',
      name: '4',
      content: ''
    }
    ],

        activeKey:"1",
        url: {
          AssetAllocation : "/views/asset-allocation/AssetAllocation",
          FOFbuild : "/views/asset-allocation/FOFbuild",
          MacroData : "/views/asset-allocation/MacroData",
          ResearchReport : "/views/asset-allocation/ResearchReport",
        },
      };
    },
    created() {
      var that = this
       that.handleClick("1");
      // getAction(that.url.queryICode, {pCode:that.queryParam.pCode}).then(res => {
      //     if (res.success) {
      //         that.queryICodeModel = res.result
      //     }
      // })
      // getAction(that.url.queryCustomerSacCode, {}).then(res => {
      //     if (res.success) {
      //         that.queryCustomerSacCodeModel = res.result
      //           //that.$set(that.queryParam,"pCode",that.queryCustomerSacCodeModel[0]);
      //       that.loadData();
      //     }
      // })
  },
    methods: {
      onClick(){

      },
      handleClick(activeKey) {
        let that = this;
        if(that.activeKey=="1"){
             this.$router.replace(that.url.ResearchReport);
        }
        if(that.activeKey=="2"){
             this.$router.replace(that.url.MacroData);
        }
        if(that.activeKey=="3"){
             this.$router.replace(that.url.AssetAllocation);
        }
        if(that.activeKey=="4"){
             this.$router.replace(that.url.FOFbuild);
        }


      },
    },

}
</script>
<style>
.a-layout{
  height: 876px;
}
.a-layout-header-box {
   text-align: right;
 }
.ant-layout-header{
    text-align: left;
    background: #F56C6C !important;
    color: #fff;

  }
 .a-layout-header-img{
   text-align: left;

   height: 65px;
 }
 .a-layout-content-tabs {
    padding-left: 3%;
    padding-right: 3%;
    margin-top: 10px;
    height: 20px;
  }
  .a-layout-footer-router{
    margin-top: -5px;
    height: 100%;
  }

.el-tabs__item{
height: 38px !important;
color:#000000 !important;
}
  .ant-tabs-tab-active.ant-tabs-tab{
  background:#F56C6C !important;
  color: #fff !important;
  }
  .ant-tabs-nav-scroll{
    height: 38px !important;

  }
</style>

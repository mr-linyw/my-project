<template>

    <a-layout>
        <a-layout-header >
          <div class="a-layout-header-img">
            <img  src="@/assets/顶部-中信建投LOGO.png">&#12288;
            <img  src="@/assets/顶部-分割线.png">&#12288;
             <strong style="font-size:17px" >资产配置服务</strong>　
          </div>

  　　　            <!-- <span  style="font-size:15px" >帮助中心</span>　　 -->
                    <!-- <a-dropdown>
                        <a class="ant-dropdown-link" href="#"><font color="white"> <span style="font-size:15px">linyawei</span> <a-icon type="down" /></font> </a>
                        <a-menu slot="overlay" @click="onClick">
                          <a-menu-item key="1">1st menu item</a-menu-item>
                          <a-menu-item key="2">2nd menu item</a-menu-item>
                          <a-menu-item key="3">3rd menu item</a-menu-item>
                        </a-menu>
                      </a-dropdown> -->

        </a-layout-header>
        <a-layout-content >

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

        <a-layout-footer>
            <router-view v-wechat-title="$route.meta.title"/>
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
  padding: 0px 10px;
  height: 42px;
  text-align: left;
  /* background: #F56C6C !important; */
  color: #fff;
  background-image: url('../assets//顶部BG切图.png');
}
.a-layout-header-img{
 line-height: 42px;
 text-align: left;
 height: 42px;
}
.ant-layout-content{
  padding: 0px 10px;
  height: 37px;
}
.ant-tabs .ant-tabs-top .ant-tabs-small .ant-tabs-card .ant-tabs-no-animation{
  height: 37px !important;
}
.el-tabs__item{
height: 38px !important;
color:#000000 !important;
}
.ant-tabs-nav-wrap .ant-tabs-tab{
  background: #E5E5EA !important;
}
.ant-tabs-nav-wrap .ant-tabs-tab:hover{
  color: #696969 !important;
}
.ant-tabs-tab-active.ant-tabs-tab{
background:#CD3833 !important;
/* background-image: url('../assets//顶部BG切图.png') !important; */
color: #fff !important;
}
.ant-tabs-nav-container{
    height: 30px !important;
}
.ant-tabs{
  height: 30px;
}
.ant-tabs-tab{
line-height: 30px !important;
}
.ant-tabs-nav-scroll{
  height: 30px !important;
}
.a-layout-content-div{
  height: 30px;
  margin-top: 7px;
}
.ant-layout-footer{
  height: 890px;
  padding: 0px 10px;
}


</style>

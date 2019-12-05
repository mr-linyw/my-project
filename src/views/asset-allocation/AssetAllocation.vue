<template>
  <div class="AssetAllocation">
    <div class="AssetAllocation-content">
    <div class="an-tools">
        <div class="boxGroup">
          <span>资产配置方法</span>
          <a-select defaultValue="3" :style="selectStyle"  @change="tnhChange">
            <a-select-option v-for="item in tnhData" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
          </a-select>
        </div>
      <div class="boxGroup">
        <span>货币现金上限</span>
        <a-select defaultValue="4" :style="selectStyle" :disabled="disableYhgModel" @change="yhgChange">
          <a-select-option v-for="item in yhgData" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
        </a-select>
      </div>
      <a-button class="configBtn" type="round" :style="configBtnStyle" @click="configClick">配置</a-button>
    </div>
    <div class="an-content-1Row">
      <an-panel panelTitle="各期资产配置结果">
        <r-aa></r-aa>
      </an-panel>
    </div>
    <div class="an-content-2Row">
      <an-panel panelTitle="实际历史模拟净值表现"></an-panel>
    </div>
    <div class="an-content-3Row">
      <div class="an-content-1Col">
        <an-panel panelTitle="策略风险特征PK-收益波动回撤"></an-panel>
      </div>
      <div class="an-content-2Col">
        <an-panel panelTitle="策略风险特征PK-风险调整后收益指标"></an-panel>
      </div>
    </div>
    <div class="an-content-4Row">
      <an-panel panelTitle="最新大类资产配置权重"></an-panel>
    </div>
    <div class="an-content-5Row">
      <an-panel panelTitle="可交易FOF组合构建">
        <a-collapse  v-model="activeKey" @change="changeActivekey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="股票型" key="1" >

          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" @change="changeActivekey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="债券型" key="2" >
            <grid-and-line-by-g-p></grid-and-line-by-g-p>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" @change="changeActivekey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="商品型" key="3" >
            1234
          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" @change="changeActivekey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="现金型" key="4" >
            1234
          </a-collapse-panel>
        </a-collapse>
      </an-panel>
    </div>
  </div>
    <Modal :show="isShowInfoModal" @confirm="modalOK" @close="modalClose" :showConfirm="true" :showCancle="true" title="免责声明">
      <div class="infoContent" slot="body">
        <div style="text-align: left">
          投资有风险，本网页的任何数据及其衍生产品仅供参考。资产配置平台系统依据市场公开数据及外购数据源作为计算基础数据，本公司将会尽力但不保证基础数据的及时性、准确性、真实性和完整性，不承担因任何数据不准确或遗漏等造成的任何损失或损害的责任。投资者在依据相关信息进行投资操作时，应当进行自主判断，所导致的盈亏由投资者自行承担。浏览本页面或使用本功能即表示投资者同意所载免责声明。
        </div>
        <div class="infoCheckBoxContent">
          <a-checkbox  :checked="infoContentCheckbox" @change="infoContentChange">下次不再提示</a-checkbox>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  import '@/style/assetallocation.css'
  import anPanel from '@/components/AssetAllocation/anPanel'
  import gridAndLineByGP from '@/components/AssetAllocation/gridAndLineByGP'
  import rAa from '@/components/AssetAllocation/rAa'
  import echartsUtil from '@/echartsUtil/echartsUtil'
  import Modal from '@/modal/Modal'
  import data from '@/store/testLocalData';
  import moment from 'moment';
  export default {
    components : {
      echartsUtil,
      anPanel,
      Modal,
      rAa,
      gridAndLineByGP
    },
    data() {
      return {
          selectStyle:"width: 125px;height: 30px;",
          configBtnStyle:" margin-left: 65px",
          disableYhgModel:true,
          infoContentCheckbox:false,
          isShowInfoModal:false,
          activeKey:['1','2','3','4'],
          tnhData:[
            {text:"推荐配置",value:"3"},
            {text:"固定权重组合",value:"4"},
            {text:"最大收益",value:"0"},
            {text:"最大夏普",value:"1"},
            {text:"最小方差",value:"2"},
          ],
        yhgData:[
          {text:"0%",value:"0"},
          {text:"20%",value:"1"},
          {text:"40%",value:"2"},
          {text:"50%",value:"3"},
          {text:"100%",value:"4"},
        ]

      }
    },
    created(){
      console.log(data.raa);
    },
    methods:{
      modalOK(){
          if(this.infoContentCheckbox){
            localStorage.setItem("infoContentShow","0");
          }
          this.isShowInfoModal = false;
      },
      modalClose(){
        this.isShowInfoModal = false;
      },
      configClick(){
          if(localStorage.getItem("infoContentShow") !== "0"){
            this.infoContentCheckbox = false;
            this.isShowInfoModal = true;
          }
      },
      infoContentChange(e){
        this.infoContentCheckbox = e.target.checked
      },
      tnhChange(value){
        this.disableYhgModel = value === "3" || value === "4";
      },
      yhgChange(value){

      }
    },
  };
</script>


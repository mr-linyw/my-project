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
        <a-select defaultValue="1" :style="selectStyle" :disabled="disableYhgModel" @change="yhgChange">
          <a-select-option v-for="item in yhgData" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
        </a-select>
      </div>
      <a-button class="configBtn" type="round" :style="configBtnStyle" @click="configClick">配置</a-button>
    </div>
    <div class="an-content-1Row">
      <an-panel panelTitle="各期资产配置结果">
        <r-aa :baseConfig="baseConfigParams"></r-aa>
      </an-panel>
    </div>
    <div class="an-content-2Row">
      <an-panel panelTitle="实际历史模拟净值表现">
        <e-line type="1" :params="allocationResultData"></e-line>
      </an-panel>
    </div>
    <div class="an-content-3Row">
      <div class="an-content-1Col">
        <an-panel panelTitle="策略风险特征PK-收益波动回撤">
          <e-bar :params="resultOfRisk_l"></e-bar>
        </an-panel>
      </div>
      <div class="an-content-2Col">
        <an-panel panelTitle="策略风险特征PK-风险调整后收益指标">
          <e-bar :params="resultOfRisk_r"></e-bar>
        </an-panel>
      </div>
    </div>
    <div class="an-content-4Row">
      <an-panel panelTitle="最新大类资产配置权重">
        <div class="pieContent">
          <div class="Row4_left"><e-pie :params="pieData"></e-pie></div>
          <div class="Row4_right">
            <span>{{newNetValue}}</span>
          </div>
        </div>
      </an-panel>
    </div>
    <div class="an-content-5Row">
      <an-panel panelTitle="可交易FOF组合构建">
        <a-collapse  v-model="activeKey" @change="changeActivekey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="股票型" key="1" >
            <grid-and-line-by-g-p></grid-and-line-by-g-p>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" @change="changeActivekey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="债券型" key="2" >
            <grid-and-line-by-z-q></grid-and-line-by-z-q>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" @change="changeActivekey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="商品型" key="3" >
              <span style="font-size: 14px;color: #4c5264">无构建商品组合</span>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" @change="changeActivekey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="现金型" key="4" >
            <a-table
              :bordered="true"
              :columns="cashColume"
              :dataSource="[{fundCode:'070008.OF',fundName:'嘉实货币基金',fundManager:'庄园、张明',lastMonthReturn:'2.55%',latestSize:'100%'}]"
            />
          </a-collapse-panel>
        </a-collapse>
      </an-panel>
    </div>
      <div class="an-content-6Row">
        <warning-info></warning-info>
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
  import gridAndLineByZQ from '@/components/AssetAllocation/gridAndLineByZQ'
  import warningInfo from '@/components/AssetAllocation/warningInfo'
  import eLine from '@/components/AssetAllocation/eLine'
  import eBar from '@/components/AssetAllocation/eBar'
  import ePie from '@/components/AssetAllocation/ePie'
  import rAa from '@/components/AssetAllocation/rAa'
  import echartsUtil from '@/echartsUtil/echartsUtil'
  import Modal from '@/modal/Modal'
  import moment from 'moment';
  import WarningInfo from "../../components/AssetAllocation/warningInfo";
  export default {
    components : {
      WarningInfo,
      eLine,
      echartsUtil,
      anPanel,
      Modal,
      rAa,
      eBar,
      ePie,
      gridAndLineByGP,
      gridAndLineByZQ
    },
    data() {
      return {
           baseConfigParams:{
              cm:null,  //资产配置方法
              cl:null   //货币现金上线
           },
          cashColume:[
            {
              title: '基金代码',
              dataIndex: 'fundCode',
            },
            {
              title: '基金名称',
              dataIndex: 'fundName',
            },
            {
              title: '基金经理',
              dataIndex: 'fundManager',
            },
            {
              title: '上月业绩',
              dataIndex: 'lastMonthReturn',
            },
            {
              title: '基金权重',
              dataIndex: 'latestSize',
            },
          ],
          newNetValue:"暂无数据...",
          pieData:[], //资产净值图形最新一条数据
          resultOfRisk_l:[],//策略风险特征PK
          resultOfRisk_r:[], //策略风险特征PK
          allocationResultData:[],  //资产净值图形数据
          selectStyle:"width: 125px;height: 30px;",
          configBtnStyle:" margin-left: 35px",
          disableYhgModel:true,
          infoContentCheckbox:false,
          isShowInfoModal:false,
          activeKey:['1','2','3','4'],
          cm:"3",
          cl:"1",
          tnhData:[
            {text:"推荐配置",value:"3"},
            {text:"固定权重组合",value:"4"},
            {text:"最大收益",value:"0"},
            {text:"最大夏普",value:"1"},
            {text:"最小方差",value:"2"},
          ],
        yhgData:[
          {text:"0%",value:"0"},
          {text:"20%",value:"0.2"},
          {text:"40%",value:"0.4"},
          {text:"50%",value:"0.5"},
          {text:"100%",value:"1"},
        ]

      }
    },
    created(){
      //策略风险特征PK
      this.$http.get(this.$url.resultOfRisk).then(result => {
        this.do_resultOfRisk_l(result);
        this.do_resultOfRisk_r(result);
      });
    },
     watch:{
        baseConfigParams(val){
          //资产净值图形数据
          let cm = this.baseConfigParams.cm;
          let cl = this.baseConfigParams.cl;
          this.$http.get(this.$url.allocationResult + "/"+cm+"/"+cl+"").then(result => {
            this.do_allocationResultData(result);
            this.do_pieData(result[result.length-1]);
          });
        }
     },
    methods:{
      do_pieData(result){
        let params = {
          legend: null,
          series:[
            {
              type:'pie',
              data: [],
              minAngle: 5,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
              avoidLabelOverlap: true,   //是否启用防止标签重叠策略
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: '{b}{d}%',
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
            },
          ]
        };
        params.series[0].data.push({value:result["cash"],name:"现金",itemStyle:{color:"#A5A5DD"}});
        params.series[0].data.push({value:result["hushen"],name:"股票",itemStyle:{color:"#7AB2E4"}});
        params.series[0].data.push({value:result["govBondTri"],name:"债券",itemStyle:{color:"#F1B088"}});
        params.series[0].data.push({value:result["windCommodity"],name:"商品",itemStyle:{color:"#95DED9"}});
        this.newNetValue = "最新净值："+ result["netValue"];
        this.pieData = params;
      },
      do_resultOfRisk_r(result){
        let params = {
          legend: null,
          xAxis : [
            {
              type: 'category',
              data: ["策略sharp","策略收益回撤比"],
              axisLabel: {
                color: '#777',
              },
              axisLine:{
                lineStyle:{
                  color:"#ccc"
                }
              }
            }
          ],
          series:[
            {
              type: 'bar',
              symbol: 'none',
              data: [],
              barMaxWidth:158,
              itemStyle:{
                color:"#35acff",
              }
            },
          ]
        };
        params.series[0].data.push(result[0]["sr"]*100);
        params.series[0].data.push(result[0]["rmax"]*100);
        this.resultOfRisk_r = params;
      },
      do_resultOfRisk_l(result){
        let params = {
          legend: null,
          xAxis : [
            {
              type: 'category',
              data: ["策略年化收益","策略年化波动率","策略月度最大回撤"],
              axisLabel: {
                color: '#777',
              },
              axisLine:{
                lineStyle:{
                  color:"#ccc"
                }
              }
            }
          ],
          series:[
            {
              type: 'bar',
              symbol: 'none',
              barMaxWidth:158,
              data: [],
              itemStyle:{
                color:"#35acff"
              }
            },
          ]
        };
        params.series[0].data.push(result[0]["rann"]*100);
        params.series[0].data.push(result[0]["vol"]*100);
        params.series[0].data.push(result[0]["maxdd"]*100);
        this.resultOfRisk_l = params;
      },
      do_allocationResultData(result){
        let params = {
          legend: {
            data:['资产净值'],
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            textStyle:{
              color:"#777"
            }
          },
          xAxis : [
            {
              type: 'category',
              data: [],
              axisLabel: {
                color: '#777',
                rotate: '35'
              },
              axisLine:{
                lineStyle:{
                  color:"#ccc"
                }
              }
            }
          ],
          series:[
            {
              name: '资产净值',
              type: 'line',
              symbol: 'none',
              data: [],
              itemStyle:{
                color:"#35acff"
              }
            },
          ]
        };
        for (let item of result){
          moment.locale('en', {
            months : [
              "一月", "二月", "三月", "四月", "五月", "六月", "七月",
              "八月", "九月", "十月", "十一月", "十二月"
            ]
          });
          let formatM = moment(item.tradeDate).format("MMMM YYYY");
          params.xAxis[0].data.push(formatM);
          params.series[0].data.push(Number(item.netValue).toFixed(4));
        }
        this.allocationResultData = params;
      },
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
          if(this.cm === "3" || this.cm === "4"){
            this.baseConfigParams = {cm:this.cm ,cl:0};
          }else{
            this.baseConfigParams = {cm:this.cm ,cl:this.cl};
          }

      },
      infoContentChange(e){
        this.infoContentCheckbox = e.target.checked
      },
      tnhChange(value){
        this.disableYhgModel = value === "3" || value === "4";
        this.cm = value;
      },
      yhgChange(value){
        this.cl = value;
      }
    },
  };
</script>


<template>
  <div class="fofbuild">
    <div class="fofbuild-top">

      <a-form layout="inline">
      <a-collapse  v-model="activeKey" >
        <template v-slot:expandIcon="props" >
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>

          <a-collapse-panel header="股票型" key="1" >
              <a-row :gutter="24">
                   <a-col :md="5" :sm="8">
                     <a-form-item label="风格偏好">
                       <a-select style="width:100px" @change="handleChange" v-model="params.stylePreference">
                         <a-select-option v-for="item in stylePreferenceOption" :key="item.key">{{item.value}}</a-select-option>
                       </a-select>
                    </a-form-item>
                   </a-col>

                   <a-col :md="5" :sm="8">
                     <a-form-item label="规模偏好">
                       <a-select style="width:120px" @change="handleChange" v-model="params.stockSizeRequirement">
                         <a-select-option v-for="item in sizeRequirementOption" :key="item.key">{{item.value}}</a-select-option>
                       </a-select>
                    </a-form-item>
                   </a-col>

                   <a-col :md="6" :sm="8">
                     <a-form-item label="是否包含指数增强型基金">
                       <a-select  style="width:100px" @change="handleChange" v-model="params.isIndexEnhanced">
                         <a-select-option v-for="item in isIndexEnhancedOption" :key="item.key">{{item.value}}</a-select-option>
                       </a-select>
                    </a-form-item>
                   </a-col>
                   <a-col :md="6" :sm="24">
                       <el-button size="mini" type="danger" round class="btn-fof" @click="stockFOFbuild">构建FOF</el-button>
                   </a-col>
               </a-row>

               <!-- table -->
               <template >
                 <div class="table-svg">
                   <a-table :columns="columns" :dataSource="stockTableData" :pagination='false' @change="handleChange" bordered>

                   </a-table>
                 </div>

                </template>

               <!-- 图表 -->

            <div class="fofbuild-top-echartsUtil">
               <echartsUtil :id="'1'" :data="stockOption" style="height:252px;"></echartsUtil>
            </div>

          </a-collapse-panel>


       </a-collapse>
       <div class="kg"></div>
       <!-- @change="changeActivekey" -->
       <a-collapse  v-model="activeKey"  >
         <template v-slot:expandIcon="props" >
           <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
         </template>
        <a-collapse-panel header="债券型" key="1"  >
          <a-row :gutter="24">


               <a-col :md="5" :sm="8">
                 <a-form-item label="规模偏好">
                   <a-select defaultValue ="0" style="width:120px"  @change="handleChange" v-model="params.bondSizeRequirement">
                      <a-select-option v-for="item in sizeRequirementOption" :key="item.key">{{item.value}}</a-select-option>
                   </a-select>
                </a-form-item>
               </a-col>


               <a-col :md="6" :sm="24">
                   <el-button size="mini" type="danger" round class="btn-fof" @click="bondFOFbuild">构建FOF</el-button>
               </a-col>
           </a-row>

           <!-- table -->
           <template>
             <div class="table-svg">
               <a-table :columns="columns" :dataSource="bondTableData" :pagination='false' @change="handleChange" bordered>

               </a-table>
             </div>
            </template>

           <!-- 图表 -->

        <div class="fofbuild-top-echartsUtil">
           <echartsUtil :id="'2'" :data="bondOption" style="height:252px;"></echartsUtil>
        </div>

        <!-- 提示 -->
         <div class="fofbuild-footer">

           <li><span style="color:#F56C6C"><strong>风险提示</strong></span></li>
           <li><span>尊敬的客户：</span></li>
           <li><span>
             在您获得本资产配置平台系统结论并用于实际投资时，可能会获得较高的投资收益，
             但同时也可能存在着较大的证券投资风险。请务必仔细阅读本系统平台的使用说明。
             我们将尽可能采取有效措施保护客户资料和其他各项活动的安全，本着对您负责的态度，
             公司郑重提示，在使用时，存在且不限于以下风险：<a href="javascript:viewDetails;">查看详情</a>

           </span></li>

         </div>

        </a-collapse-panel>
      </a-collapse>
   </a-form>
    </div>
    <!-- 声明modal模板 -->
    <modal :typeValue="typeValue" :show="isShowInfoModal" @confirm="modalOK" @close="modalClose" :showConfirm="true" :showCancle="true" title="免责声明">
    <div class="infoContent" slot="body">
      <div style="text-align: left">
        投资有风险，本网页的任何数据及其衍生产品仅供参考。资产配置平台系统依据市场公开数据及外购数据源作为计算基础数据，本公司将会尽力但不保证基础数据的及时性、准确性、真实性和完整性，不承担因任何数据不准确或遗漏等造成的任何损失或损害的责任。投资者在依据相关信息进行投资操作时，应当进行自主判断，所导致的盈亏由投资者自行承担。浏览本页面或使用本功能即表示投资者同意所载免责声明。
      </div>
      <div class="infoCheckBoxContent">
        <a-checkbox  :checked="infoContentCheckbox" @change="infoContentChange">下次不再提示</a-checkbox>
      </div>
    </div>
  </modal>
  </div>



</template>

<script>
import '@/style/fofbuild.css'
import moment from 'moment';
import echartsUtil from '@/echartsUtil/echartsUtil'
import modal from '@/modal/Modal'
import {twoOption} from '@/echartsUtil/echartsOptions'


  export default {
    components : {
      echartsUtil,modal
    },

    data() {
      return {
        dateMap:[],
        blueMap:[],
        redMap:[],
        stylePreferenceOption:[{key:0,value:"大盘型"},{key:1,value:"中盘型"},{key:2,value:"小盘型"}],
        sizeRequirementOption:[{key:0,value:"无要求"},{key:1,value:"2亿以上"},{key:2,value:"10亿以上"}],
        isIndexEnhancedOption:[{key:0,value:"否"},{key:1,value:"是"}],
        params:{   //请求参数
          stylePreference:0,
          stockSizeRequirement:0,
          bondSizeRequirement:0,
          isIndexEnhanced:1,
         },
        stockTableData:[],//股票型table
        bondTableData:[],//债券型table
        moment,
        activeKey:[1,2],
        sortedInfo:null, //table 排序
        filteredInfo:null, //table 过滤
        infoContentCheckbox:false,
        isShowInfoModal:false,
        //图表数据
        stockdata:[],
        stockOption:{},

        bonddata:[],
        bondOption:{},
        typeValue:'',
    }
  },
    computed:{
      columns(){
        let { sortedInfo, filteredInfo } = this;
       sortedInfo = sortedInfo || {};
       filteredInfo = filteredInfo || {};
       const columns = [

        {
          title: '基金代码',
          align:'center',
          dataIndex: 'fundCode',
          key: 'fundCode',
          // filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
          // filteredValue: filteredInfo.name || null,
          // onFilter: (value, record) => record.name.includes(value),
          sorter: (a, b) => a.fundCode.split(".")[0] - b.fundCode.split(".")[0],
          customRender: (text, row, index) => {
              return <a href="javascript:;">{text}</a>;
          },
        },
        {
          title: '基金名称',
          align:'center',
          dataIndex: 'fundName',
          key:'fundName',
          sorter: (a, b) => a.fundName.length - b.fundName.length,
          customRender: (text, row, index) => {
              return <a href="javascript:;">{text}</a>;
          },
        },
        {
          title: '基金经理',
          align:'center',
          dataIndex: 'fundManager',
          key: 'fundManager',
          sorter: (a, b) => a.fundManager.length - b.fundManager.length,
          customRender:(text, row, index) => {
            return <a href="javascript:;">{text}</a>;
          }
        },
        {
          title: '基金类型',
          align:'center',
          dataIndex: 'fundType',
          key: 'fundType',
          sorter: (a, b) => a.fundType.length - b.fundType.length,
        },
        {
          title: '发行时间',
          align:'center',
          dataIndex: 'issueDate',
          key: 'issueDate',
          sorter: (a, b) => moment(a.issueDate) > moment(b.issueDate),
        },
        {
          title: '上月业绩',
          align:'center',
          dataIndex: 'lastMonthReturn',
          key: 'lastMonthReturn',
          sorter: (a, b) => a.lastMonthRetrun.split("%")[0] - b.lastMonthRetrun.split("%")[0],
        },
        {
          title: '最新规模(亿)',
          align:'center',
          dataIndex: 'latestSize',
          key: 'latestSize',
          sorter: (a, b) => a.latestSize - b.latestSize,
        },
      ];
        return columns;
      }
    },
    created(){


    },
    mounted(){
      let that = this;
       that.stockloadData();
       that.bondloadData();
    },
    methods:{
      stockloadData(){
        let that = this;
        //股票型table数据
        let stockurl = "/"+that.params.stylePreference+"/"+that.params.stockSizeRequirement+"/"+that.params.isIndexEnhanced;
        that.$http.get(that.$url.stockTableUrl+stockurl).then(res=>{
          //初始化table数据
          that.stockTableData=res;
        });
        //股票型图表数据
        let value = that.getParam(that.params.isIndexEnhanced,that.params.stockSizeRequirement);
        that.$http.get(that.$url.stockFundUrl+"/"+value).then(res=>{
          //初始化生成折线图的数据
          that.stockdata=res;
          that.stockOption = twoOption('',that.getEcharsData(that.stockdata),"股基FOF组合","基准组合");
        });
      },
      bondloadData(){
        let that = this;
        //债券型table数据
        that.$http.get(that.$url.bondTableUrl+"/"+that.params.bondSizeRequirement).then(res=>{
          //初始化table数据
          that.bondTableData=res;

        });
        //债券型图表数据
        that.$http.get(that.$url.bondFundUrl+"/"+that.params.bondSizeRequirement).then(res=>{
          //初始化生成折线图的数据
          that.bonddata=res;
          that.bondOption = twoOption('',that.getEcharsData(that.bonddata),"股基FOF组合","基准组合");
        });
      },
      //获取股票型历史表现图表的参数
      //val1:isIndexEnhanced--包含指数是否增强 ：(0:否,1:是)
      //val2:sizeRequirement ：(0:无要求,1:2亿以上,2:10亿以上)
      //value:合成后的type值
      getParam(val1,val2){

        if(val1==0 && val2==0){
            return 3;
          }
        if(val1==0 && val2==1){
            return 4;
          }
        if(val1==0 && val2==2){
            return 5;
          }

        if(val1==1 && val2==0){
            return 0;
          }
        if(val2==1 && val2==1){
          return 1;
        }

        if(val2==2  && val2==2){
          return 2;
        }
      },
      //股票型图表数据
      getEcharsData(dataSource){
        let that = this;

          dataSource.map((item,index)=>{
           that.dateMap.push(moment(item.tradeDate).format('YYYY/MM/DD'));  //时间map
           if(that.params.stylePreference==0){
             that.blueMap.push(item.largeCap);//蓝色折线map  估测值
             that.redMap.push(item.largeCapBenchmark);
           }
           if(that.params.stylePreference==1){
             that.blueMap.push(item.middleCap);
             that.redMap.push(item.middleCapBenchmark);  //红色折线map    实际值
           }
           if(that.params.stylePreference==2){
             that.blueMap.push(item.smallCap);
             that.redMap.push(item.smallCapBenchmark);  //红色折线map    实际值
           }
       });
       let data={
         dateMap:that.dateMap,
         blueMap:that.blueMap,
         redMap:that.redMap
       };
       return data;
      },

      // stockFOF构建
      stockFOFbuild(){
           this.isShowInfoModal = true;
           this.typeValue="stock";
      },
      // stockFOF构建
      bondFOFbuild(){
          this.isShowInfoModal = true;
          this.typeValue="bond";
      },
      // 下拉框选择
     handleChange(value,option){

     },

     // 查看风险提示详情
     viewDetails(){

     },
     modalOK(data){
          if(this.infoContentCheckbox){
            localStorage.setItem("infoContentShow","0");
          }
          this.isShowInfoModal = false;
         if(data=="stock"){
            this.stockloadData();
         }
         if(data=="bond"){
            this.bondloadData();
         }



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
     Change(filters, sorter) {
       this.filteredInfo = filters;
       this.sortedInfo = sorter;
     },



   },
  };
</script>

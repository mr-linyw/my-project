<template>
  <div class="macroData" style="height: 800px; overflow-y:scroll" v-title data-title="资产配置服务-宏观数据">
    <div class="macroData-top">
      <div class="top"></div>
      <a-collapse  v-model="activeKey" >
        <template v-slot:expandIcon="props" >
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel header="大类资产" key="1" >
          <div class="macroData-left">
             <echartsUtil :id="'1'" :data="hushenOption" style="height:200px;"></echartsUtil>
             <echartsUtil :id="'2'" :data="windOption" style="height:200px;"></echartsUtil>
          </div>

          <div class="macroData-right">
            <echartsUtil :id="'3'" :data="govOption" style="height:200px;"></echartsUtil>
            <echartsUtil :id="'4'" :data="cashOption" style="height:200px;"></echartsUtil>
          </div>


        </a-collapse-panel>
        </a-collapse>
        <div class="kg"></div>
        <a-collapse  v-model="activeKey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
        <a-collapse-panel header="宏观经济指标" key="2"  >
          <div class="macroData-left">
             <echartsUtil :id="'5'" :data="GDPOption" style="height:200px;"></echartsUtil>
             <echartsUtil :id="'6'" :data="CPIOption" style="height:200px;"></echartsUtil>
          </div>

          <div class="macroData-right">
            <echartsUtil :id="'7'" :data="PPIOption" style="height:200px;"></echartsUtil>
            <!-- <echartsUtil :id="'8'" :data="option" style="height:200px;"></echartsUtil> -->
          </div>

        </a-collapse-panel>
      </a-collapse>

    </div>

  </div>



</template>

<script>
import '@/style/macroData.css'
import moment from 'moment';
import echartsUtil from '@/echartsUtil/echartsUtil'
import {oneOption,twoOption} from '@/echartsUtil/echartsOptions'
  export default {
    components : {
      echartsUtil
    },
    data() {
      return {
        moment,
        activeKey:[1,2],
        hushenOption:{},
        windOption:{},
        govOption:{},
        cashOption:{},
        GDPOption:{},
        CPIOption:{},
        PPIOption:{},
        hushendate:[],
        winddate:[],
        govdate:[],
        cashdate:[],
        GDPhdate:[],
        CPIdate:[],
        PPIdate:[],
    }
  },
    created(){
      this.loadData();
    },


    methods:{
      loadData(){
        let that = this;
        let name1="当月同比_估测值";
        let name2="当月同比_实际值";
        //大类资产数据
        that.$http.get(that.$url.macroUrl+"/20140101/20151101").then(res=>{

          //初始化生成折线图的数据
          that.hushendate=res.hushen;
          that.winddate=res.wind;
          that.govdate=res.gov;
          that.cashdate=res.cash;

          that.hushenOption = oneOption(that.hushentext,that.assetsData(that.hushendate));
          that.windOption = oneOption(that.windtext,that.assetsData(that.winddate));
          that.govOption = oneOption(that.govtext,that.assetsData(that.govdate));
          that.cashOption = oneOption(that.cashtext,that.assetsData(that.cashdate));
        });


        //宏观指标GDP数据
        that.$http.get(that.$url.macroIndexUrl+"/1").then(res=>{
          //初始化生成折线图的数据
          that.GDPdate=res.reverse();
          that.GDPOption = twoOption(that.GDPtext,that.macroscopicData(that.GDPdate),name1,name2);
        });
        //宏观指标CPI数据
        that.$http.get(that.$url.macroIndexUrl+"/2").then(res=>{
          //初始化生成折线图的数据
          that.CPIdate=res.reverse();
          that.CPIOption = twoOption(that.CPItext,that.macroscopicData(that.CPIdate),name1,name2);
        });
        //宏观指标PPI数据
        that.$http.get(that.$url.macroIndexUrl+"/3").then(res=>{
          //初始化生成折线图的数据
          that.PPIdate=res.reverse();
          that.PPIOption = twoOption(that.PPItext,that.macroscopicData(that.PPIdate),name1,name2);

        });
      },
      //大类资产数据分析
      assetsData(dataSource){
        let dateMap=[];
        let blueMap=[];
        let redMap=[];
          dataSource.map((item,index)=>{
           dateMap.push(moment(item.date).format('YYYY/MM/DD'));  //时间map
           blueMap.push(item.closingPrice);  //蓝色折线map
       });
       let data={
         dateMap:dateMap,
         blueMap:blueMap,
       };

       return data;
     },

     //宏观数据分析
     macroscopicData(dataSource){
       let dateMap=[];
       let blueMap=[];
       let redMap=[];
         dataSource.map((item,index)=>{
          dateMap.push(moment(item.ecoDate).format('YYYY/MM/DD'));  //时间map
          if(item.dataType==0){
            blueMap.push(item.dataValue);//蓝色折线map  估测值
            redMap.push("");
          }
          else{
            blueMap.push("");
            redMap.push(item.dataValue);  //红色折线map    实际值
          }
      });
      let data={
        dateMap:dateMap,
        blueMap:blueMap,
        redMap:redMap
      };
      return data;
    },

  }
}
</script>

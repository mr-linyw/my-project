<template>
  <div class="macroData">
    <div class="macroData-top">
      <div class="top"></div>
      <a-collapse  v-model="activeKey" >
        <template v-slot:expandIcon="props" >
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel header="大类资产" key="1" >
          <div class="macroData-left">
             <echartsUtil :id="'1'" :data="option" style="height:200px;"></echartsUtil>
             <echartsUtil :id="'2'" :data="option" style="height:200px;"></echartsUtil>
          </div>

          <div class="macroData-right">
            <echartsUtil :id="'3'" :data="option" style="height:200px;"></echartsUtil>
            <echartsUtil :id="'4'" :data="option" style="height:200px;"></echartsUtil>
          </div>


        </a-collapse-panel>
        </a-collapse>
        <a-collapse  v-model="activeKey" >
          <template v-slot:expandIcon="props" >
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
        <a-collapse-panel header="宏观经济指标" key="1"  >
          <div class="macroData-left">
             <echartsUtil :id="'5'" :data="option2" style="height:200px;"></echartsUtil>
             <echartsUtil :id="'6'" :data="option2" style="height:200px;"></echartsUtil>
          </div>

          <div class="macroData-right">
            <echartsUtil :id="'7'" :data="option2" style="height:200px;"></echartsUtil>
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

  export default {
    components : {
      echartsUtil
    },
    data() {
      return {
        moment,
        activeKey:[1],
        option:{},
        option2:{},
    }
  },
    created(){
      this.$http.get(this.$url.url+"/20180101/20190101").then(res=>{
         console.log(res);
      })
    let dataList=[
      {data:"2018/01",gc:1600,sj:1567},
      {data:"2018/02",gc:578,sj:3244},
      {data:"2018/03",gc:1000,sj:1567},
      {data:"2018/04",gc:0,sj:1567},
      {data:"2018/05",gc:4366,sj:2222},
      {data:"2018/06",gc:4624,sj:3245},
      {data:"2018/07",gc:3689,sj:2578},
      {data:"2018/08",gc:2467,sj:2746},
      {data:"2018/09",gc:5109,sj:4321},
      {data:"2018/10",gc:5444,sj:5555},
      {data:"2018/11",gc:3412,sj:3217},
      {data:"2018/12",gc:4590,sj:3567},
      {data:"2019/01",gc:2456,sj:2900},
      {data:"2019/02",gc:1645,sj:1567},
      {data:"2019/03",gc:3498,sj:5342},
      {data:"2019/04",gc:4532,sj:4432},
      {data:"2019/05",gc:3333,sj:4444},
      {data:"2019/06",gc:2345,sj:1900},
      {data:"2019/07",gc:3479,sj:4127},
      {data:"2019/08",gc:2346,sj:3591}
    ]

      let dateMap=[];
      let gcMap=[];
      let sjMap=[];

        dataList.map((item,index)=>{
          dateMap.push(item.data);
          gcMap.push(item.gc);
          sjMap.push(item.sj);
      });
      let data={
        dateMap:dateMap,
        gcMap:gcMap,
        sjMap:sjMap
      };
      //初始化生成折线图的数据
      let  text = 'GDP';
      this.option = this.oneOption(text,data);
      let  text2 = 'PPI';
     this.option2 = this.twoOption(text2,data);
    },
    methods:{
      oneOption(text,data){
      let  option={
           title: {
              text: text,
              x:'center',
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis:  {
              type: 'category',
              data:data.dateMap
            },
            yAxis: {
              type: 'value',
              splitLine :{    //网格线
                   lineStyle:{
                       type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                   },
                   show:true //隐藏或显示
               }

            },
            dataZoom: [{
                type: 'inside',
                throttle: 50
            }],
            series: {
                  name:'当月值',
                  type:'line',
                  data:data.sjMap,
                  symbol: 'none',  //取消折点圆圈
                  itemStyle : {
                        normal : {
                        color:'#0e9cff', //改变折线点的颜色
                        lineStyle:{
                        color:'#0e9cff' //改变折线颜色
                        }
                        }
                  },

              }

             }
             return option;
      },
      twoOption(text,data){
      let  option={
           title: {
              text: text,
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:['当月同比_估测值','当月同比_实际值']
            },
            xAxis:  {
              type: 'category',
              data:data.dateMap
            },
            yAxis: {
              type: 'value',
              splitLine :{    //网格线
                   lineStyle:{
                       type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                   },
                   show:true //隐藏或显示
               }

            },
            dataZoom: [{
                type: 'inside',
                throttle: 50
            }],
            series: [
              {
                  name:'当月同比_估测值',
                  type:'line',
                  data:data.gcMap,
                  symbol: 'none',  //取消折点圆圈
                  itemStyle : {
                        normal : {
                        color:'#0e9cff', //改变折线点的颜色
                        lineStyle:{
                        color:'#0e9cff' //改变折线颜色
                        }
                        }
                  },
              },
              {
                  name:'当月同比_实际值',
                  type:'line',
                  data:data.sjMap,
                  symbol: 'none',
                  itemStyle : {
                        normal : {
                        color:'#f38143',
                        lineStyle:{
                        color:'#f38143'
                        }
                        }
                  },
              }
            ]
             }
             return option;
      },




    },
  };
</script>

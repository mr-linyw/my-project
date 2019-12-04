<template>
    <div class="rAa">

    </div>
</template>

<script>
  import data from '@/store/testLocalData';
    export default {
        name: "rAa",
        data(){
            return {
              chart:null,
              errorMsg:"",
              params:null
          }
        },
        created(){
          this.params = this.initData();
        },
        mounted() {
          this.drawByData(this.params);
        },
       methods:{
            initData(){
                  let d  = data["raa"];
                  console.log(d);
                  if(d.status !== 1){
                      this.errorMsg =  d.errmsg;
                      return;
                  }
                  let params = {
                    legend: {
                      data:['沪深300','国债全收益','wind商品','货币现金'],
                      orient: 'vertical',
                      right: 10,
                      top: 20,
                      bottom: 20,
                    },
                    xAxis : [
                      {
                        type : 'category',
                        data : []
                      }
                    ],
                    series:[
                      {
                        name: '沪深300',
                        type: 'bar',
                        stack: '总值',
                        data: [],
                        itemStyle:{
                          color:"#D42539"
                        }
                      },
                      {
                        name: '国债全收益',
                        type: 'bar',
                        stack: '总值',
                        data: [],
                        itemStyle:{
                          color:"#7ca4c3"
                        }
                      },
                      {
                        name: 'wind商品',
                        type: 'bar',
                        stack: '总值',
                        data: [],
                        itemStyle:{
                          color:"#78f2e9"
                        }
                      },
                      {
                        name: '货币现金',
                        type: 'bar',
                        stack: '总值',
                        data: [],
                        barWidth:40,
                        itemStyle:{
                          color:"#a5a5dd"
                        }
                      },
                    ]
                  };
                  for (let item of d["data"]){
                        params.xAxis[0].data.push(item.tradeDate);
                        params.series[0].data.push(item.hushen);
                        params.series[1].data.push(item.govBondTri);
                        params.series[2].data.push(item.windCommodity);
                        params.series[3].data.push(item.cash);
                  }
                  return params;
            },
           drawByData({legend,xAxis,series}){
               let $el = this.$el, echarts = this.$echarts;
               this.chart = echarts.init($el);
               let option = {
                 tooltip : {
                   trigger: 'axis',
                   axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                   }
                 },
                 legend,
                 dataZoom: [
                   {
                     type: 'inside',
                     xAxisIndex: 0,
                   },
                   {
                     type: 'slider',
                     start: 0,
                     end: 10,
                     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                     handleSize: '50%',
                     showDetail:false,
                     handleStyle: {
                       color: '#fff',
                       shadowBlur: 3,
                       shadowColor: 'rgba(0, 0, 0, 0.6)',
                       shadowOffsetX: 2,
                       shadowOffsetY: 2
                     }
                   }
                 ],
                 grid: {
                   left: '15',
                   right: '120',
                   bottom: '50',
                   top:'20',
                   containLabel: true
                 },
                xAxis,
                 yAxis : [
                   {
                     type : 'value'
                   }
                 ],
                series
               };
             this.chart.setOption(option);
           }
       }
    }
</script>

<style scoped>
    .rAa{
      width: 100%;
      height: 100%;
    }
</style>

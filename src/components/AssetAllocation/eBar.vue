<template>
  <div class="eBar"></div>
</template>

<script>
  export default {
    name: "eBar",
    props:["params","type"],
    data(){
      return {
        chart:null,
        errorMsg:"",
        startValue:null,
        endValue: null,
      }
    },
    watch:{
      params(val){
        this.drawByData(val);
      }
    },
    methods:{
      drawByData(params){
        if(!this.chart){
          let $el = this.$el, echarts = this.$echarts;
          this.chart = echarts.init($el);
        }

        if(!params){
          return;
        }
        let {legend,xAxis,series} = params;

        let option = {
          grid  :{
            left: '10',
            right: '10',
            bottom: '15',
            top:'15',
            containLabel: true
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b0}: {c0}%'
          },
          xAxis,
          legend,
          yAxis: {
            axisLine:{
              lineStyle:{
                color:"#cacaca"
              }
            },
            axisLabel:{
              formatter: '{value} %',
              color: '#777',
            },
            axisTick:{
              lineStyle:{
                color:"#cacaca"
              }
            },
            splitLine:{
              show:true,
              lineStyle:{
                type:"dotted"
              }
            },
            type: 'value',
          },
          series
        };
        this.chart.setOption(option);
      }
    }
  }
</script>

<style scoped>

  .eBar{
    width: 100%;
    height: 100%;
  }

</style>

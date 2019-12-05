<template>
    <div class="eLine"></div>
</template>

<script>
    export default {
        name: "eLine",
        data(){
            return {
              chart:null,
              errorMsg:"",
              params:null,
              startValue:null,
              endValue: null,
          }
        },
      created(){
        let _t = this;
        $.ajax({
          url: "http://125.208.12.66:9877/asset/allocationWeightNetvalue/allocationResult/1/1",
          success: function (result) {
            _t.params = _t.initData(result);
          },
          dataType: "json"
        });
      },
        methods:{
          initData(data){
            let d  = data;
            console.log(d);
            if(d.length <= 0){
              this.errorMsg =  "暂无数据";
              return;
            }
            let params = {
              legend: {
                data:['沪深300','国债全收益','wind商品','货币现金'],
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
                    rotate: '35',
                  }
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
                }
              ]
            };
            return params;
          },
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
              xAxis,
              legend,
              yAxis: {
                type: 'value'
              },
              series
            };
            this.chart.setOption(option);
          }
        }
    }
</script>

<style scoped>

  .eLine{
    width: 100%;
    height: 100%;
  }

</style>

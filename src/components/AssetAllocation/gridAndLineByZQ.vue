<template>
    <div class="gridAndLineByZQ">
            <div class="tools">
              <div class="group">
                <span>规模偏好</span>
                <a-select defaultValue="0" style="width:94px" @change="sizeRequirement_do">
                  <a-select-option v-for="item in gmphData" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
                </a-select>
              </div>
              <a-button class="configBtn" type="round" style="margin-left: 20px" @click="buildBound">构建FOF</a-button>
            </div>
            <div class="content">
              <div class="left_c">
                <a-table
                  :bordered="true"
                  :columns="columns"
                  :dataSource="data"
                />
              </div>
              <div class="right_c">
                <e-line :params="chartData"></e-line>
              </div>
            </div>
    </div>
</template>

<script>
  const columns = [
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
  ];
    import moment from 'moment';
    import eLine from '@/components/AssetAllocation/eLine'
    export default {
      name: "gridAndLineByZQ",
      data(){
        return{
          params:"",
          sizeRequirement:"0",
          chartData:[],
          data:[],
          columns,
          gmphData:[
            {text:"无要求",value:"0"},
            {text:"2亿以上",value:"1"},
            {text:"10亿以上",value:"2"},
          ],
        }
      },
      components:{
        eLine
      },
      created(){
        // table数据
        this.$http.get(this.$url.fofRecommendBondFund + "/0").then(result => {
          this.initData(result);
        });
        //  折线图数据
        this.$http.get(this.$url.fofHistReturnBond + "/0").then(result => {
          this.doChartData(result);
        });
      },
      watch:{
        params(value){
          this.$http.get(this.$url.fofRecommendBondFund + "/"+value+"").then(result => {
            this.initData(result);
          });
          //  折线图数据
          this.$http.get(this.$url.fofHistReturnBond + "/"+value+"").then(result => {
            this.doChartData(result);
          });
        }
      },
      methods:{
        buildBound(){
            this.params = this.sizeRequirement;
        },
        sizeRequirement_do(val){
           this.sizeRequirement = val;
        },
        doChartData(result){
          let params = {
            legend: {
              data:['债基组合','组合基准'],
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
                }
              }
            ],
            series:[
              {
                name: '债基组合',
                type: 'line',
                symbol: 'none',
                data: [],
                itemStyle:{
                  color:"#35acff"
                }
              },
              {
                name: '组合基准',
                type: 'line',
                symbol: 'none',
                data: [],
                itemStyle:{
                  color:"#f38143"
                }
              },
            ]
          };
          for (let item of result){
            let formatM = moment(item.tradeDate).format("YYYY/MM/DD");
            params.xAxis[0].data.push(formatM);
            params.series[0].data.push(Number(item.protfolio).toFixed(4));
            params.series[1].data.push(Number(item.benchmark).toFixed(4));
          }
          this.chartData = params;
        },
        initData(data){
          this.data.length = 0;
          let d = this.data;
          for (let i = 0; i < data.length; i++) {
            let dc = data[i];
            d.push({
              fundCode: dc["fundCode"],
              fundName: dc["fundName"],
              fundManager: dc["fundManager"],
              lastMonthReturn: dc["lastMonthReturn"],
              latestSize: dc["latestSize"]
            });
          }
        }
      }
    }
</script>

<style scoped>
  .gridAndLineByZQ{
    width: 100%;
    height: 320px;
  }
.tools{
  display: flex;
  width: 100%;
  height: 48px;
  font-size: 14px;
  color: #4c5264;
  margin-left: 15px;
}
  .content{
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
  }
  .content > div{
    width: 50%;
  }
  .left_c{
    margin-left: 12px;
    margin-right: 18px;
  }
  .right_c{
    margin-right: 8px;
  }
  .group{
    margin-right: 18px;
  }
</style>

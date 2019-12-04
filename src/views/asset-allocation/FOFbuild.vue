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
                       <a-select defaultValue="jack"  @change="handleChange">
                         <a-select-option value="jack">大盘型</a-select-option>
                         <a-select-option value="lucy">中盘型</a-select-option>
                         <a-select-option value="Yiminghe">小盘型</a-select-option>
                       </a-select>
                    </a-form-item>
                   </a-col>

                   <a-col :md="5" :sm="8">
                     <a-form-item label="规模偏好">
                       <a-select defaultValue="jack"  @change="handleChange">
                         <a-select-option value="jack">无要求</a-select-option>
                         <a-select-option value="lucy">2亿以上</a-select-option>
                         <a-select-option value="Yiminghe">10亿以上</a-select-option>
                       </a-select>
                    </a-form-item>
                   </a-col>

                   <a-col :md="6" :sm="8">
                     <a-form-item label="是否包含指数增强型基金">
                       <a-select defaultValue="lucy"  @change="handleChange">
                         <a-select-option value="lucy">是</a-select-option>
                         <a-select-option value="Yiminghe">否</a-select-option>
                       </a-select>
                    </a-form-item>
                   </a-col>
                   <a-col :md="6" :sm="24">
                       <el-button size="mini" type="danger" round class="btn-fof" @click="FOFbuild">构建FOF</el-button>
                   </a-col>
               </a-row>

               <!-- table -->
               <template >
                 <div class="table-svg">
                   <a-table :columns="columns" :dataSource="data" :pagination='false' @change="handleChange" bordered>

                   </a-table>
                 </div>

                </template>

               <!-- 图表 -->

            <div class="fofbuild-top-echartsUtil">
               <echartsUtil :id="'1'" :data="option" style="height:252px;"></echartsUtil>
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
                   <a-select defaultValue="jack"  @change="handleChange">
                     <a-select-option value="jack">无要求</a-select-option>
                     <a-select-option value="lucy">2亿以上</a-select-option>
                     <a-select-option value="Yiminghe">10亿以上</a-select-option>
                   </a-select>
                </a-form-item>
               </a-col>


               <a-col :md="6" :sm="24">
                   <el-button size="mini" type="danger" round class="btn-fof" @click="FOFbuild">构建FOF</el-button>
               </a-col>
           </a-row>

           <!-- table -->
           <template>
             <div class="table-svg">
               <a-table :columns="columns" :dataSource="data" :pagination='false' @change="handleChange" bordered>

               </a-table>
             </div>
            </template>

           <!-- 图表 -->

        <div class="fofbuild-top-echartsUtil">
           <echartsUtil :id="'2'" :data="option2" style="height:252px;"></echartsUtil>
        </div>


        </a-collapse-panel>
      </a-collapse>
   </a-form>
    </div>

  </div>



</template>

<script>
import '@/style/fofbuild.css'
import moment from 'moment';
import echartsUtil from '@/echartsUtil/echartsUtil'

const data = [
    {
      key: '1',
      code: '163407.OF',
      name: '兴全沪深300指数增强',
      user: '申庆',
      type: '增强指数型基金',
      date: '2010-11-02',
      result: '6.56%',
      latestSize: '20.25',
    },
    {
      key: '2',
      code: '750005.OF',
      name: '安信平稳增长A',
      user: '庄园、张明',
      type: '灵活配置型基金',
      date: '2012-12-18',
      result: '2.08%',
      latestSize: '0.95',
    },


  ];


  export default {
    components : {
      echartsUtil
    },

    data() {
      return {
        data,
        moment,
        activeKey:[1],
        option:{},
        option2:{},
        sortedInfo:null, //table 排序
        filteredInfo:null, //table 过滤
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
          dataIndex: 'code',
          key: 'code',
          // filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
          // filteredValue: filteredInfo.name || null,
          // onFilter: (value, record) => record.name.includes(value),
          sorter: (a, b) => a.code.length - b.code.length,
          customRender: (text, row, index) => {
              return <a href="javascript:;">{text}</a>;
          },
        },
        {
          title: '基金名称',
          align:'center',
          dataIndex: 'name',
          key:'name',
          sorter: (a, b) => a.name.length - b.name.length,
          customRender: (text, row, index) => {
              return <a href="javascript:;">{text}</a>;
          },
        },
        {
          title: '基金经理',
          align:'center',
          dataIndex: 'user',
          key: 'user',
          sorter: (a, b) => a.user.length - b.user.length,
          customRender:(text, row, index) => {
            return <a href="javascript:;">{text}</a>;
          }
        },
        {
          title: '基金类型',
          align:'center',
          dataIndex: 'type',
          key: 'type',
          sorter: (a, b) => a.type.length - b.type.length,
        },
        {
          title: '发行时间',
          align:'center',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => a.date - b.date,
        },
        {
          title: '上月业绩',
          align:'center',
          dataIndex: 'result',
          key: 'result',
          sorter: (a, b) => a.result - b.result,
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

      let  text = '';
     this.option = this.Option(text,data);
     this.option2 = this.Option2(text,data);
    },
    methods:{

      Option(text,data){
      let  option={
           title: {
              text: text,
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:['股基FOF组合','基准组合']
            },
            xAxis:  {
              type: 'category',
              data:data.dateMap,

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
                  name:'股基FOF组合',
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
                  name:'基准组合',
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

      Option2(text,data){
      let  option={
           title: {
              text: text,
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:['股基FOF组合','基准组合']
            },
            xAxis:  {
              type: 'category',
              data:data.dateMap,

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
                  name:'股基FOF组合',
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
                  name:'基准组合',
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

      // FOF构建
      FOFbuild(){

      },
      // 下拉框选择
     handleChange(value,option){

     },


     Change(filters, sorter) {
       console.log('Various parameters',  filters, sorter);
       this.filteredInfo = filters;
       this.sortedInfo = sorter;
     },



   },
  };
</script>

export  function oneOption(text,data){
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
            name:'当天值',
            type:'line',
            data:data.blueMap,
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
};
export  function twoOption(text,data,name1,name2,startValue,yname){
let  option={
     title: {
        text: text,
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:[name1,name2]
      },
      xAxis:  {
        type: 'category',
        data:data.dateMap
      },
      yAxis: {
        name:yname,
        type: 'value',
        // axisLabel:{formatter:'{value} %'},
        splitLine :{    //网格线
             lineStyle:{
                 type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
             },
             show:true //隐藏或显示
         }

      },
      dataZoom: [{
          type: 'inside',
          startValue:startValue,

          throttle: 50
      }],
      series: [
        {
            name:name1,
            type:'line',
            data:data.blueMap,
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
            name:name2,
            type:'line',
            data:data.redMap,
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
};

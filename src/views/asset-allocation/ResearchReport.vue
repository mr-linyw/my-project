<template>

    <div class="header" style="height: 800px; overflow-y:scroll" v-title data-title="资产配置服务-研究报告">
      <div class="header-tabs">
        <el-tabs  v-model="activeName" @tab-click="handleClick">
          <!-- 宏观政策按钮
             class="left"
             class="right" 代表左右布局
            -->
          <el-tab-pane label="宏观政策"  name="first">
            <div class="left">
                <a-list itemLayout="horizontal" :dataSource="firstData" >
                  <a-list-item  slot="renderItem" slot-scope="item, index" @click="jumpDetails(item)">
                     <a-list-item-meta>
                         <span slot="title" >
                           <a-tooltip>
                              <template slot="title">
                                {{item.title}}
                              </template>
                              <span class="contant"> {{item.title}} </span>
                            </a-tooltip>

                           <div class="">
                             <span :style="{ fontSize: '14px', color: '#C0C0C0' }">{{moment(item.createTime).format('YYYY-MM-DD')}}</span>
                             <span :style="{ fontSize: '14px', color: '#C0C0C0' }">{{item.autherName}}</span>
                           </div>

                         </span>
                    </a-list-item-meta>
                  </a-list-item>
               </a-list>
            </div>
            <div class="right">
                  <a-list itemLayout="horizontal" :dataSource="secondData" >
                    <a-list-item slot="renderItem" slot-scope="item, index" @click="jumpDetails(item)">
                      <a-list-item-meta>
                          <span slot="title">
                            <a-tooltip>
                               <template slot="title">
                                 {{item.title}}
                               </template>
                               <span class="contant"> {{item.title}} </span>
                             </a-tooltip>
                            <div class="">
                              <span :style="{ fontSize: '14px', color: '#C0C0C0' }">{{moment(item.createTime).format('YYYY-MM-DD')}}</span>
                              <span :style="{ fontSize: '14px', color: '#C0C0C0' }">{{item.autherName}}</span>
                            </div>
                          </span>
                     </a-list-item-meta>
                  </a-list-item>
                </a-list>
            </div>
          </el-tab-pane>
          <!-- 量化择时按钮
          class="left"
          class="right" 代表左右布局
          -->
          <el-tab-pane label="量化择时" name="second">
            <div class="left">
                <a-list itemLayout="horizontal" :dataSource="firstData">
                  <a-list-item slot="renderItem" slot-scope="item, index" @click="jumpDetails(item)">
                    <a-list-item-meta>
                        <span slot="title">
                          <a-tooltip>
                             <template slot="title">
                               {{item.title}}
                             </template>
                             <span class="contant"> {{item.title}} </span>
                           </a-tooltip>
                          <div class="">
                            <span :style="{ fontSize: '14px', color: '#C0C0C0' }">{{moment(item.createTime).format('YYYY-MM-DD')}}</span>
                            <span :style="{ fontSize: '14px', color: '#C0C0C0' }">{{item.autherName}}</span>
                          </div>
                        </span>
                   </a-list-item-meta>
                  </a-list-item>
               </a-list>
            </div>
            <div class="right">
                  <a-list itemLayout="horizontal" :dataSource="secondData">
                    <a-list-item slot="renderItem" slot-scope="item, index" @click="jumpDetails(item)">
                      <a-list-item-meta>
                          <span slot="title">
                            <a-tooltip>
                               <template slot="title">
                                 {{item.title}}
                               </template>
                               <span class="contant"> {{item.title}} </span>
                             </a-tooltip>

                            <div class="">
                              <!-- moment().format('YYYY-MM-DD') -->
                              <span :style="{ fontSize: '14px', color: '#C0C0C0' }">{{moment(item.createTime).format('YYYY-MM-DD')}}</span>
                              <span :style="{ fontSize: '14px', color: '#C0C0C0' }">{{item.autherName}}</span>
                            </div>
                          </span>
                     </a-list-item-meta>
                  </a-list-item>
                </a-list>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 分页 -->
      <div class="footer">

               <template>
                  <a-pagination v-model="current" :total="total"  :pageSize="20"  @change="changeFind"/>
                </template>

      </div>
    </div>
</template>

<script>
import '@/style/researchReport.css'
import moment from 'moment'
import {mouseover,mouseout,mousemove} from '@/components/utilJs/ellipsis'
  export default {

    data() {
      return {
      pageName:"first",
       current:1,
       total:0,
        params:{
          "type":1,
          "pageNo":0,
          "pageSize":20
        },
        params2:{
          "type":2,
          "pageNo":0,
          "pageSize":16
        },
        moment,
        id:'1',
        firstData:[],
        secondData:[],
        activeName:"first",
      };
    },
    created(){
    },
    mounted(){
      let that = this;

     //获取列表数据
     that.$http.post(that.$url.reportUrl,that.params).then(res=>{
         that.total = res.result.total;
         that.current = res.result.current;
         that.firstData=[];
         that.secondData=[];
         that.firstData= res.result.records.slice(0,8);
         that.secondData=res.result.records.slice(8,16);
     });
    },

    methods:{
      jumpDetails(item){
        window.open(this.$router.resolve({ name:'Details',query: {id:item.id,name:item.autherName}}).href,"_blank");
      },
      //分页
      changeFind(page, pageSize){
        let that = this;
        let data={};
         if(that.pageName=="first"){
           let param={
             "type":1,
             "pageNo":page,
             "pageSize":pageSize
           }
           data = param;
         }else{
           let param={
             "type":2,
             "pageNo":page,
             "pageSize":pageSize
           }
            data = param;
         }
         //获取列表数据
         that.$http.post(that.$url.reportUrl,data).then(res=>{
             that.total = res.result.total;
             that.current = res.result.current;
             that.firstData=[];
             that.secondData=[];
             that.firstData= res.result.records.slice(0,10);
             that.secondData=res.result.records.slice(10,20);
         });
      },
      handleClick(tab, event){
        let that = this;
        that.firstData=[];
        that.secondData=[];
        that.pageName=tab.name;
        //获取列表数据
        if(tab.name=='first'){
          that.$http.post(that.$url.reportUrl,that.params).then(res=>{
            that.total = res.result.total;
            that.current = res.result.current;
              that.firstData= res.result.records.slice(0,10);
              that.secondData=res.result.records.slice(10,20);
          });
        }else{
          that.$http.post(that.$url.reportUrl,that.params2).then(res=>{
            that.total = res.result.total;
            that.current = res.result.current;
              that.firstData= res.result.records.slice(0,10);
              that.secondData=res.result.records.slice(10,20);
          });
        }

      },
    },

    destroyed() {
    // 销毁监听刷新事件
        window.removeEventListener('beforeunload', this.saveStore)
    },
  };
</script>

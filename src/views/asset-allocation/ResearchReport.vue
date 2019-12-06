<template>

    <div class="header">
      <div class="header-tabs">
        <el-tabs  v-model="activeName" >
          <!-- 宏观政策按钮
             class="left"
             class="right" 代表左右布局
            -->
          <el-tab-pane label="宏观政策"  name="first">
            <div class="left">
                <a-list itemLayout="horizontal" :dataSource="firstData">
                  <a-list-item slot="renderItem" slot-scope="item, index" @click="jumpDetails(item)">
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
        <div  style="float:right;margin-top : 40px">
           <template>
              <!-- showSizeChanger   @showSizeChange="onShowSizeChange"
               @change="changeFind"-->
             <a-pagination
               :pageSizeOptions="ipagination.pageSizeOptions"
               :total="ipagination.total"
               :pageSize="ipagination.pageSize"
               v-model="ipagination.current"

             >
                 <!-- <template slot='buildOptionText' slot-scope='props'>
                   <span>{{props.value}}条/页</span>
                 </template> -->
               </a-pagination>
           </template>
        </div>
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
        params:{
          "type":1,
          "pageNo":1,
          "pageSize":8
        },
        moment,
        id:'1',
        firstData:[],
        secondData:[],
        activeName:"first",

            /* 分页参数 */
           ipagination:{
            current: 1,
            pageSize: 8,
            // pageSizeOptions: ['10', '20', '30'],
            // showTotal: (total, range) => {
            //   return range[0] + "-" + range[1] + " 共" + total + "条"
            // },
            showQuickJumper: true,
            showSizeChanger: true,
            total: 2,
          },

      };
    },
    created(){

    },
    mounted(){
      let that = this;

     //获取列表数据
     that.$http.post(that.$url.reportUrl,that.params).then(res=>{
          that.firstData= res.result.records.slice(0,4);
         that.secondData=res.result.records.slice(4,8);
     });
    },

    methods:{
      jumpDetails(item){
        window.open(this.$router.resolve({ name:'Details',query: {id:item.id,name:item.autherName}}).href,"_blank");
      },
    },
    destroyed() {
    // 销毁监听刷新事件
        window.removeEventListener('beforeunload', this.saveStore)
    },
  };
</script>

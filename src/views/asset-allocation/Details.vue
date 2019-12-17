<template>
    <div class="all"style="height: 900px;" >
        <div class="a-layout-header">

          <div class="a-layout-header-img">
            <img  src="@/assets/顶部-中信建投LOGO.png">&#12288;
            <img  src="@/assets/顶部-分割线.png">&#12288;
             <strong style="font-size:17px" >资产配置服务</strong>　
          </div>
        </div>
        <div class="all-text">
          <div class="a-layout-content-tabs-d">
              <span>资产配置</span>&#12288;<a-icon type="right"  />&#12288;<span>研报详情</span>
          </div>
          <div class="all-text-center"  style="height: 800px; overflow-y:scroll">
            <div class="a-layout-footer-t">
              <div class="a-layout-footer-left">
                <div class="a-layout-footer-header">
                        <span ><a-icon type="file-text" :style="{ fontSize: '16px', color: '#08c' }"/> 宏观政策</span>
                </div>
                <div class="all-divider">
                   <a-divider />
                </div>
                <div class="a-layout-footer-center">
                    <div class="a-layout-footer-center-header" >
                      <div class="center-header-p">
                        <p>{{dataSource.title}}</p>
                        <!-- {{moment().format('YYYY-MM-DD')}} -->
                      </div>
                      <div class="center-header-s">
                        <span :style="{ fontSize: '15px', color: '#C0C0C0' }">{{moment(dataSource.createTime).format('YYYY-MM-DD')}}</span>
                        <span :style="{ fontSize: '15px', color: '#C0C0C0' }">{{name}}</span>
                      </div>

                    </div>
                    <div class="a-layout-footer-center-center">
                      <div class="zhaiyao">
                        <span :style="{ fontSize: '15px' }">摘要</span>
                        <p>{{dataSource.digest}}</p>
                      </div>
                    </div>
                </div>
                <div class="a-layout-footer-footer">
                    <el-button size="mini" round @click="showModal"><a-icon type="cloud-download" :style="{ fontSize: '16px', color: '#08c' }"/>下载</el-button>
                </div>
              </div>
              <div class="a-layout-footer-right">
                <iframe style="height:850px;" src="./static/20191125-中信建投-中信建投最新周择时观点＆20191122日报：创业板仍将引领A股年末反攻行情.pdf" width="100%" height="500px"></iframe>
              </div>

            </div>
          </div>

        </div>

      <!-- modal模板 -->
        <!--  :showConfirm='false'
          :showCancle='false'  -->

        <modal
          ref="modal"
          @close="close"
          @confirm="confirm"
          >
          <!-- 点击下载填充modal的slot -->
          <div v-if="modalType==='send'" class="content" slot="body">
            <div class="modal-text" @click="send">
              <span ><a-icon type="mail" :style="{ fontSize: '16px', color: '#08c' }"/> 发送至邮箱</span>
            </div>
            <div class="modal-text-two" @click="copy">
              <span class="copy-btn" v-clipboard:copy="f" v-clipboard:success="onCopy" v-clipboard:error="onError"><a-icon type="copy" :style="{ fontSize: '16px', color: '#08c' }"/> 复制下载链接</span>
            </div>
          </div>
         <!-- 点击发送至邮箱填充modal的slot -->
          <div v-else class="content" slot="body">

            <div class="text" >
              <span >该研报将发送至您预留的Mr.LinYW@aliyun.com邮箱，点击确认直接发送</span>
            </div>

            <div class="text-two">
              <span /><font color="gray">或发送至下面邮箱</font></span>
               <a-input placeholder="请填写其他邮箱" v-model="email" />
            </div>

          </div>

      </modal>
    </div>

</template>

<script>
import moment from 'moment'
import pdf from 'vue-pdf'
import modal from '@/modal/Modal'
import VueEvent from '@/components/utilJs/ByValue'
import '@/style/Details.css'
  export default{
    components: {
    pdf,modal
  },
    data(){
      return{
       email:'',
       f:"222222222222",
       dataSource:{},
       modalType:"",
       isModalVisible:false,
       text:"创业板仍将引领A股年末反攻行情",
       text2:"主要结论最新周择时观点主板坚定做多，建议维持高仓位持有；创业板受IPO减速正面示范作用，建议继续维持高仓位持有不变，市场风格维持创业板占优不变；涨跌停统计当日(2019-11-22)涨停家数环比减少。共有59只股票触及涨停，涨停被砸概率40.68%。35只涨停股票中，自然涨停25只，一字涨停8只，一字回封2只。共有19只股票触及跌停，跌停打开概率31.58%，15只跌停股票中，自然跌停13只，一字跌停2只，一字回封0只。会很快翻转，关注景气度回升的行业",
       moment,
       showCancle:true,
       showConfirm:true,
       dataSource:{ },
       name:"",

      }

    },
    created(){
         //获取数据
         this.$http.get(this.$url.reportUrl+"/"+this.$route.query.id).then(res=>{
            this.dataSource = res;
            this.name=this.$route.query.name;
         });
      // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
　　　　this.src = pdf.createLoadingTask(this.src);
      // this.data=this.$route.params.data;

    },


  computed:{

    title(){
      return this.$store.state.count
    },
    textname(){
      return this.$store.state.detailsData.textname
    },
    date(){
      return this.$store.state.detailsData.count
    }
  },

    methods:{
     showModal(){
        this.$refs.modal.show = true;
        this.$refs.modal.title="选择下载方式"
        this.modalType = "send";
     },
     send(){
       this.$refs.modal.close();
       this.$refs.modal.show = true;
       this.$refs.modal.title="发送至邮箱"
       this.$refs.modal.showConfirm=this.showConfirm
       this.$refs.modal.showCancle=this.showCancle
       this.modalType = "";
     },
     copy(){

     },
     close(){
       this.$refs.modal.showConfirm=false
       this.$refs.modal.showCancle=false
       this.$refs.modal.show=false;
     },
     confirm(){
       this.$refs.modal.showConfirm=false
       this.$refs.modal.showCancle=false
     },
      onClick(){
      },
      // 复制成功时的回调函数
      onCopy (e) {
         this.$message.success("研报地址已复制到剪切板！")
      },
      // 复制失败时的回调函数
      onError (e) {
         this.$message.error("抱歉，复制失败！")
      }

      },


  }
</script>

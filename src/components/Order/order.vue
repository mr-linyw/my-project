<!-- modal模板，内置slot，可随意替换，直接引用，不需要再新建页面 -->
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close" v-show="show">
      <div class="modal" @click.stop role="dialog" aria-labelledby="modalTile" arial-describedby="modalDescription">
        <div class="modal-header" id="modalTitle">
          <slot name="header">
              {{title}}
          </slot>
        </div>
        <div class="modal-body" id="modalDescription" style="height: 400px; overflow-y:scroll">
          <div style="border: 1px  #000000; width: 90%; margin: 0 auto;">
            <div class="">
              <p>您将提交如下交易信息，您可修改资产权重与资金组合权重。</p>
            </div>
            <a-form layout="inline">
              <a-row :gutter="24">
                   <a-col :md="5" :sm="8">
                     <a-form-item label="股票:">
                       <a-input-number
                        :defaultValue="100"
                        :min="0"
                        :max="100"
                        :formatter="value => `${value}%`"
                        :parser="value => value.replace('%', '')"
                        @change="onChange"
                      />
                    </a-form-item>
                   </a-col>
                   <a-col :md="5" :sm="8">
                     <a-form-item label="债券:">
                       <a-input-number
                        :defaultValue="100"
                        :min="0"
                        :max="100"
                        :formatter="value => `${value}%`"
                        :parser="value => value.replace('%', '')"
                        @change="onChange"
                      />
                    </a-form-item>
                   </a-col>
                   <a-col :md="5" :sm="8">
                     <a-form-item label="现金:">
                       <a-input-number
                        :defaultValue="100"
                        :min="0"
                        :max="100"
                        :formatter="value => `${value}%`"
                        :parser="value => value.replace('%', '')"
                        @change="onChange"
                      />
                    </a-form-item>
                   </a-col>
                   <a-col :md="5" :sm="8">
                     <a-form-item label="商品:">
                      <span>0%</span>
                    </a-form-item>
                   </a-col>
                </a-row>
                <span :style="{ fontSize: '14px', color: '#C0C0C0' }">*各类资产权重值之和应为100%</span>
                <el-divider></el-divider>
                <div class="left">
                  <span :style="{ fontSize: '14px', color: '#C0C0C0' }">股票型组合</span>

                </div>
                <div class="right">
                 <span :style="{ fontSize: '14px', color: '#C0C0C0' }">债券型组合</span>
                </div>
            </a-form>
          </div>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <el-button size="mini" type="info" round class="btn-reset" @click="reset" >重置</el-button>
            <el-button size="mini" type="info" round class="btn-close" @click="close" >取消</el-button>
            <el-button size="mini" type="danger" round class="btn-confirm" @click="confirm">确认下单</el-button>
            <!-- <button type="button" class="btn-green" @click="close" aria-label="Close modal">关闭</button> -->
          </slot>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
 import '@/style/modal.css'
export default {
   name: 'orderModal',
    // props: ['show'],
    props:{
      modalDate:Object,
      typeValue: {
          type: String,
          default: ""
      },
      // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    // 是否显示确认按钮
    showConfirm: {
        type: Boolean,
        default: false
    },
    // 是否显示取消按钮
    showCancle: {
        type: Boolean,
        default: false
    },

  },
    data () {
       return {
         title:"下单"
        }
      },
      methods: {
        // 确定按钮事件
        confirm:function() {
            this.$emit('confirm',this.typeValue);
        },
        close: function () {
          this.$emit('close');

        },
        reset:function(){
          this.$emit('reset');
        }

      },
      beforeDestroy () {

      }
    }


</script>

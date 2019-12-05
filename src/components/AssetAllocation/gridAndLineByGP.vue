<template>
    <div class="gridAndLineByGP">
            <div class="tools">
              <div class="group">
                <span>风格偏好</span>
                <a-select defaultValue="4" style="width:94px">
                  <a-select-option v-for="item in fgphData" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
                </a-select>
              </div>
              <div class="group">
                <span>规模偏好</span>
                <a-select defaultValue="4" style="width:94px">
                  <a-select-option v-for="item in tnhData" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
                </a-select>
              </div>
              <div class="group">
                <span>是否包含指数增强型基金</span>
                <a-select defaultValue="4" style="width:94px">
                  <a-select-option v-for="item in tnhData" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
                </a-select>
              </div>
              <a-button class="configBtn" type="round" style="margin-left: 20px" @click="configClick">构建FOF</a-button>
            </div>
            <div class="content">
              <div class="left_c"></div>
              <div class="right_c"></div>
            </div>

    </div>
</template>

<script>
    export default {
        name: "gridAndLineByGP",
      data(){
          return{
            fgphData:[
              {text:"大盘型",value:"2"},
              {text:"中盘型",value:"1"},
              {text:"小盘型",value:"0"},
            ],
            gmphData:[
              {text:"大盘型",value:"2"},
              {text:"中盘型",value:"1"},
              {text:"小盘型",value:"0"},
            ]
          }
      }
    }
</script>

<style scoped>
  .gridAndLineByGP{
    width: 100%;
    height: 320px;
  }
.tools{
  display: flex;
  width: 100%;
  height: 48px;
  font-size: 14px;
  color: #4c5264;
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

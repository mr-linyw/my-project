<template>
  <div style="margin-bottom: 16px">
     <a-input class="text" v-model.number="number" οnpaste="value => value.replace('%', '')"
      οnkeyup="value => value+'%'"

      style="width:100px;">

    <a-icon type="caret-left" slot="prefix" @click="number--"/>
    <a-icon type="caret-right" slot="suffix" @click="number++"/>

     </a-input>
   </div>


  <!-- <div class="InputNumber">

     <a-button :disabled="number <= min"><a-icon type="caret-left"/></a-button>
        <input type="text" v-model.number="number"
         :formatter="value => '${value}%'"
         :parser="value => value.replace('%', '')"
         @blur="outInput">

     <a-button :disabled="number >= max" @click="number++"><a-icon type="caret-right"/></a-button>
  </div> -->
</template>

<script>
export default {
  props: [ 'InputNumberData', 'max', 'min' ],
  data () {
    return {
      number: this.InputNumberData
    }
  },
  methods: {
    outInput () {
      if (this.number > this.max) this.number = this.max
      if (this.number < this.min) this.number = this.min
    }
  }
}
</script>
<style  scoped>
  .text{text-align: center;}
</style>

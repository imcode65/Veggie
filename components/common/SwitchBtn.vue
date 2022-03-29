<template lang="pug">
    .switch-btn.btn.rounded-pill(:ref="guid" :id="guid" @click="$emit('btnClicked')")
      i.switch-icon.material-icons.icon {{icon}}
      span.description {{description}}
</template>

<script>
export default {
  data(){
    return{
      guid: 'undefined'
    }
  },
  props:['icon','description','top','bottom','right','left'],
  methods:{

  },
  created(){
    if(process.browser) this.guid = this.$guidGenerator()
  },
  mounted() {
    if(this.top) this.$refs[this.guid].style.top = this.top
    if(this.left) this.$refs[this.guid].style.left = this.left
    if(this.right) this.$refs[this.guid].style.right = this.right
    if(this.bottom) this.$refs[this.guid].style.bottom = this.bottom
    if(this.description) this.$refs[this.guid].style.width = '100px'
  },
}
</script>

<style lang="scss" scoped>
  .switch-btn{
    position: fixed;
    width: 50px;
    height: 50px;
    box-shadow: 0 1px 4px grey;
    color: white;
    background-color: #BE9B69;
    z-index: 100;
    border-radius: 50%;
    text-align: center;
    .switch-icon{
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      font-size: 2rem;
    }
    .description{
      position: relative;
      top: 12px;
    }
  }
</style>


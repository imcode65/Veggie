<template lang="pug">
header
  nav.d-flex.justify-content-between.align-items-center.p-1.bg-white.m-auto
    i.material-icons.icon(style="color: #232426; margin-left: 1rem;" @click="$emit('actionLeft')") {{icon}}
    div {{ title }}
    button.btn.btn-lg.vg-color(style="font-size: 1rem; color: #BE9B69;" @click="$emit('actionRight')" :disabled="rightButtonInvalid") {{buttonName}}
</template>

<script>
export default {
  props: ['invalid', 'title', 'buttonName', 'icon', 'rightButtonInvalid'],
  methods: {

  },
  mounted() {
  },

}
</script>

<style lang="scss" scoped>
header{
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
  background: white;
  nav{
    color:black;
    padding: 12px 0;
    max-width: 800px;
    .icon{
      cursor: pointer;
    }
  }
}
</style>




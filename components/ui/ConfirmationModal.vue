<template lang="pug">
  .p-4(style="background: #FAFAFA;")
    div {{message}}
    .d-flex.justify-content-end
      div.mr-3.text-muted(@click="leftButtonClicked") {{btnLeft}}
      div(@click="rightButtonClicked") {{btnRight}}
</template>

<script>
export default {
  props: ['post','message', 'btnLeft', 'btnRight','rightClickMethod'],
  methods: {
    leftButtonClicked(){
      this.$emit('close')
    },
    rightButtonClicked(){
      this.rightClickMethod(this.post)
      this.$emit('close')
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
</style>
<template lang="pug">
  .subheader.container-fluid.d-flex.justify-content-center.align-items-center.position-relative.mt-4
    .d-flex.justify-content-around.w-50.m-5
      nuxt-link.circle(:class="{ active: $route.name === 'mypage-registration'}" to="/mypage/registration") 1
      .line
      nuxt-link.circle(:class="{ active: $route.name === 'mypage-registration_2'}" to="/mypage/registration_2") 2
</template>

<script>
export default {
  props: ['invalid'],
  methods: {
    next(){
      // console.log('next')
      this.$emit('next')      
    }
  }
}
</script>

<style lang="scss" scoped>

  .subheader{
    background-color: #f2f3f5;
    .circle{
      color: #000;
      background: rgba(0, 0, 0, 0.12);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      vertical-align: middle;
      &.active {
        background: #BE9B69;
        color: white;
      }
    }
    .line{
      width: 36px;
      height: 0px;
      margin-top: 24px;
      border: 1px solid rgba(35, 36, 38, 0.87);
    } 
  }
</style>


<template lang="pug">
    .logo(ref="logo")
      img(ref="img" src="~assets/logo.png")
</template>

<script>
export default {
  data(){
    return{
      logoDOM: '',
    }
  },
  methods:{
    showLogo(){
      return new Promise((resolve, reject) => {
        this.$gsap.fromTo(this.logoDOM, {opacity: 0}, {opacity: 1, duration: 0.5});
        setTimeout(() => {
          this.$gsap.to(this.logoDOM, {opacity: 0, duration: 0.5});
          setTimeout(() => {
            resolve()
          }, 500) 
        }, 1000)
      })
    },
  },
  mounted() {
    this.logoDOM = this.$refs.logo
  },
}
</script>

<style lang="scss" scoped>
  .logo{
    position: absolute;
    left: 50%;
    top: 35vh;
    width: 40vw;
    height: 50vw;
    margin-left: -25%;
    margin-top: -25vw;
    // z-index: 100;
    opacity: 0;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  @media screen and (min-width: 800px) {
    .logo{
      width: 400px;
      height: 500px;
      margin-left: -200px;
      margin-top: -250px;
    }
  }
</style>


<template lang="pug">
  .btn(@click="goAppStore")
    img(src="~/assets/appstore.png")
</template>

<script>

export default {
  data(){
    return{
    }
  },
  methods:{
    goAppStore(){
      window.location.replace('https://apps.apple.com/jp/app/veggie-%E3%83%99%E3%82%B8%E3%83%BC-%E7%9B%B4%E5%A3%B2%E6%89%80%E6%A4%9C%E7%B4%A2/id1522765673') 
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
  .btn{
    img{
      width: 130px;
      height: auto;
      object-fit: contain;
    }
  }

</style>

